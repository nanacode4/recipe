// src/components/UserProfile.tsx
import React, { useState } from 'react';
import userService, { UserProfile }from '../../../services/userService';

interface UserProfileProps {
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ profile, setProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (profile) {
      try {
        const updatedProfile = await userService.updateUserProfile(profile);
        setProfile(updatedProfile);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Error updating profile');
      }
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {profile && (
        <div>
          <h1 className="text-center">User Profile</h1>
          {profile.avatar ? (
            <img src={profile.avatar} alt="User Avatar" className="mb-3" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          ) : (
            <p>No Avatar</p>
          )}
          <div className="mb-3">
            <label>Username: </label>
            {editMode ? (
              <input
                type="text"
                className="form-control"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
            ) : (
              <span>{profile.username}</span>
            )}
          </div>
          <div className="mb-3">
            <label>Password: </label>
            {editMode ? (
              <input
                type="password"
                className="form-control"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              />
            ) : (
              <span> ******** </span>
            )}
          </div>
          <div className="mb-3">
            <label>Email: </label>
            {editMode ? (
              <input
                type="email"
                className="form-control"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          {profile.createTime && (
            <div className="mb-3">
              <label>Account Created:</label>
              <span>{profile.createTime}</span>
            </div>
          )}
          {editMode ? (
            <button className='btn btn-secondary' onClick={handleSave}>Save</button>
          ) : (
            <button className='btn btn-secondary' onClick={() => setEditMode(true)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;
