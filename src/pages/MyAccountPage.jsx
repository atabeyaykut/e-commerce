import React from 'react';
import { useHistory } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import md5 from 'md5';

const MyAccountPage = () => {
  const { user, logout } = useAuthStore();
  const history = useHistory();

  // If no user, redirect to login
  if (!user) {
    history.push('/login');
    return null;
  }

  // Create MD5 hash of email for Gravatar
  const emailHash = md5(user.email.toLowerCase().trim());
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=200&d=identicon`;

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            {/* Header */}
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                My Account
              </h3>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>

            {/* Profile section */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center">
                  {/* Avatar */}
                  <div className="mb-4 sm:mb-0 sm:mr-6">
                    <img
                      src={gravatarUrl}
                      alt={user.name}
                      className="h-32 w-32 rounded-full shadow-lg"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Name</p>
                          <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
