import { useState, useEffect, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from '../lib/supabase';
import { adminFetch, clearSession, isLoggedIn, login } from '../lib/adminAuth';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isLoggedIn());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const loginInFlight = useRef(false); // set at once, so a second submit in the same instant is ignored
  const [loginError, setLoginError] = useState(null); // null | 'refused' | 'error'
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [privateEnquiries, setPrivateEnquiries] = useState([]);
  const [clientIntakes, setClientIntakes] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const showConfirm = (message, onConfirm) => {
    setConfirmDialog({ message, onConfirm });
  };

  // Settings change state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingSettings, setChangingSettings] = useState(false);

  // Subscriber search
  const [subscriberSearch, setSubscriberSearch] = useState('');

  // Guides state
  const [guides, setGuides] = useState([]);
  const [guideViews, setGuideViews] = useState(null); // null = not loaded or could not be read
  const [guidesFailed, setGuidesFailed] = useState(false);
  const [editingGuideId, setEditingGuideId] = useState(null);
  const [guidePasswordDrafts, setGuidePasswordDrafts] = useState({}); // typed, unsaved passwords by guide id

  // Event form state
  const [eventForm, setEventForm] = useState({
    id: null,
    title: '',
    date: '',
    location: '',
    description: '',
    image_url: '',
    booking_link: '',
    button_label: '',
    status: 'upcoming',
  });
  const [imageFile, setImageFile] = useState(null);
  // True only after "Remove photo" is pressed while editing; the one way a stored photo is taken off.
  const [removePhoto, setRemovePhoto] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Image cropping state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Vacation form state
  const [vacationForm, setVacationForm] = useState({
    id: null,
    start_date: '',
    end_date: '',
    reason: ''
  });

  useEffect(() => {
    fetchGuides();
    if (isLoggedIn()) {
      fetchEvents();
      fetchSubscribers();
      fetchPrivateEnquiries();
      fetchClientIntakes();
      fetchVacations();
    }
  }, []);

  const formatDatePreview = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verified server-side against a bcrypt hash; on success we hold only a
    // signed, expiring session token.
    // One attempt at a time: the button is disabled while this runs.
    if (loginInFlight.current) return;
    loginInFlight.current = true;
    setLoggingIn(true);
    setLoginError(null);
    const result = await login(username, password);
    loginInFlight.current = false;
    setLoggingIn(false);

    if (result === 'ok') {
      setIsAuthenticated(true);
      setPassword('');
      fetchEvents();
      fetchSubscribers();
      fetchPrivateEnquiries();
      fetchClientIntakes();
      fetchVacations();
      fetchGuides();
    } else {
      // Shown under the form (the toast only exists once logged in).
      setLoginError(result);
    }
  };

  const handleChangeCredentials = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // The server refuses anything shorter than 8.
    if (newPassword && newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (!newUsername && !newPassword) {
      alert('Please enter a new username or password');
      return;
    }

    setChangingSettings(true);

    try {
      // Hashing happens server-side; the plaintext is never stored.
      const { ok, status } = await adminFetch('admin-update-credentials', {
        newUsername: newUsername || undefined,
        newPassword: newPassword || undefined,
      });

      if (!ok) {
        if (status === 401) {
          showToast('Session expired. Please log in again.', 'error');
          clearSession();
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to update credentials');
      }

      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Credentials updated successfully!');
    } catch (error) {
      console.error('Error updating credentials:', error);
      showToast('Error updating credentials: ' + error.message, 'error');
    } finally {
      setChangingSettings(false);
    }
  };

  // Image cropping functions
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.85);
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
      const previewUrl = URL.createObjectURL(croppedBlob);
      setImageFile(croppedFile);
      setImagePreviewUrl(previewUrl);
      setRemovePhoto(false);
      setCropModalOpen(false);
      setImageToCrop(null);
    } catch (error) {
      console.error('Error cropping image:', error);
      showToast('Error cropping image', 'error');
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { ok, status, data } = await adminFetch('list-subscribers');

      if (!ok) {
        if (status === 401) {
          clearSession();
          setIsAuthenticated(false);
        }
        return;
      }

      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Error fetching subscribers from Kit:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivateEnquiries = async () => {
    setLoading(true);
    try {
      const { ok, status, data } = await adminFetch('admin-data', {
        action: 'select', table: 'private_enquiries', orderBy: 'created_at', ascending: false,
      });

      if (!ok) {
        if (status === 401) { clearSession(); setIsAuthenticated(false); }
        return;
      }
      setPrivateEnquiries(data.data || []);
    } catch (error) {
      console.error('Error fetching private enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientIntakes = async () => {
    try {
      const { ok, status, data } = await adminFetch('admin-data', {
        action: 'select', table: 'client_intakes', orderBy: 'created_at', ascending: false,
      });
      if (!ok) {
        if (status === 401) { clearSession(); setIsAuthenticated(false); }
        return;
      }
      setClientIntakes(data.data || []);
    } catch (error) {
      console.error('Error fetching client intakes:', error);
    }
  };

  const handleToggleIntakeFollowedUp = async (intake) => {
    const { ok } = await adminFetch('admin-data', {
      action: 'update', table: 'client_intakes', id: intake.id,
      values: { followed_up: !intake.followed_up },
    });
    if (ok) fetchClientIntakes();
    else showToast('Could not update that form', 'error');
  };

  const handleDeleteIntake = (id) => {
    showConfirm('Delete this new client form, including any health notes? This cannot be undone.', async () => {
      const { ok } = await adminFetch('admin-data', { action: 'delete', table: 'client_intakes', id });
      if (ok) { fetchClientIntakes(); showToast('Form deleted'); }
      else showToast('Could not delete that form', 'error');
    });
  };

  const fetchVacations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vacations')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setVacations(data || []);
    } catch (error) {
      console.error('Error fetching vacations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuides = async () => {
    setLoading(true);
    try {
      // Rows arrive without the stored password: only `has_password`.
      const { ok, data } = await adminFetch('admin-data', {
        action: 'select', table: 'guides', orderBy: 'created_at', ascending: true,
      });

      if (!ok) {
        setGuidesFailed(true);
        return;
      }
      setGuidesFailed(false);
      setGuides(data.data || []);
      fetchGuideViews();
    } catch (error) {
      console.error('Error fetching guides:', error);
      setGuidesFailed(true);
    } finally {
      setLoading(false);
    }
  };

  // { slug: { count, last } }, counted on the server.
  const fetchGuideViews = async () => {
    try {
      const { ok, data } = await adminFetch('admin-data', { action: 'guide-views' });
      setGuideViews(ok && data.views ? data.views : null);
    } catch (error) {
      console.error('Error fetching guide views:', error);
      setGuideViews(null);
    }
  };

  const handleUpdateGuidePassword = async (guideId, password) => {
    if (!password || password.length < 6) {
      showToast('A guide password needs at least 6 characters.', 'error');
      return;
    }

    setLoading(true);
    try {
      // Hashed server-side; the plaintext never reaches the database.
      const { ok, status } = await adminFetch('admin-update-guide-password', {
        guideId,
        password,
      });

      if (!ok) {
        if (status === 401) {
          showToast('Session expired. Please log in again.', 'error');
          clearSession();
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to update guide password');
      }

      showToast('Guide password saved.');
      setEditingGuideId(null);
      setGuidePasswordDrafts((drafts) => ({ ...drafts, [guideId]: '' }));
      fetchGuides();
    } catch (error) {
      console.error('Error updating guide password:', error);
      showToast('Error updating guide password: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVacation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (vacationForm.id) {
        // Update existing vacation
        await adminWrite({
          action: 'update',
          table: 'vacations',
          id: vacationForm.id,
          values: {
            start_date: vacationForm.start_date,
            end_date: vacationForm.end_date,
            reason: vacationForm.reason,
            updated_at: new Date().toISOString()
          },
        });
      } else {
        // Create new vacation
        await adminWrite({
          action: 'insert',
          table: 'vacations',
          values: {
            start_date: vacationForm.start_date,
            end_date: vacationForm.end_date,
            reason: vacationForm.reason
          },
        });
      }

      setVacationForm({ id: null, start_date: '', end_date: '', reason: '' });
      fetchVacations();
    } catch (error) {
      console.error('Error saving vacation:', error);
      showToast('Error saving vacation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditVacation = (vacation) => {
    setVacationForm({
      id: vacation.id,
      start_date: vacation.start_date,
      end_date: vacation.end_date,
      reason: vacation.reason || ''
    });
  };

  const handleDeleteVacation = async (id) => {
    showConfirm('Are you sure you want to delete this vacation period?', async () => {
      try {
        await adminWrite({ action: 'delete', table: 'vacations', id });
        fetchVacations();
        showToast('Vacation deleted successfully!');
      } catch (error) {
        console.error('Error deleting vacation:', error);
        showToast('Error deleting vacation', 'error');
      }
    });
  };

  // Every change to what the public site shows (events, vacations, event
  // images) goes through the admin-data function, which checks the admin
  // login. Throws with a readable message if it fails.
  const adminWrite = async (body) => {
    const { ok, status, data } = await adminFetch('admin-data', body);
    if (!ok) {
      if (status === 401) {
        clearSession();
        setIsAuthenticated(false);
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error('The change could not be saved.');
    }
    return data;
  };

  // The public pages are built ahead of time, so after an event changes the
  // site is rebuilt (about a minute). The rebuild-site function holds the
  // Vercel deploy hook; this only asks it to run.
  const rebuildSite = async () => {
    const { ok, status } = await adminFetch('rebuild-site');
    if (ok) return 'started';
    return status === 503 ? 'not-set-up' : 'failed';
  };

  const REBUILD_NOTE = {
    started: ' The website is rebuilding and will show the change in about a minute.',
    'not-set-up': ' The automatic website rebuild is not set up yet, so event pages update at the next deploy.',
    failed: ' The website rebuild could not be started; use "Rebuild website" to try again.',
  };

  const handleRebuildSite = async () => {
    const result = await rebuildSite();
    if (result === 'started') showToast('Website rebuild started. It takes about a minute.');
    else if (result === 'not-set-up') showToast('The website rebuild is not set up yet (the Vercel deploy hook is missing).', 'error');
    else showToast('The website rebuild could not be started.', 'error');
  };

  const uploadImage = async (file) => {
    const extension = file.name.split('.').pop();
    const { path: filePath, token } = await adminWrite({ action: 'upload-url', extension });

    const { error } = await supabase.storage
      .from('event-images')
      .uploadToSignedUrl(filePath, token, file, { contentType: file.type });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Only what the form shows is sent. The photo is sent only when it
      // changes: a new one was chosen, or "Remove photo" was pressed. An edit
      // that touches neither leaves the stored photo exactly as it is.
      const values = {
        title: eventForm.title,
        date: eventForm.date,
        location: eventForm.location,
        description: eventForm.description,
        booking_link: eventForm.booking_link,
        button_label: eventForm.button_label,
        status: eventForm.status,
      };

      if (imageFile) {
        values.image_url = await uploadImage(imageFile);
      } else if (!eventForm.id) {
        values.image_url = '';
      } else if (removePhoto) {
        values.image_url = null;
      }

      if (eventForm.id) {
        // Update existing event
        await adminWrite({ action: 'update', table: 'events', id: eventForm.id, values });
      } else {
        // Insert new event (its page address, the slug, is set by the database)
        await adminWrite({ action: 'insert', table: 'events', values });
      }

      resetEventForm();
      fetchEvents();
      showToast('Event saved.' + REBUILD_NOTE[await rebuildSite()]);
    } catch (error) {
      console.error('Error saving event:', error);
      showToast('Error saving event: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const clearChosenPhoto = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    const input = document.getElementById('image-upload');
    if (input) input.value = '';
  };

  const resetEventForm = () => {
    setEventForm({
      id: null,
      title: '',
      date: '',
      location: '',
      description: '',
      image_url: '',
      booking_link: '',
      button_label: '',
      status: 'upcoming',
    });
    setRemovePhoto(false);
    clearChosenPhoto();
  };

  const handleEditEvent = (event) => {
    setEventForm(event);
    // A photo chosen for a different event must not follow into this one.
    setRemovePhoto(false);
    clearChosenPhoto();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id) => {
    showConfirm('Are you sure you want to delete this event?', async () => {
      try {
        await adminWrite({ action: 'delete', table: 'events', id });
        fetchEvents();
        showToast('Event deleted.' + REBUILD_NOTE[await rebuildSite()]);
      } catch (error) {
        console.error('Error deleting event:', error);
        showToast('Error deleting event: ' + error.message, 'error');
      }
    });
  };

  const exportToCSV = () => {
    const csv = [
      ['First Name', 'Last Name', 'Email', 'Subscribed At'],
      ...subscribers.map(s => [
        s.first_name || '',
        s.fields?.last_name || '',
        s.email_address,
        new Date(s.created_at).toLocaleDateString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
  };

  const handleDeleteEnquiry = async (id) => {
    showConfirm('Are you sure you want to delete this enquiry?', async () => {
      try {
        const { ok } = await adminFetch('admin-data', {
          action: 'delete', table: 'private_enquiries', id,
        });

        if (!ok) throw new Error('Failed to delete enquiry');
        fetchPrivateEnquiries();
        showToast('Enquiry deleted successfully!');
      } catch (error) {
        console.error('Error deleting enquiry:', error);
        showToast('Error deleting enquiry: ' + error.message, 'error');
      }
    });
  };

  const handleToggleFollowedUp = async (enquiry) => {
    try {
      const { ok } = await adminFetch('admin-data', {
        action: 'update', table: 'private_enquiries',
        id: enquiry.id, values: { followed_up: !enquiry.followed_up },
      });

      if (!ok) throw new Error('Failed to update enquiry');
      fetchPrivateEnquiries();
    } catch (error) {
      console.error('Error updating enquiry:', error);
      alert('Error updating enquiry: ' + error.message);
    }
  };

  // Public pages on the domain — keep in sync with the routes in App.jsx
  const sitePages = [
    { label: 'Home', path: '/', description: 'Landing page' },
    { label: 'About', path: '/about', description: 'About / my approach' },
    { label: 'Practice', path: '/practice', description: 'Practice videos' },
    { label: 'Events', path: '/events', description: 'Upcoming events' },
    { label: 'Private Sessions', path: '/private-sessions', description: 'One-to-one & small group' },
    { label: 'Bootcamp', path: '/bootcamp', description: 'Bootcamp landing page' },
    { label: 'FAQ', path: '/faq', description: 'Frequently asked questions' },
    { label: 'Join', path: '/join', description: 'Email signup / community' },
    { label: 'Handstand Guide', path: '/handstandguide', description: 'Password-protected guide' },
    { label: 'Pincha Guide', path: '/pinchaguide', description: 'Password-protected guide' },
    { label: 'New Client Intake', path: '/onboard', description: 'Onboarding form for new clients' },
    { label: 'CV', path: '/cv', description: 'Teaching CV' },
    { label: 'Admin', path: '/admin', description: 'This dashboard', internal: true },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg max-w-md w-full border border-[#C9B99A] shadow-sm">
          <h1 className="text-2xl font-light text-[#1C1410] mb-6">Admin Login</h1>
          <label htmlFor="admin-username" className="block text-sm text-[#5C4A36] mb-1.5">Username</label>
          <input
            id="admin-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] focus:ring-2 focus:ring-[#785E3D]/30 mb-4"
            required
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          <label htmlFor="admin-password" className="block text-sm text-[#5C4A36] mb-1.5">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] focus:ring-2 focus:ring-[#785E3D]/30 mb-5"
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full bg-[#785E3D] text-white py-3 rounded-md cursor-pointer transition-colors hover:bg-[#5C4A36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1410] disabled:opacity-60 disabled:cursor-wait disabled:hover:bg-[#785E3D]"
          >
            {loggingIn ? 'Logging in…' : 'Login'}
          </button>
          {/* Never says which of the two was wrong. */}
          <p role="alert" aria-live="assertive" className={`text-sm text-[#B42318] ${loginError ? 'mt-4' : ''}`}>
            {loginError === 'refused' && 'Wrong username or password.'}
            {loginError === 'error' && "Couldn't reach the server. Try again."}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1C1410]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-[#1C1410]">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-[#785E3D] hover:text-[#1C1410] transition-colors"
            >
              ← Back to Site
            </a>
            <button
              onClick={() => {
                clearSession();
                setIsAuthenticated(false);
              }}
              className="text-sm text-[#6B5740] hover:text-[#1C1410] transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-[#C9B99A]">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'events' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'subscribers' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('privateEnquiries')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'privateEnquiries' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Private Enquiries ({privateEnquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('clientIntakes')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'clientIntakes' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            New Clients ({clientIntakes.length})
          </button>
          <button
            onClick={() => setActiveTab('vacations')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'vacations' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Vacations
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'guides' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Guides
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'pages' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Pages
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Settings
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            {/* Event Form */}
            <div className="bg-white p-6 rounded-lg mb-8 border border-[#C9B99A] shadow-sm">
              <h2 className="text-xl font-light mb-4 text-[#1C1410]">{eventForm.id ? 'Edit Event' : 'Add New Event'}</h2>
              <form onSubmit={handleSubmitEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                  required
                />
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D]"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                />
                <input
                  type="url"
                  placeholder="Booking Link"
                  value={eventForm.booking_link}
                  onChange={(e) => setEventForm({ ...eventForm, booking_link: e.target.value })}
                  className="px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                />
                <input
                  type="text"
                  placeholder='Button Label (default: "Secure Your Spot")'
                  value={eventForm.button_label}
                  onChange={(e) => setEventForm({ ...eventForm, button_label: e.target.value })}
                  className="px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                />
                <textarea
                  placeholder="Description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A] md:col-span-2"
                  rows="3"
                />
                <div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  {(() => {
                    const storedPhoto = eventForm.id && eventForm.image_url ? eventForm.image_url : null;
                    const quiet = 'px-4 py-2 bg-white text-[#1C1410] text-sm rounded-md border border-[#C9B99A] hover:bg-[#F4EFE6] transition-colors cursor-pointer';
                    return (
                      <div className="flex flex-wrap items-center gap-4">
                        {(imagePreviewUrl || (storedPhoto && !removePhoto)) && (
                          <img
                            src={imagePreviewUrl || storedPhoto}
                            alt={imagePreviewUrl ? 'The new photo' : 'The photo this event has now'}
                            className="h-20 w-32 object-cover rounded-md border border-[#C9B99A]"
                          />
                        )}
                        <div>
                          <div className="flex flex-wrap gap-3">
                            <label
                              htmlFor="image-upload"
                              className="inline-block px-4 py-2 bg-[#EAE0CF] text-[#1C1410] text-sm rounded-md hover:bg-[#C9B99A] transition-colors cursor-pointer"
                            >
                              {storedPhoto || imageFile ? 'Replace photo' : 'Upload photo'}
                            </label>
                            {imageFile && (
                              <button type="button" onClick={clearChosenPhoto} className={quiet}>Discard new photo</button>
                            )}
                            {storedPhoto && !imageFile && !removePhoto && (
                              <button type="button" onClick={() => setRemovePhoto(true)} className={quiet}>Remove photo</button>
                            )}
                            {storedPhoto && !imageFile && removePhoto && (
                              <button type="button" onClick={() => setRemovePhoto(false)} className={quiet}>Keep photo</button>
                            )}
                          </div>
                          <p className="text-xs text-[#6B5740] mt-2">
                            {imageFile
                              ? storedPhoto
                                ? 'New photo chosen. It replaces the current photo when you save.'
                                : 'Photo chosen. It is added when you save.'
                              : storedPhoto
                                ? removePhoto
                                  ? 'The photo will be removed when you save.'
                                  : 'Current photo. It stays unless you replace or remove it.'
                                : 'Upload an event photo (optional)'}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-[#785E3D] text-white px-6 py-2 rounded-md hover:bg-[#6B5030] transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : eventForm.id ? 'Update Event' : 'Add Event'}
                  </button>
                  {eventForm.id && (
                    <button
                      type="button"
                      onClick={resetEventForm}
                      className="bg-[#EAE0CF] text-[#1C1410] px-6 py-2 rounded-md hover:bg-[#C9B99A] transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Preview Section */}
            {(eventForm.title || eventForm.date || eventForm.location || imagePreviewUrl) && (() => {
              const previewPhoto = imagePreviewUrl || (eventForm.id && !removePhoto ? eventForm.image_url : null);
              return (
              <div className="bg-white p-6 rounded-lg mb-8 border border-[#C9B99A] shadow-sm">
                <h2 className="text-xl font-light mb-4 text-[#1C1410]">Preview</h2>
                <p className="text-xs text-[#6B5740] mb-4">This is how your event will appear on the Events page</p>
                <div className="max-w-sm">
                  <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden">
                    {/* Image or Placeholder */}
                    {previewPhoto ? (
                      <img
                        src={previewPhoto}
                        alt="Event preview"
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-[#785E3D] to-[#6B5740]" />
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {eventForm.date && (
                        <p className="text-xs uppercase tracking-wide text-[#785E3D] mb-2">
                          {formatDatePreview(eventForm.date)}
                        </p>
                      )}
                      <h3 className="text-2xl font-light text-[#1C1410] mb-3">
                        {eventForm.title || 'Event Title'}
                      </h3>
                      {eventForm.location && (
                        <p className="text-sm text-[#6B5740] mb-2">
                          {eventForm.location}
                        </p>
                      )}
                      {eventForm.description && (
                        <p className="text-sm text-[#6B5740] mb-4">
                          {eventForm.description}
                        </p>
                      )}
                      {eventForm.booking_link && (
                        <span className="inline-block text-xs uppercase tracking-wide text-[#785E3D] border-b border-[#785E3D]">
                          Book now →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              );
            })()}

            {/* Events List */}
            <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-light text-[#1C1410]">All Events</h2>
                <button
                  type="button"
                  onClick={handleRebuildSite}
                  title="Event pages are rebuilt automatically when you save an event, and every night. Use this if a change hasn't shown up."
                  className="px-3 py-1 border border-[#785E3D] text-[#785E3D] rounded text-sm hover:bg-[#F4EFE6] transition-colors"
                >
                  Rebuild website
                </button>
              </div>
              {loading ? (
                <p className="text-[#6B5740]">Loading...</p>
              ) : events.length === 0 ? (
                <p className="text-[#6B5740]">No events yet. Add your first event above!</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => {
                    const today = new Date().toISOString().split('T')[0];
                    const isUpcoming = event.date >= today;
                    return (
                      <div key={event.id} className="bg-[#F4EFE6] p-4 rounded-md border border-[#C9B99A]">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-1 text-[#1C1410]">{event.title}</h3>
                            <p className="text-sm text-[#785E3D] mb-2">{event.date} • {event.location}</p>
                            {event.slug && (
                              <p className="text-xs mb-2">
                                <a href={`/events/${event.slug}`} target="_blank" rel="noopener noreferrer" className="text-[#785E3D] underline underline-offset-2 hover:text-[#1C1410]">
                                  ammarbass.com/events/{event.slug}
                                </a>
                              </p>
                            )}
                            {event.description && <p className="text-sm text-[#6B5740] mb-2">{event.description}</p>}
                            <div className="flex gap-2 items-center">
                              <span className={`text-xs px-2 py-1 rounded text-white ${isUpcoming ? 'bg-[#785E3D]' : 'bg-[#C9B99A]'}`}>
                                {isUpcoming ? 'upcoming' : 'past'}
                              </span>
                              {event.image_url && <span className="text-xs text-[#6B5740]">Has image</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="px-3 py-1 bg-[#785E3D] text-white rounded text-sm hover:bg-[#6B5030] transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded text-sm hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-light text-[#1C1410]">Subscribers ({subscribers.length})</h2>
              <div className="flex gap-2">
                <a
                  href="https://app.kit.com/subscribers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EAE0CF] text-[#1C1410] px-4 py-2 rounded-md hover:bg-[#C9B99A] transition-colors text-sm"
                >
                  Manage in Kit →
                </a>
                <button
                  onClick={exportToCSV}
                  className="bg-[#785E3D] text-white px-4 py-2 rounded-md hover:bg-[#6B5030] transition-colors text-sm"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={subscriberSearch}
                onChange={(e) => setSubscriberSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full max-w-sm px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A] text-sm"
              />
            </div>
            {loading ? (
              <p className="text-[#6B5740]">Loading...</p>
            ) : subscribers.length === 0 ? (
              <p className="text-[#6B5740]">No subscribers yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#C9B99A]">
                      <th className="text-left py-2 px-4 text-[#1C1410] font-medium">First Name</th>
                      <th className="text-left py-2 px-4 text-[#1C1410] font-medium">Last Name</th>
                      <th className="text-left py-2 px-4 text-[#1C1410] font-medium">Email</th>
                      <th className="text-left py-2 px-4 text-[#1C1410] font-medium">Subscribed</th>
                      <th className="text-left py-2 px-4 text-[#1C1410] font-medium">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.filter(s => {
                      const q = subscriberSearch.toLowerCase();
                      return !q ||
                        s.email_address?.toLowerCase().includes(q) ||
                        s.first_name?.toLowerCase().includes(q) ||
                        s.fields?.last_name?.toLowerCase().includes(q);
                    }).map((subscriber) => (
                      <tr key={subscriber.id} className="border-b border-[#EAE0CF] hover:bg-[#F4EFE6]">
                        <td className="py-3 px-4 text-[#1C1410]">{subscriber.first_name || '—'}</td>
                        <td className="py-3 px-4 text-[#1C1410]">{subscriber.fields?.last_name || '—'}</td>
                        <td className="py-3 px-4 text-[#1C1410]">{subscriber.email_address}</td>
                        <td className="py-3 px-4 text-[#6B5740]">
                          {new Date(subscriber.created_at).toLocaleDateString('en-GB')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${subscriber.state === 'active' ? 'bg-green-100 text-green-700' : 'bg-[#EAE0CF] text-[#6B5740]'}`}>
                            {subscriber.state}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Private Enquiries Tab */}
        {activeTab === 'privateEnquiries' && (
          <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
            <h2 className="text-xl font-light mb-4 text-[#1C1410]">Private Session Enquiries ({privateEnquiries.length})</h2>
            {loading ? (
              <p className="text-[#6B5740]">Loading...</p>
            ) : privateEnquiries.length === 0 ? (
              <p className="text-[#6B5740]">No private session enquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {privateEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="bg-[#F4EFE6] p-6 rounded-md border border-[#C9B99A]">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-medium text-[#1C1410]">{enquiry.name}</h3>
                          {enquiry.followed_up && (
                            <span className="text-xs px-2 py-1 rounded bg-[#785E3D] text-white">
                              Followed up
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="text-sm text-[#785E3D] hover:text-[#6B5030] transition-colors"
                        >
                          {enquiry.email}
                        </a>
                      </div>
                      <span className="text-xs text-[#6B5740]">
                        {new Date(enquiry.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-md mb-4 border border-[#C9B99A]">
                      <p className="text-sm text-[#1C1410] whitespace-pre-wrap">{enquiry.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleFollowedUp(enquiry)}
                        className={`px-4 py-2 rounded-md text-sm transition-colors ${
                          enquiry.followed_up
                            ? 'bg-[#EAE0CF] text-[#6B5740] hover:bg-[#C9B99A]'
                            : 'bg-[#785E3D] text-white hover:bg-[#6B5030]'
                        }`}
                      >
                        {enquiry.followed_up ? 'Mark as not followed up' : 'Mark as followed up'}
                      </button>
                      <button
                        onClick={() => handleDeleteEnquiry(enquiry.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-md text-sm hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* New Client Forms Tab */}
        {activeTab === 'clientIntakes' && (
          <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
            <h2 className="text-xl font-light mb-1 text-[#1C1410]">New Client Forms ({clientIntakes.length})</h2>
            <p className="text-xs text-[#6B5740] mb-4">Health notes are confidential. Delete forms you no longer need.</p>
            {clientIntakes.length === 0 ? (
              <p className="text-[#6B5740]">No new client forms yet.</p>
            ) : (
              <div className="space-y-4">
                {clientIntakes.map((c) => (
                  <div key={c.id} className="bg-[#F4EFE6] p-6 rounded-md border border-[#C9B99A]">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-medium text-[#1C1410]">{c.name}</h3>
                          {c.followed_up && <span className="text-xs px-2 py-1 rounded bg-[#785E3D] text-white">Followed up</span>}
                        </div>
                        <a href={`mailto:${c.email}`} className="text-sm text-[#785E3D] hover:text-[#6B5030]">{c.email}</a>
                        {c.phone && <p className="text-sm text-[#6B5740]">{c.phone}</p>}
                      </div>
                      <span className="text-xs text-[#6B5740] whitespace-nowrap">
                        {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <dl className="bg-white p-4 rounded-md mb-4 border border-[#C9B99A] grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
                      <dt className="text-[#6B5740]">Format</dt>
                      <dd className="text-[#1C1410]">{{ studio: 'Studio', online: 'Online', home: 'At their home' }[c.format]}{c.home_area ? ` — ${c.home_area}` : ''}</dd>
                      <dt className="text-[#6B5740]">Experience</dt>
                      <dd className="text-[#1C1410]">{{ complete_beginner: 'Complete beginner', some: 'Some experience', regular: 'Practises regularly', experienced: 'Experienced' }[c.experience]}</dd>
                      <dt className="text-[#6B5740]">Goals</dt>
                      <dd className="text-[#1C1410] whitespace-pre-wrap">{c.goals}</dd>
                      <dt className="text-[#6B5740]">Availability</dt>
                      <dd className="text-[#1C1410] whitespace-pre-wrap">{c.availability}</dd>
                      <dt className="text-[#6B5740]">Health notes</dt>
                      <dd className="text-[#1C1410] whitespace-pre-wrap">{c.health_notes || 'None given'}</dd>
                    </dl>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleIntakeFollowedUp(c)}
                        className={`px-4 py-2 rounded-md text-sm transition-colors ${c.followed_up ? 'bg-[#EAE0CF] text-[#6B5740] hover:bg-[#C9B99A]' : 'bg-[#785E3D] text-white hover:bg-[#6B5030]'}`}
                      >
                        {c.followed_up ? 'Mark as not followed up' : 'Mark as followed up'}
                      </button>
                      <button
                        onClick={() => handleDeleteIntake(c.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-md text-sm hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Vacations Tab */}
        {activeTab === 'vacations' && (
          <div>
            {/* Vacation Form */}
            <div className="bg-white p-6 rounded-lg mb-8 border border-[#C9B99A] shadow-sm">
              <h2 className="text-xl font-light mb-4 text-[#1C1410]">
                {vacationForm.id ? 'Edit Vacation Period' : 'Add Vacation Period'}
              </h2>
              <form onSubmit={handleSaveVacation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B5740] mb-2">Start Date</label>
                    <input
                      type="date"
                      value={vacationForm.start_date}
                      onChange={(e) => setVacationForm({ ...vacationForm, start_date: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B5740] mb-2">End Date</label>
                    <input
                      type="date"
                      value={vacationForm.end_date}
                      onChange={(e) => setVacationForm({ ...vacationForm, end_date: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5740] mb-2">Reason (private note for you only)</label>
                  <input
                    type="text"
                    value={vacationForm.reason}
                    onChange={(e) => setVacationForm({ ...vacationForm, reason: e.target.value })}
                    placeholder="e.g., Retreat, Personal, etc."
                    className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                  />
                  <p className="text-xs text-[#6B5740] mt-1">This is just for your reference and won't be shown on the website</p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#785E3D] text-white px-6 py-3 rounded-md hover:bg-[#6B5030] transition-colors disabled:opacity-50"
                  >
                    {vacationForm.id ? 'Update' : 'Add'} Vacation
                  </button>
                  {vacationForm.id && (
                    <button
                      type="button"
                      onClick={() => setVacationForm({ id: null, start_date: '', end_date: '', reason: '' })}
                      className="bg-[#EAE0CF] text-[#1C1410] px-6 py-3 rounded-md hover:bg-[#C9B99A] transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg mb-6">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> A banner will automatically appear on the website 2 weeks before your vacation starts, letting students know you'll be away. The banner will show the dates but not the reason.
              </p>
            </div>

            {/* Vacation List */}
            <div className="bg-white rounded-lg overflow-hidden border border-[#C9B99A] shadow-sm">
              <h2 className="text-xl font-light p-6 pb-4 text-[#1C1410]">Scheduled Vacations</h2>
              {loading ? (
                <p className="p-6 text-[#6B5740]">Loading...</p>
              ) : vacations.length === 0 ? (
                <p className="p-6 text-[#6B5740]">No vacations scheduled</p>
              ) : (
                <div className="divide-y divide-[#EAE0CF]">
                  {vacations.map((vacation) => {
                    const startDate = new Date(vacation.start_date);
                    const endDate = new Date(vacation.end_date);
                    const today = new Date();
                    const twoWeeksBefore = new Date(startDate);
                    twoWeeksBefore.setDate(startDate.getDate() - 14);

                    const isActive = today >= startDate && today <= endDate;
                    const bannerShowing = today >= twoWeeksBefore && today < startDate;

                    return (
                      <div key={vacation.id} className="p-6 hover:bg-[#F4EFE6] transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="text-lg text-[#1C1410]">
                                {startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                {' → '}
                                {endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              {isActive && (
                                <span className="px-2 py-1 bg-[#785E3D] text-white text-xs rounded">Active Now</span>
                              )}
                              {bannerShowing && !isActive && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 border border-amber-300 text-xs rounded">Banner Showing</span>
                              )}
                            </div>
                            {vacation.reason && (
                              <p className="text-sm text-[#6B5740]">Reason: {vacation.reason}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditVacation(vacation)}
                              className="text-[#785E3D] hover:text-[#6B5030] text-sm px-3 py-1 border border-[#C9B99A] rounded hover:border-[#785E3D] transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteVacation(vacation.id)}
                              className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-200 rounded hover:border-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
            <h2 className="text-xl font-light mb-4 text-[#1C1410]">Guides</h2>
            <p className="text-sm text-[#6B5740] mb-6">
              Each guide opens with its own password. Stored passwords can't be shown, only replaced.
            </p>

            {loading && guides.length === 0 ? (
              <p className="text-[#6B5740]">Loading...</p>
            ) : guidesFailed ? (
              <p className="text-[#B42318]">The guides could not be loaded. Reload the page, and log in again if it asks.</p>
            ) : guides.length === 0 ? (
              <p className="text-[#6B5740]">No guides yet.</p>
            ) : (
              <div className="space-y-4">
                {guides.map((guide) => {
                  const views = guideViews?.[guide.slug];
                  const day = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                  const editing = editingGuideId === guide.id || !guide.has_password;
                  return (
                    <div key={guide.id} className="bg-[#F4EFE6] p-6 rounded-md border border-[#C9B99A]">
                      <div className="mb-4">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-lg font-medium text-[#1C1410]">{guide.title}</h3>
                          <span className="px-2 py-1 bg-[#785E3D] text-white text-xs rounded">
                            {guideViews === null ? 'Views not loaded' : `${views?.count ?? 0} ${views?.count === 1 ? 'view' : 'views'}`}
                          </span>
                          {views?.last && <span className="text-xs text-[#6B5740]">Last viewed {day(views.last)}</span>}
                        </div>
                        {guide.description && (
                          <p className="text-sm text-[#6B5740] mb-2">{guide.description}</p>
                        )}
                        <a
                          href={`/${guide.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#785E3D] hover:text-[#6B5030] transition-colors"
                        >
                          /{guide.slug} →
                        </a>
                      </div>

                      <div className="bg-white px-4 py-3 rounded-md border border-[#C9B99A]">
                        {guide.has_password ? (
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-[#1C1410]">
                              Password set
                              {guide.updated_at && <span className="text-[#6B5740]"> · last changed {day(guide.updated_at)}</span>}
                            </p>
                            {!editing && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingGuideId(guide.id);
                                }}
                                className="px-4 py-2 bg-[#785E3D] text-white rounded-md hover:bg-[#6B5030] transition-colors text-sm cursor-pointer"
                              >
                                Change password
                              </button>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-[#B42318]">
                            No password set. Nobody can open this guide until you set one.
                          </p>
                        )}

                        {editing && (
                          <form
                            className="mt-3 flex flex-wrap items-end gap-3"
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleUpdateGuidePassword(guide.id, guidePasswordDrafts[guide.id] ?? '');
                            }}
                          >
                            <div className="flex-1 min-w-[14rem]">
                              <label htmlFor={`guide-password-${guide.id}`} className="block text-sm text-[#5C4A36] mb-1.5">
                                {guide.has_password ? 'New password' : 'Set a password'}
                              </label>
                              <input
                                id={`guide-password-${guide.id}`}
                                type="text"
                                value={guidePasswordDrafts[guide.id] ?? ''}
                                onChange={(e) => setGuidePasswordDrafts({ ...guidePasswordDrafts, [guide.id]: e.target.value })}
                                className="w-full px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D]"
                                minLength={6}
                                required
                                autoComplete="off"
                                autoCapitalize="none"
                                spellCheck={false}
                              />
                              <p className="text-xs text-[#6B5740] mt-1">At least 6 characters. This is what you give to students.</p>
                            </div>
                            <button
                              type="submit"
                              disabled={loading}
                              className="px-4 py-2 bg-[#785E3D] text-white rounded-md hover:bg-[#6B5030] transition-colors disabled:opacity-50 text-sm cursor-pointer"
                            >
                              {loading ? 'Saving…' : guide.has_password ? 'Save new password' : 'Set password'}
                            </button>
                            {guide.has_password && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingGuideId(null);
                                  setGuidePasswordDrafts({ ...guidePasswordDrafts, [guide.id]: '' });
                                }}
                                className="px-4 py-2 bg-[#EAE0CF] text-[#1C1410] rounded-md hover:bg-[#C9B99A] transition-colors text-sm cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </form>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
            <h2 className="text-xl font-light mb-2 text-[#1C1410]">Site Pages</h2>
            <p className="text-sm text-[#6B5740] mb-6">All pages on ammarbass.com. Click a link to open it in a new tab.</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#C9B99A]">
                    <th className="text-left py-2 px-4 text-[#1C1410] font-medium">Page</th>
                    <th className="text-left py-2 px-4 text-[#1C1410] font-medium">URL</th>
                    <th className="text-left py-2 px-4 text-[#1C1410] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {sitePages.map((page) => (
                    <tr key={page.path} className="border-b border-[#EAE0CF] hover:bg-[#F4EFE6]">
                      <td className="py-3 px-4 text-[#1C1410] whitespace-nowrap">
                        {page.label}
                        {page.internal && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-[#EAE0CF] text-[#6B5740]">internal</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#785E3D] hover:text-[#6B5030] font-mono text-sm"
                        >
                          ammarbass.com{page.path === '/' ? '' : page.path} →
                        </a>
                      </td>
                      <td className="py-3 px-4 text-[#6B5740] text-sm">{page.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg max-w-2xl border border-[#C9B99A] shadow-sm">
            <h2 className="text-xl font-light mb-6 text-[#1C1410]">Admin Settings</h2>

            <form onSubmit={handleChangeCredentials} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B5740] mb-2">New Username (optional)</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                  autoComplete="username"
                />
                <p className="text-xs text-[#6B5740] mt-1">Leave blank to keep current username</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B5740] mb-2">New Password (optional)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                  minLength={6}
                  autoComplete="new-password"
                />
                <p className="text-xs text-[#6B5740] mt-1">Minimum 8 characters, leave blank to keep current password</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B5740] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                  minLength={6}
                  autoComplete="new-password"
                  disabled={!newPassword}
                />
              </div>

              <button
                type="submit"
                disabled={changingSettings}
                className="bg-[#785E3D] text-white px-6 py-3 rounded-md hover:bg-[#6B5030] transition-colors disabled:opacity-50"
              >
                {changingSettings ? 'Updating...' : 'Update Credentials'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#EAE0CF]">
              <p className="text-sm text-[#6B5740]">
                Credentials are verified on the server and stored as a bcrypt
                hash, so the password is never sent to the browser. Your session
                expires after 12 hours.
              </p>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white text-sm z-50 transition-all ${toast.type === 'error' ? 'bg-red-600' : 'bg-[#785E3D]'}`}>
            {toast.message}
          </div>
        )}

        {/* Confirm Dialog */}
        {confirmDialog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-lg border border-[#C9B99A]">
              <p className="text-[#1C1410] mb-6">{confirmDialog.message}</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 bg-[#EAE0CF] text-[#1C1410] rounded-md hover:bg-[#C9B99A] transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmDialog.onConfirm();
                    setConfirmDialog(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Crop Modal */}
        {cropModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 border border-[#C9B99A] shadow-lg">
              <h2 className="text-xl font-light mb-4 text-[#1C1410]">Crop Image</h2>
              <div className="relative h-96 bg-[#1C1410] rounded-md mb-4">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              {/* Phones need ~1200px across to look sharp; smaller crops get stretched and blur. */}
              {croppedAreaPixels && croppedAreaPixels.width < 1200 && (
                <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
                  <strong className="font-medium">Low resolution:</strong> this crop is only {Math.round(croppedAreaPixels.width)}×{Math.round(croppedAreaPixels.height)}px, so it will look blurry on phones.
                  {' '}Zoom out, or use the original photo (at least 1600px wide). Screenshots and photos saved from WhatsApp or Instagram are usually too small.
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#6B5740] mb-2">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => {
                    setCropModalOpen(false);
                    setImageToCrop(null);
                  }}
                  className="px-6 py-2 bg-[#EAE0CF] text-[#1C1410] rounded-md hover:bg-[#C9B99A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="px-6 py-2 bg-[#785E3D] text-white rounded-md hover:bg-[#6B5030] transition-colors"
                >
                  Crop & Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
