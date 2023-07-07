import { FiCheckSquare, FiEdit } from 'react-icons/fi';
import AvatarEditor from 'react-avatar-editor';
import React, { useRef, useState } from 'react';

function AvatarChooser({ onChange }) {
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const [pickedFile, setPickedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [showEditor, setShowEditor] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPickedFile(file);
    setShowEditor(true);
  };

  const handleImageProcessing = () => {
    // const editor = editorRef.current.getImage();
    //     const processedImageURL = editor.toDataURL();
    const canvas = editorRef.current.getImageScaledToCanvas();
    const processedImageURL = canvas.toDataURL('image/jpeg', 1);
    setProcessedImage(processedImageURL);
    onChange(processedImageURL);
    setShowEditor(false);
  };

  const handleEditClick = () => {
    setShowEditor(true);
    setProcessedImage(null);
  };

  const handleScaleChange = (event) => {
    const newScale = parseFloat(event.target.value);
    setScale(newScale);
  };

  return (
    <>
      <label
        htmlFor="icon-upload"
        className="block text-sm font-medium text-gray-700"
      >
        Icon
      </label>
      <input
        type="file"
        id="icon-upload"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {pickedFile && showEditor && (
        <div className="mt-4">
          <div className="mt-4">
            <label
              htmlFor="scale"
              className="block text-sm font-medium text-gray-700"
            >
              Scale
            </label>
            <input
              type="range"
              id="scale"
              min="0.1"
              max="2"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
            />
            <AvatarEditor
              ref={editorRef}
              image={pickedFile}
              width={250}
              height={250}
              border={50}
              borderRadius={250}
              color={[255, 255, 255, 0.6]}
              scale={scale}
            />
            <button
              className="px-3 py-1 mt-2 text-white bg-blue-500 rounded flex items-center"
              onClick={handleImageProcessing}
            >
              <span className="mr-2">
                <FiCheckSquare />
              </span>
              <span>Process Image</span>
            </button>
          </div>
        </div>
      )}

      {processedImage && (
        <div className="mt-4">
          <label
            htmlFor="modified-image"
            className="block text-sm font-medium text-gray-700"
          >
            Modified Image
          </label>
          <img src={processedImage} alt="Modified Avatar" />
          <button
            className="px-3 py-1 mt-2 text-white bg-blue-500 rounded flex items-center"
            onClick={handleEditClick}
          >
            <span className="mr-2">
              <FiEdit />
            </span>
            <span>Edit</span>
          </button>
        </div>
      )}
    </>
  );
}

export default AvatarChooser;
