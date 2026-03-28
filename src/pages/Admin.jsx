import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storedPassword, setStoredPassword] = useState(null);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

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

  useEffect(() => {
    fetchStoredPassword();
  }, []);

  const fetchStoredPassword = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'admin_password')
        .single();

      if (!error && data) {
        setStoredPassword(data.setting_value);
      }
    } catch (error) {
      // Password not set in database yet, will use env variable
      console.log('No custom password set, using default');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const correctPassword = storedPassword || import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchEvents();
      fetchSubscribers();
    } else {
      alert('Incorrect password');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setChangingPassword(true);

    try {
      // Check if password record exists
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('setting_key', 'admin_password')
        .single();

      if (existing) {
        // Update existing password
        const { error } = await supabase
          .from('admin_settings')
          .update({ setting_value: newPassword, updated_at: new Date().toISOString() })
          .eq('setting_key', 'admin_password');

        if (error) throw error;
      } else {
        // Insert new password
        const { error } = await supabase
          .from('admin_settings')
          .insert([{ setting_key: 'admin_password', setting_value: newPassword }]);

        if (error) throw error;
      }

      setStoredPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password: ' + error.message);
    } finally {
      setChangingPassword(false);
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C] mb-4"
            required
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
                  type="text"
                  placeholder="Date (e.g., September 2026)"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
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
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="px-4 py-2 bg-[#1C1410] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C] w-full"
                  />
                  <p className="text-xs text-[#6B5740] mt-1">Upload event image (optional)</p>
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

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm text-[#9C7F5C] mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                  required
                  minLength={6}
                />
                <p className="text-xs text-[#6B5740] mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm text-[#9C7F5C] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 bg-[#1C1410] text-[#F4EFE6] border border-[#3A2E26] rounded-md outline-none focus:border-[#9C7F5C]"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={changingPassword}
                className="bg-[#9C7F5C] text-[#F4EFE6] px-6 py-3 rounded-md hover:bg-[#8A6F4C] transition-colors disabled:opacity-50"
              >
                {changingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#3A2E26]">
              <p className="text-sm text-[#6B5740]">
                Current password source: {storedPassword ? 'Custom (stored in database)' : 'Default (environment variable)'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
