import React, { useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Barcode from 'react-barcode';
import { ChromePicker } from 'react-color';
import WrapperDialog from './WrapperDialog';
import AvatarChooser from './AvatarChooser';
const EditCardDialog = ({
  open,
  onClose,
  onAdd,
  progress,
  title,
  barcode,
  description,
  setTitle,
  setDescription,
  color,
  setColor,
  setAvatar,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  const handleColorChange = (color) => {
    setColor(color ? color.hex : 'black');
  };

  return (
    <WrapperDialog onClose={onClose} open={open} title={'Edit Card'}>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {barcode && barcode !== 'null' && (
            <div className="mt-4">
              <Barcode value={barcode + ''} />
            </div>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={setTitle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={setDescription}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <div className="relative" ref={colorPickerRef}>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              className="absolute inset-y-0 right-0 px-2 py-0 text-white bg-blue-500 rounded"
              onClick={() => setShowColorPicker((prevState) => !prevState)}
            >
              Pick
            </button>
            {showColorPicker && (
              <div className="absolute bottom-8 z-10">
                <ChromePicker
                  color={color || '#000000'}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <AvatarChooser onChange={setAvatar} />
        </div>

        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={onAdd}
            type="submit"
            className={`px-3 py-1 text-white bg-blue-500 rounded ${
              progress ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={progress}
          >
            {progress ? (
              <>
                <ClipLoader color="#ffffff" size={20} /> Editing ...
              </>
            ) : (
              'Edit Card'
            )}
          </button>
        </div>
      </div>
    </WrapperDialog>
  );
};

export default EditCardDialog;
