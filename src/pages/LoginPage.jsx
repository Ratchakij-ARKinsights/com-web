import { useState } from 'react';
import { Link } from "react-router-dom";

import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleSubmitForm = async e => {
    try {
      e.preventDefault();
      await login(email, password);
      // console.log("Login successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign in
          </h1>

          <form className="mt-6" onSubmit={handleSubmitForm}>
            <div className="mb-2">
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email Address"
                autoComplete='on'
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Don't have an account?
            <span className="ml-1 font-medium text-purple-600 hover:underline">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
