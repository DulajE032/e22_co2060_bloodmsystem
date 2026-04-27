import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, User, Settings, LogOut, Droplets, History, Calendar, Phone, Hospital, IdCard, Edit2, Camera, QrCode, Menu, X as CloseIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDonorProfile, updateDonorProfile } from '../../services/donorService';
import { QRCodeCanvas } from 'qrcode.react';
import Swal from 'sweetalert2';
import './DonorDashboard.css';
const DonorSideBar = ({ profile, currentView, setView, onUpdate, isMobileOpen, closeMobileMenu }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('authTokens');
    navigate('/login');
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        await updateDonorProfile({ profile_image: e.target.files[0] });
        Swal.fire({
          icon: 'success', title: 'Avatar Updated', toast: true,
          position: 'top-end', showConfirmButton: false, timer: 3000
        });
        if (onUpdate) onUpdate();
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Upload Failed' });
      } finally {
        setIsUploading(false);
      }
    }
  };
  const navClick = (dest) => {
    setView(dest);
    closeMobileMenu();
  };
  return (
    <>
      <div className={`donor-sidebar-overlay ${isMobileOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
      <aside className={`donor-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>

          <button className="mobile-close-btn" type="button" onClick={closeMobileMenu}><CloseIcon size={20}/></button>

        <div className="sidebar-profile">
          <div className="profile-avatar-container sidebar-pic-wrapper">
            {profile?.profile_image ? (
              <img src={profile.profile_image} alt="Profile" className="profile-avatar responsive-avatar" />
            ) : (
              <div className="profile-avatar placeholder-avatar">
                {profile?.fullName?.charAt(0) || 'U'}
              </div>
            )}
            <div className="avatar-edit-badge" onClick={handleImageClick} title="Update Profile Picture">
              {isUploading ? <div className="spinner-mini"></div> : <Edit2 size={12} />}
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} disabled={isUploading} />
          </div>
          <h3 className="profile-name">{profile?.fullName || 'No Name Set'}</h3>
          <span className="profile-blood-badge">{profile?.blood_group || '--'}</span>
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button onClick={() => navClick('dashboard')} className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}>
                <LayoutDashboard size={20} /> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button onClick={() => navClick('profile')} className={`nav-button ${currentView === 'profile' ? 'active' : ''}`}>
                <User size={20} /> My Profile
              </button>
            </li>
            <li className="nav-item">
              <button onClick={() => navClick('settings')} className={`nav-button ${currentView === 'settings' ? 'active' : ''}`}>
                <Settings size={20} /> Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};
