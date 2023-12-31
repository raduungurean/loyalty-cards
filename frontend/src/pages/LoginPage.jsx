import React, { useEffect, useState } from 'react';
import { login } from '../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setRemember } from '../store/reducers/authSlice';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoCardOutline } from 'react-icons/io5';
import { invalidCredentialsText } from '../constants';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [remember, setRememberState] = useState(false);

  const isAuthenticated = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const isLoggingIn = useSelector((state) => {
    return state.auth.isLoggingIn;
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  const handleRememberChange = (event) => {
    setRememberState(event.target.checked);
    dispatch(setRemember(event.target.checked));
  };

  const error = useSelector((state) => {
    return state.auth.error;
  });

  useEffect(() => {
    if (error) {
      toast.error(invalidCredentialsText);
    }
  }, [error]);

  return (
    <div className="w-full max-w-md" data-testid="login-page">
      <form
        className="bg-slate-100 shadow-sm rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-bold mb-4">Fidelity Cards</h2>
        <div className="mt-4 flex items-center justify-center">
          <IoCardOutline className="h-12 w-12 text-gray-400" />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-12 right-3 transform -translate-y-1/2 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-500" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="text-gray-700 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked={remember}
              onChange={handleRememberChange}
            />
            <span className="text-sm">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>
        <div className="submitButton flex items-center justify-between">
          {isLoggingIn ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              disabled
            >
              <ClipLoader
                className={'spinner'}
                size={12}
                color={'#fff'}
                loading={true}
              />
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          )}
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:text-blue-800"
          >
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
