import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import authService from '../../../services/authService';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();

  const getTokenFromUrl = (): string => {
    const params = new URLSearchParams(location.search);
    return params.get('token') || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const token = getTokenFromUrl();
      const response = await authService.resetPassword(token, newPassword); // 使用 resetPasswordService 进行密码重置

      if (response.code === 1) {
        setMessage('Password has been reset successfully.');
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      } else {
        setError(response.msg);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <button type="submit" className="btn btn-secondary btn-block" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
