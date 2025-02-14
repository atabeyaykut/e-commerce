import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { Facebook, Twitter } from 'lucide-react';
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
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-4xl font-bold text-white">Join Our Community</h2>
            <p className="max-w-xl mt-3 text-gray-300">
              Create an account and get access to exclusive deals, personalized recommendations, and much more!
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col w-full lg:w-1/2">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Join us today and explore amazing products
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your full name"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your email"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Create a strong password"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="mt-1">
                    <select
                      {...register('role_id', { required: 'Role selection is required' })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={loading}
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    {errors.role_id && (
                      <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>
                    )}
                  </div>
                </div>

                {/* Conditional Store Fields */}
                {selectedRole === '3' && (
                  <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="text-lg font-medium text-gray-900">Store Information</h3>
                    
                    {/* Store Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Store Name
                      </label>
                      <input
                        type="text"
                        {...register('store_name', { required: 'Store name is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter store name"
                      />
                      {errors.store_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>
                      )}
                    </div>

                    {/* Store Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Store Phone
                      </label>
                      <input
                        type="tel"
                        {...register('store_phone', {
                          required: 'Store phone is required',
                          pattern: {
                            value: phonePattern,
                            message: 'Please enter a valid Turkish phone number'
                          }
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="+90 XXX XXX XX XX"
                      />
                      {errors.store_phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>
                      )}
                    </div>

                    {/* Tax Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tax Number
                      </label>
                      <input
                        type="text"
                        {...register('tax_no', {
                          required: 'Tax number is required',
                          pattern: {
                            value: taxPattern,
                            message: 'Please enter a valid tax number (Format: TXXXXVXXXXXX)'
                          }
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="TXXXXVXXXXXX"
                      />
                      {errors.tax_no && (
                        <p className="mt-1 text-sm text-red-600">{errors.tax_no.message}</p>
                      )}
                    </div>

                    {/* Bank Account (IBAN) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bank Account (IBAN)
                      </label>
                      <input
                        type="text"
                        {...register('bank_account', {
                          required: 'IBAN is required',
                          pattern: {
                            value: ibanPattern,
                            message: 'Please enter a valid Turkish IBAN'
                          }
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="TR..."
                      />
                      {errors.bank_account && (
                        <p className="mt-1 text-sm text-red-600">{errors.bank_account.message}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span className="ml-2">Facebook</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <span className="ml-2">Twitter</span>
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
