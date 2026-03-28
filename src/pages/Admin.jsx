import { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storedUsername, setStoredUsername] = useState(null);
  const [storedPassword, setStoredPassword] = useState(null);

  // Settings change state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingSettings, setChangingSettings] = useState(false);

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
  const [uploading, setUploading] = useState(false);

  // Image cropping state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    fetchStoredCredentials();
  }, []);

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
      fetchEvents();
      fetchSubscribers();
    } else {
      alert('Incorrect username or password');
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
      alert('Credentials updated successfully!');
    } catch (error) {
      console.error('Error updating credentials:', error);
      alert('Error updating credentials: ' + error.message);
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
      setImageFile(croppedFile);
      setCropModalOpen(false);
      setImageToCrop(null);
      alert('Image cropped successfully! Now save the event to upload.');
    } catch (error) {
      console.error('Error cropping image:', error);
      alert('Error cropping image');
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

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
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false});

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
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
      fetchEvents();
      alert('Event saved successfully!');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditEvent = (event) => {
    setEventForm(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchEvents();
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Signup Date', 'Source'],
      ...subscribers.map(s => [
        s.email,
        new Date(s.created_at).toLocaleDateString(),
        s.source
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1C1410] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-[#2A1E16] p-8 rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-light text-[#F4EFE6] mb-6">Admin Login</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C] mb-4"
            required
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C] mb-4"
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-[#9C7F5C] text-[#F4EFE6] py-3 rounded-md hover:bg-[#8A6F4C] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C1410] text-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">Admin Dashboard</h1>
          <a
            href="/"
            className="text-sm text-[#9C7F5C] hover:text-[#F4EFE6] transition-colors"
          >
            ← Back to Site
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#3A2E26]">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-4 ${activeTab === 'events' ? 'border-b-2 border-[#9C7F5C] text-[#9C7F5C]' : 'text-[#6B5740]'}`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-4 px-4 ${activeTab === 'subscribers' ? 'border-b-2 border-[#9C7F5C] text-[#9C7F5C]' : 'text-[#6B5740]'}`}
          >
            Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 px-4 ${activeTab === 'settings' ? 'border-b-2 border-[#9C7F5C] text-[#9C7F5C]' : 'text-[#6B5740]'}`}
          >
            Settings
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            {/* Event Form */}
            <div className="bg-[#2A1E16] p-6 rounded-lg mb-8">
              <h2 className="text-xl font-light mb-4">{eventForm.id ? 'Edit Event' : 'Add New Event'}</h2>
              <form onSubmit={handleSubmitEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                  required
                />
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                />
                <input
                  type="url"
                  placeholder="Booking Link"
                  value={eventForm.booking_link}
                  onChange={(e) => setEventForm({ ...eventForm, booking_link: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                />
                <textarea
                  placeholder="Description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C] md:col-span-2"
                  rows="3"
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C] w-full"
                  />
                  <p className="text-xs text-[#6B5740] mt-1">
                    {imageFile ? '✓ Image cropped and ready' : 'Upload event image (optional) - you can crop it before saving'}
                  </p>
                </div>
                <select
                  value={eventForm.status}
                  onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-[#9C7F5C] text-[#F4EFE6] px-6 py-2 rounded-md hover:bg-[#8A6F4C] transition-colors disabled:opacity-50"
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
                      }}
                      className="bg-[#3A2E26] text-[#F4EFE6] px-6 py-2 rounded-md hover:bg-[#4A3E36] transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Events List */}
            <div className="bg-[#2A1E16] p-6 rounded-lg">
              <h2 className="text-xl font-light mb-4">All Events</h2>
              {loading ? (
                <p>Loading...</p>
              ) : events.length === 0 ? (
                <p className="text-[#6B5740]">No events yet. Add your first event above!</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-[#1C1410] p-4 rounded-md border border-[#3A2E26]">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-1">{event.title}</h3>
                          <p className="text-sm text-[#9C7F5C] mb-2">{event.date} • {event.location}</p>
                          {event.description && <p className="text-sm text-[#6B5740] mb-2">{event.description}</p>}
                          <div className="flex gap-2 items-center">
                            <span className={`text-xs px-2 py-1 rounded ${event.status === 'upcoming' ? 'bg-[#9C7F5C]' : 'bg-[#3A2E26]'}`}>
                              {event.status}
                            </span>
                            {event.image_url && <span className="text-xs text-[#6B5740]">Has image</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="px-3 py-1 bg-[#9C7F5C] rounded text-sm hover:bg-[#8A6F4C] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-3 py-1 bg-red-900 rounded text-sm hover:bg-red-800 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="bg-[#2A1E16] p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-light">Subscribers ({subscribers.length})</h2>
              <button
                onClick={exportToCSV}
                className="bg-[#9C7F5C] text-[#F4EFE6] px-4 py-2 rounded-md hover:bg-[#8A6F4C] transition-colors text-sm"
              >
                Export to CSV
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : subscribers.length === 0 ? (
              <p className="text-[#6B5740]">No subscribers yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#3A2E26]">
                      <th className="text-left py-2 px-4 text-[#9C7F5C]">Email</th>
                      <th className="text-left py-2 px-4 text-[#9C7F5C]">Signup Date</th>
                      <th className="text-left py-2 px-4 text-[#9C7F5C]">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="border-b border-[#3A2E26]">
                        <td className="py-3 px-4">{subscriber.email}</td>
                        <td className="py-3 px-4 text-[#6B5740]">
                          {new Date(subscriber.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-[#6B5740]">{subscriber.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-[#2A1E16] p-6 rounded-lg max-w-2xl">
            <h2 className="text-xl font-light mb-6">Admin Settings</h2>

            <form onSubmit={handleChangeCredentials} className="space-y-4">
              <div>
                <label className="block text-sm text-[#9C7F5C] mb-2">New Username (optional)</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                  autoComplete="username"
                />
                <p className="text-xs text-[#6B5740] mt-1">Leave blank to keep current username</p>
              </div>

              <div>
                <label className="block text-sm text-[#9C7F5C] mb-2">New Password (optional)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                  minLength={6}
                  autoComplete="new-password"
                />
                <p className="text-xs text-[#6B5740] mt-1">Minimum 6 characters, leave blank to keep current password</p>
              </div>

              <div>
                <label className="block text-sm text-[#9C7F5C] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                  minLength={6}
                  autoComplete="new-password"
                  disabled={!newPassword}
                />
              </div>

              <button
                type="submit"
                disabled={changingSettings}
                className="bg-[#9C7F5C] text-[#F4EFE6] px-6 py-3 rounded-md hover:bg-[#8A6F4C] transition-colors disabled:opacity-50"
              >
                {changingSettings ? 'Updating...' : 'Update Credentials'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#3A2E26]">
              <p className="text-sm text-[#6B5740] mb-2">
                <strong>Current Username:</strong> {storedUsername || 'admin (default)'}
              </p>
              <p className="text-sm text-[#6B5740]">
                <strong>Password Source:</strong> {storedPassword ? 'Custom (stored in database)' : 'Default (environment variable)'}
              </p>
            </div>
          </div>
        )}

        {/* Image Crop Modal */}
        {cropModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2A1E16] rounded-lg max-w-4xl w-full p-6">
              <h2 className="text-xl font-light mb-4 text-[#F4EFE6]">Crop Image</h2>
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
                <label className="block text-sm text-[#9C7F5C] mb-2">Zoom</label>
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
                  className="px-6 py-2 bg-[#3A2E26] text-[#F4EFE6] rounded-md hover:bg-[#4A3E36] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="px-6 py-2 bg-[#9C7F5C] text-[#F4EFE6] rounded-md hover:bg-[#8A6F4C] transition-colors"
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
