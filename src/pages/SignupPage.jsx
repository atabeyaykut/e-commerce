import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import api from '../utils/axios';

const SignupPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedRole = watch('role_id');

  // Password validation pattern
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  // Turkish phone pattern
  const phonePattern = /^(\+90|0)?[0-9]{10}$/;
  // Tax ID pattern
  const taxPattern = /^T\d{4}V\d{6}$/;
  // IBAN pattern (Turkish IBAN is 26 characters)
  const ibanPattern = /^TR\d{24}$/;

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);

        // Find customer role and set it as default
        const customerRole = response.data.find(role => role.name.toLowerCase() === 'customer');
        if (customerRole) {
          setValue('role_id', customerRole.id.toString());
        }
      } catch (err) {
        setError('Failed to fetch roles');
      }
    };
    fetchRoles();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Format the data based on the role
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      };

      // Add store data if role is store
      if (data.role_id === '3') { // Assuming 3 is store role_id
        formData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.tax_no,
          bank_account: data.bank_account,
        };
      }

      await api.post('/signup', formData);

      // Redirect with success message using state
      history.goBack();
      // Add message to localStorage for displaying after redirect
      localStorage.setItem('signupMessage', 'You need to click link in email to activate your account!');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col justify-center  py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: passwordPattern,
                      message: 'Password must contain at least 8 characters, including numbers, lowercase, uppercase, and special characters'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-1">
                <select
                  {...register('role_id', { required: 'Role selection is required' })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id.toString()}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>
                )}
              </div>
            </div>

            {/* Store Fields - Only shown when store role is selected */}
            {selectedRole === '3' && (
              <>
                {/* Store Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('store_name', {
                        required: 'Store name is required',
                        minLength: {
                          value: 3,
                          message: 'Store name must be at least 3 characters'
                        }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter store name"
                    />
                    {errors.store_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>
                    )}
                  </div>
                </div>

                {/* Store Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Store Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      {...register('store_phone', {
                        required: 'Store phone is required',
                        pattern: {
                          value: /^(\+90|0)?[0-9]{10}$/,
                          message: 'Please enter a valid Turkish phone number (e.g., 05301234567)'
                        }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="05301234567"
                    />
                    {errors.store_phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Tax ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tax ID
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('tax_no', {
                        required: 'Tax ID is required',
                        pattern: {
                          value: /^T[0-9]{4}V[0-9]{6}$/,
                          message: 'Please enter a valid Tax ID (Format: TXXXXVXXXXXX, where X is a number)'
                        }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="T1234V123456"
                    />
                    {errors.tax_no && (
                      <p className="mt-1 text-sm text-red-600">{errors.tax_no.message}</p>
                    )}
                  </div>
                </div>

                {/* Bank Account */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Account (IBAN)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register('bank_account', {
                        required: 'Bank account is required',
                        pattern: {
                          value: /^TR[0-9]{24}$/,
                          message: 'Please enter a valid Turkish IBAN (Format: TR + 24 digits)'
                        }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="TR123456789012345678901234"
                    />
                    {errors.bank_account && (
                      <p className="mt-1 text-sm text-red-600">{errors.bank_account.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
