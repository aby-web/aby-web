import { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [privateEnquiries, setPrivateEnquiries] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storedUsername, setStoredUsername] = useState(null);
  const [storedPassword, setStoredPassword] = useState(null);

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
  const [guideViews, setGuideViews] = useState({});
  const [editingGuideId, setEditingGuideId] = useState(null);
  const [newGuidePassword, setNewGuidePassword] = useState('');

  // Event form state
  const [eventForm, setEventForm] = useState({
    id: null,
    title: '',
    date: '',
    location: '',
    description: '',
    image_url: '',
    booking_link: '',
    status: 'upcoming',
  });
  const [imageFile, setImageFile] = useState(null);
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
    fetchStoredCredentials();
    fetchGuides();
    if (localStorage.getItem('admin_authenticated') === 'true') {
      fetchEvents();
      fetchSubscribers();
      fetchTestimonials();
      fetchPrivateEnquiries();
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

  const fetchStoredCredentials = async () => {
    try {
      // Fetch username and password from admin_settings
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value')
        .in('setting_key', ['admin_username', 'admin_password']);

      if (!error && data) {
        const usernameData = data.find(item => item.setting_key === 'admin_username');
        const passwordData = data.find(item => item.setting_key === 'admin_password');

        if (usernameData) setStoredUsername(usernameData.setting_value);
        if (passwordData) setStoredPassword(passwordData.setting_value);
      }
    } catch (error) {
      console.log('No custom credentials set, using defaults');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const correctUsername = storedUsername || 'admin';
    const correctPassword = storedPassword || import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      fetchEvents();
      fetchSubscribers();
      fetchTestimonials();
      fetchPrivateEnquiries();
      fetchVacations();
      fetchGuides();
    } else {
      showToast('Incorrect username or password', 'error');
    }
  };

  const handleChangeCredentials = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (!newUsername && !newPassword) {
      alert('Please enter a new username or password');
      return;
    }

    setChangingSettings(true);

    try {
      // Update username if provided
      if (newUsername) {
        const { data: existingUsername } = await supabase
          .from('admin_settings')
          .select('id')
          .eq('setting_key', 'admin_username')
          .single();

        if (existingUsername) {
          const { error } = await supabase
            .from('admin_settings')
            .update({ setting_value: newUsername, updated_at: new Date().toISOString() })
            .eq('setting_key', 'admin_username');
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('admin_settings')
            .insert([{ setting_key: 'admin_username', setting_value: newUsername }]);
          if (error) throw error;
        }
        setStoredUsername(newUsername);
      }

      // Update password if provided
      if (newPassword) {
        const { data: existingPassword } = await supabase
          .from('admin_settings')
          .select('id')
          .eq('setting_key', 'admin_password')
          .single();

        if (existingPassword) {
          const { error } = await supabase
            .from('admin_settings')
            .update({ setting_value: newPassword, updated_at: new Date().toISOString() })
            .eq('setting_key', 'admin_password');
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('admin_settings')
            .insert([{ setting_key: 'admin_password', setting_value: newPassword }]);
          if (error) throw error;
        }
        setStoredPassword(newPassword);
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
      const res = await fetch('https://api.kit.com/v4/subscribers?per_page=1000', {
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': import.meta.env.VITE_KIT_API_KEY,
        },
      });
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Error fetching subscribers from Kit:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivateEnquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('private_enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrivateEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching private enquiries:', error);
    } finally {
      setLoading(false);
    }
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
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setGuides(data || []);

      // Fetch view counts for each guide
      if (data && data.length > 0) {
        await fetchGuideViews(data);
      }
    } catch (error) {
      console.error('Error fetching guides:', error);
      // If table doesn't exist yet, just set empty array
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuideViews = async (guidesData) => {
    try {
      const viewCounts = {};

      for (const guide of guidesData) {
        const { count, error } = await supabase
          .from('guide_views')
          .select('*', { count: 'exact', head: true })
          .eq('guide_slug', guide.slug);

        if (!error) {
          viewCounts[guide.slug] = count || 0;
        }
      }

      setGuideViews(viewCounts);
    } catch (error) {
      console.error('Error fetching guide views:', error);
      // Fail silently
    }
  };

  const handleUpdateGuidePassword = async (guideId, password) => {
    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('guides')
        .update({
          password: password,
          updated_at: new Date().toISOString()
        })
        .eq('id', guideId);

      if (error) throw error;

      showToast('Guide password updated successfully!');
      setEditingGuideId(null);
      setNewGuidePassword('');
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
        const { error } = await supabase
          .from('vacations')
          .update({
            start_date: vacationForm.start_date,
            end_date: vacationForm.end_date,
            reason: vacationForm.reason,
            updated_at: new Date().toISOString()
          })
          .eq('id', vacationForm.id);

        if (error) throw error;
      } else {
        // Create new vacation
        const { error} = await supabase
          .from('vacations')
          .insert([{
            start_date: vacationForm.start_date,
            end_date: vacationForm.end_date,
            reason: vacationForm.reason
          }]);

        if (error) throw error;
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
        const { error } = await supabase
          .from('vacations')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchVacations();
        showToast('Vacation deleted successfully!');
      } catch (error) {
        console.error('Error deleting vacation:', error);
        showToast('Error deleting vacation', 'error');
      }
    });
  };

  const handleUpdateTestimonial = async (testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          review: testimonial.review,
          studio: testimonial.studio,
          class_name: testimonial.class_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', testimonial.id);

      if (error) throw error;

      showToast('Testimonial updated successfully!');
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      showToast('Error updating testimonial: ' + error.message, 'error');
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('event-images')
      .upload(filePath, file);

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
      let image_url = eventForm.image_url;

      // Upload image if file selected
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const eventData = { ...eventForm, image_url };
      delete eventData.id;

      if (eventForm.id) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', eventForm.id);

        if (error) throw error;
      } else {
        // Insert new event
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (error) throw error;
      }

      // Reset form
      setEventForm({
        id: null,
        title: '',
        date: '',
        location: '',
        description: '',
        image_url: '',
        booking_link: '',
        status: 'upcoming',
      });
      setImageFile(null);
      setImagePreviewUrl(null);
      fetchEvents();
      showToast('Event saved successfully!');
    } catch (error) {
      console.error('Error saving event:', error);
      showToast('Error saving event: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleEditEvent = (event) => {
    setEventForm(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id) => {
    showConfirm('Are you sure you want to delete this event?', async () => {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchEvents();
        showToast('Event deleted successfully!');
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
        const { error } = await supabase
          .from('private_enquiries')
          .delete()
          .eq('id', id);

        if (error) throw error;
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
      const { error } = await supabase
        .from('private_enquiries')
        .update({ followed_up: !enquiry.followed_up })
        .eq('id', enquiry.id);

      if (error) throw error;
      fetchPrivateEnquiries();
    } catch (error) {
      console.error('Error updating enquiry:', error);
      alert('Error updating enquiry: ' + error.message);
    }
  };

  const handleDeleteSubscriber = async (id) => {
    showConfirm('Are you sure you want to delete this subscriber?', async () => {
      try {
        const { error } = await supabase
          .from('subscribers')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchSubscribers();
        showToast('Subscriber deleted successfully!');
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        showToast('Error deleting subscriber: ' + error.message, 'error');
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg max-w-md w-full border border-[#C9B99A] shadow-sm">
          <h1 className="text-2xl font-light text-[#1C1410] mb-6">Admin Login</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A] mb-4"
            required
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A] mb-4"
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-[#785E3D] text-white py-3 rounded-md hover:bg-[#6B5030] transition-colors"
          >
            Login
          </button>
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
                localStorage.removeItem('admin_authenticated');
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
            onClick={() => setActiveTab('testimonials')}
            className={`pb-4 px-4 text-sm font-medium transition-colors ${activeTab === 'testimonials' ? 'border-b-2 border-[#785E3D] text-[#785E3D]' : 'text-[#6B5740] hover:text-[#1C1410]'}`}
          >
            Testimonials
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
                  <label
                    htmlFor="image-upload"
                    className="inline-block px-6 py-3 bg-[#EAE0CF] text-[#1C1410] text-sm rounded-md hover:bg-[#C9B99A] transition-colors cursor-pointer"
                  >
                    Upload Image
                  </label>
                  <p className="text-xs text-[#6B5740] mt-2">
                    {imageFile ? '✓ Image uploaded and cropped' : 'Upload an event image (optional)'}
                  </p>
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
                      onClick={() => {
                        setEventForm({
                          id: null,
                          title: '',
                          date: '',
                          location: '',
                          description: '',
                          image_url: '',
                          booking_link: '',
                          status: 'upcoming',
                        });
                        setImageFile(null);
                        setImagePreviewUrl(null);
                      }}
                      className="bg-[#EAE0CF] text-[#1C1410] px-6 py-2 rounded-md hover:bg-[#C9B99A] transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Preview Section */}
            {(eventForm.title || eventForm.date || eventForm.location || imagePreviewUrl) && (
              <div className="bg-white p-6 rounded-lg mb-8 border border-[#C9B99A] shadow-sm">
                <h2 className="text-xl font-light mb-4 text-[#1C1410]">Preview</h2>
                <p className="text-xs text-[#6B5740] mb-4">This is how your event will appear on the Events page</p>
                <div className="max-w-sm">
                  <div className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md overflow-hidden">
                    {/* Image or Placeholder */}
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
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
            )}

            {/* Events List */}
            <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
              <h2 className="text-xl font-light mb-4 text-[#1C1410]">All Events</h2>
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

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="bg-white p-6 rounded-lg border border-[#C9B99A] shadow-sm">
            <h2 className="text-xl font-light mb-6 text-[#1C1410]">Manage Testimonials</h2>
            <p className="text-sm text-[#6B5740] mb-6">Edit the 3 testimonials that appear on the homepage</p>

            {loading ? (
              <p className="text-[#6B5740]">Loading...</p>
            ) : testimonials.length === 0 ? (
              <p className="text-[#6B5740]">No testimonials found. Please run the setup SQL first.</p>
            ) : (
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="bg-[#F4EFE6] p-6 rounded-md border border-[#C9B99A]">
                    <h3 className="text-lg font-medium mb-4 text-[#1C1410]">Testimonial {index + 1}</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateTestimonial(testimonial);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-[#6B5740] mb-2">Review</label>
                        <textarea
                          value={testimonial.review}
                          onChange={(e) => {
                            const updatedTestimonials = [...testimonials];
                            updatedTestimonials[index].review = e.target.value;
                            setTestimonials(updatedTestimonials);
                          }}
                          placeholder="The review text"
                          className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                          rows="3"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#6B5740] mb-2">Studio</label>
                          <input
                            type="text"
                            value={testimonial.studio}
                            onChange={(e) => {
                              const updatedTestimonials = [...testimonials];
                              updatedTestimonials[index].studio = e.target.value;
                              setTestimonials(updatedTestimonials);
                            }}
                            placeholder="e.g., Flo Yoga"
                            className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#6B5740] mb-2">Class</label>
                          <input
                            type="text"
                            value={testimonial.class_name}
                            onChange={(e) => {
                              const updatedTestimonials = [...testimonials];
                              updatedTestimonials[index].class_name = e.target.value;
                              setTestimonials(updatedTestimonials);
                            }}
                            placeholder="e.g., Experienced Flow"
                            className="w-full px-4 py-3 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#785E3D] text-white px-6 py-2 rounded-md hover:bg-[#6B5030] transition-colors"
                      >
                        Update Testimonial
                      </button>
                    </form>
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
              Manage your password-protected guides. Click on a guide to view or change its access password.
            </p>

            {loading ? (
              <p className="text-[#6B5740]">Loading...</p>
            ) : guides.length === 0 ? (
              <div className="text-[#6B5740]">
                <p className="mb-4">No guides found in database. You need to create the guides table first.</p>
                <div className="bg-[#F4EFE6] p-4 rounded-md border border-[#C9B99A]">
                  <p className="text-xs text-[#785E3D] mb-2">Run this SQL in your Supabase SQL editor:</p>
                  <pre className="text-xs text-[#1C1410] overflow-x-auto whitespace-pre-wrap">
{`-- Create the guides table
CREATE TABLE IF NOT EXISTS guides (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (so password gate can fetch the password)
CREATE POLICY "Allow public read access" ON guides FOR SELECT USING (true);

-- Create policy to allow authenticated updates (you can customize this based on your auth setup)
CREATE POLICY "Allow authenticated updates" ON guides FOR UPDATE USING (true);

-- Insert the handstand guide (if it doesn't exist)
INSERT INTO guides (title, slug, password, description)
VALUES ('Handstand Fundamentals Guide', 'handstandguide', 'handstand2026', 'A structured approach to building your handstand practice')
ON CONFLICT (slug) DO NOTHING;

-- Create the guide_views table to track views
CREATE TABLE IF NOT EXISTS guide_views (
  id SERIAL PRIMARY KEY,
  guide_slug TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guide_views ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (so view tracking works)
CREATE POLICY "Allow public inserts" ON guide_views FOR INSERT WITH CHECK (true);

-- Create policy to allow public reads (so admin can see view counts)
CREATE POLICY "Allow public reads" ON guide_views FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_guide_views_slug ON guide_views(guide_slug);`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {guides.map((guide) => (
                  <div key={guide.id} className="bg-[#F4EFE6] p-6 rounded-md border border-[#C9B99A]">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-medium text-[#1C1410]">{guide.title}</h3>
                          <span className="px-2 py-1 bg-[#785E3D] text-white text-xs rounded">
                            {guideViews[guide.slug] || 0} {guideViews[guide.slug] === 1 ? 'view' : 'views'}
                          </span>
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
                      <span className="text-xs text-[#6B5740]">
                        Updated {new Date(guide.updated_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {editingGuideId === guide.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-[#6B5740] mb-2">New Password</label>
                          <input
                            type="text"
                            value={newGuidePassword}
                            onChange={(e) => setNewGuidePassword(e.target.value)}
                            placeholder="Enter new password (min 6 characters)"
                            className="w-full px-4 py-2 bg-white text-[#1C1410] border border-[#C9B99A] rounded-md outline-none focus:border-[#785E3D] placeholder-[#C9B99A]"
                            minLength={6}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateGuidePassword(guide.id, newGuidePassword)}
                            disabled={loading}
                            className="px-4 py-2 bg-[#785E3D] text-white rounded-md hover:bg-[#6B5030] transition-colors disabled:opacity-50 text-sm"
                          >
                            {loading ? 'Updating...' : 'Update Password'}
                          </button>
                          <button
                            onClick={() => {
                              setEditingGuideId(null);
                              setNewGuidePassword('');
                            }}
                            className="px-4 py-2 bg-[#EAE0CF] text-[#1C1410] rounded-md hover:bg-[#C9B99A] transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white px-4 py-3 rounded-md border border-[#C9B99A]">
                          <p className="text-xs text-[#6B5740] mb-1">Current Password</p>
                          <p className="text-sm text-[#1C1410] font-mono">{guide.password}</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingGuideId(guide.id);
                            setNewGuidePassword(guide.password);
                          }}
                          className="px-4 py-2 bg-[#785E3D] text-white rounded-md hover:bg-[#6B5030] transition-colors text-sm"
                        >
                          Change Password
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
                <p className="text-xs text-[#6B5740] mt-1">Minimum 6 characters, leave blank to keep current password</p>
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
              <p className="text-sm text-[#6B5740] mb-2">
                <strong className="text-[#1C1410]">Current Username:</strong> {storedUsername || 'admin (default)'}
              </p>
              <p className="text-sm text-[#6B5740]">
                <strong className="text-[#1C1410]">Password Source:</strong> {storedPassword ? 'Custom (stored in database)' : 'Default (environment variable)'}
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
