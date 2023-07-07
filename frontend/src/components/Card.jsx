import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import { getTextColor } from '../utils';
import { BASE_URL } from '../constants';

const Card = ({ card, onEdit, onDelete, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEditClick = () => {
    onEdit(card.id);
  };

  const handleDeleteClick = () => {
    onDelete(card.id);
  };

  const textColor = {
    primary: 'black',
    paragraph: 'black',
  };

  const divStyle = {
    border: `2px solid ${card.color}`,
    borderRadius: '10px',
    backgroundColor: 'white',
    color: textColor.primary,
  };

  const paragraphStyle = {
    color: 'black',
  };

  const renderAvatar = () => {
    if (card.icon) {
      return (
        <img
          className="w-20 h-20 rounded-full"
          src={`${BASE_URL}/icon/${card.icon}`}
          style={{ border: `2px solid ${card.color}` }}
          alt="Avatar"
        />
      );
    } else {
      return (
        <div
          className="w-20 h-20 rounded-full bg-gray-300"
          style={{ border: `2px solid ${card.color}` }}
        ></div>
      );
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex">
      <div
        className={`rounded-lg shadow-lg p-6 flex flex-col justify-between h-full w-full ${
          isHovered
            ? 'bg-gray-100 transition-colors duration-300'
            : 'transition-none'
        }`}
        style={divStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600 overflow-hidden" style={paragraphStyle}>
              {card.description}
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">{renderAvatar()}</div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className={`rounded-lg shadow px-4 py-2 mr-2 ${
              isHovered
                ? 'bg-gray-300 transition-colors duration-300'
                : 'bg-transparent transition-none'
            }`}
            onClick={handleEditClick}
          >
            {loading ? (
              <ClipLoader size={20} color="#10B981" />
            ) : (
              <FiEdit size={20} />
            )}
          </button>
          <button
            className={`rounded-lg shadow px-4 py-2 ${
              isHovered
                ? 'bg-gray-300 transition-colors duration-300'
                : 'bg-transparent transition-none'
            }`}
            onClick={handleDeleteClick}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