const ProfileView = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const startEditing = () => {
    // ?? Create independent editable copy
    setEditData({
      phoneNumber: profile?.phoneNumber || '',
      hospital: profile?.hospital || '',
      profile_image: null
    });
    setPreviewImage(profile?.profile_image || '');
    setIsEditing(true);
  };
  const handleCancel = () => {
    // ?? Revert easily back to View Mode
    setIsEditing(false);
    setEditData(null);
    setPreviewImage('');
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditData({ ...editData, profile_image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      await updateDonorProfile(editData);
      Swal.fire({ icon: 'success', title: 'Profile Updated', toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      onUpdate(); // Reload original
      setIsEditing(false);
      setEditData(null);
    } catch (err) {
      const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : 'Update Failed';
      Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profile-page-content animate-in">
      <div className="profile-header-action">
        <h1 className="page-title">Personal Information</h1>
        {!isEditing ? (
          <button className="btn btn-primary edit-mob-btn" onClick={startEditing}>
            <Edit2 size={16} /> <span className="btn-text">Edit Profile</span>
          </button>
        ) : (
          <div className="edit-actions-group">
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
      <div className="profile-details-grid grid-responsive">
        <div className="stat-card">
          <label className="stat-label"><IdCard size={14} /> Full Name</label>
          <p className="stat-value">{profile?.fullName || 'Not Provided'}</p>

        </div>
        <div className="stat-card">
          <label className="stat-label"><Droplets size={14} /> Blood Group</label>
          <p className="stat-value">{profile?.blood_group || 'Not Provided'}</p>

        </div>
        <div className="stat-card">
          <label className="stat-label"><IdCard size={14} /> NIC Number</label>
          <p className="stat-value">{profile?.nic_number || 'Not Provided'}</p>

        </div>
        <div className="stat-card">
          <label className="stat-label"><Phone size={14} /> Phone Number</label>
          {isEditing ? (
            <input className="form-input" value={editData.phoneNumber} onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})} />
          ) : (
            <p className="stat-value">{profile?.phoneNumber || 'Not Provided'}</p>
          )}
        </div>
        <div className="stat-card">
          <label className="stat-label"><Hospital size={14} /> Nearest Hospital</label>
          {isEditing ? (
            <input className="form-input" value={editData.hospital} onChange={(e) => setEditData({...editData, hospital: e.target.value})} />
          ) : (
            <p className="stat-value">{profile?.hospital || 'Not Provided'}</p>
          )}
        </div>
        <div className="stat-card">
          <label className="stat-label"><Camera size={14} /> Profile Image</label>
          {isEditing ? (
            <div className="image-edit-container">
              <input type="file" accept="image/*" className="form-input file-input" onChange={handleImageChange} />
              {previewImage && <img src={previewImage} alt="Preview" className="image-preview view-only" />}
            </div>
          ) : (
            <div className="image-view-container">
              {profile?.profile_image ? (
                <img src={profile.profile_image} alt="Profile" className="image-preview view-only" />
              ) : (
                <p className="stat-value text-muted" style={{ color: '#6b7280', fontSize:'0.9rem', marginTop:'8px' }}>No image set</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const DashboardOverview = ({ profile }) => (
  <div className="animate-in">
    <p className="page-subtitle">Welcome back, {profile?.fullName || 'Donor'}. Here is your donation status.</p>
    <div className="stats-grid grid-responsive-3">
      <div className="stat-card">
        <div className="stat-icon icon-red"><Droplets size={24} /></div>
        <p className="stat-label">Blood Group</p>
        <h3 className="stat-value">{profile?.blood_group || '--'}</h3>
      </div>
      <div className="stat-card">
        <div className="stat-icon icon-blue"><History size={24} /></div>
        <p className="stat-label">Total Donations</p>
        <h3 className="stat-value">{profile?.donations || '0'}</h3>
      </div>
      <div className="stat-card">
        <div className="stat-icon icon-green"><Calendar size={24} /></div>
        <p className="stat-label">Last Donation</p>
        <h3 className="stat-value">
          {profile?.last_donation ? new Date(profile.last_donation).toLocaleDateString() : 'N/A'}
        </h3>
      </div>
    </div>
    <div className="qr-section stat-card centered-card">
      <div className="qr-header">
        <QrCode size={24} /> <h2>Your Donor QR Code</h2>
      </div>
      <div className="qr-box">
        {profile?.qr_id ? (
          <QRCodeCanvas 
            value={profile.qr_id} size={180} level={"H"} includeMargin={true}
            imageSettings={{ src: "/favicon.svg", height: 40, width: 40, excavate: true }}
          />
        ) : (
          <div className="qr-placeholder">QR ID not available</div>
        )}
      </div>
      <p className="qr-desc">Show this QR code at any donation center to quickly access your profile and record your donation.</p>
      <div className="qr-id-tag">ID: {profile?.qr_id || 'Generating...'}</div>
    </div>
  </div>
);
const DonorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getDonorProfile();
      setProfile(data); // 1. Loads data first & saves as Original Data
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="donor-container flex-layout">
      <DonorSideBar 
        profile={profile} 
        currentView={view} 
        setView={setView} 
        onUpdate={fetchProfile} 
        isMobileOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      <main className="donor-main">
        <div className="mobile-header">
           <div className="mobile-brand">

           </div>
           <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
             <Menu size={24} />
           </button>
        </div>
        <div className="donor-content-area">
          {loading ? (
            <div className="loader-container centered">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {view === 'dashboard' && <DashboardOverview profile={profile} />}
              {view === 'profile' && <ProfileView profile={profile} onUpdate={fetchProfile} />}
              {view === 'settings' && (
                <div className="animate-in">
                  <h1 className="page-title">Settings</h1>
                  <p className="page-subtitle">Manage your account preferences.</p>
                  <div className="stat-card">Settings module coming soon...</div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
export default DonorDashboard;
