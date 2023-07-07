import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const AppLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen" onClick={handlePageClick}>
      <nav className="bg-slate-100">
        <div className="flex justify-between items-center py-2 px-4">
          <div>
            <div
              className={`hamburger-icon ${isOpen ? 'open' : ''}`}
              onClick={handleMenuClick}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="text-black font-bold">Fidelity Cards</div>
          <div></div>
        </div>
      </nav>
      {isOpen && (
        <Menu isOpen={isOpen} className="bg-slate-100 text-black font-bold">
          <Link
            to="/"
            className="block py-4 px-4 hover:bg-slate-200 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="h-5 w-5 mr-2 inline-block" />
            <span>Home</span>
          </Link>
          <hr className="border-gray-700 my-2" />
          <button
            onClick={handleLogout}
            className="block py-4 px-4 hover:bg-slate-200 flex items-center"
          >
            <FaSignOutAlt className="h-5 w-5 mr-2 inline-block" />
            <span>Logout</span>
          </button>
        </Menu>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default AppLayout;
