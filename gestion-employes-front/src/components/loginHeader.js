import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Employee Management</h1>
      <div>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-4"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
