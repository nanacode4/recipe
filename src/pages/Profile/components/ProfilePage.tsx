// src/components/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import UserRecipes from './UserRecipes';
import userService, { UserProfile } from '../../../services/userService';
import recipeService, { Recipe } from '../../../services/recipeService';
import UserProfileComponent from './UserProfileComponent';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const fetchProfileAndRecipes = async () => {
      try {
        const profileData = await userService.getUserProfile();
        setProfile(profileData);

        const recipesData = await recipeService.getUserRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching profile or recipes:', error);
        setError('Error fetching profile or recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return (
      <div className="alert alert-warning" role="alert">
        Users need to be logged in to view profiles.
      </div>
    );
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '600px', width: '100%' }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {profile && <UserProfileComponent profile={profile} setProfile={setProfile} />}
        <UserRecipes recipes={recipes} setRecipes={setRecipes} />
      </div>
    </div>
  );
};

export default ProfilePage;
