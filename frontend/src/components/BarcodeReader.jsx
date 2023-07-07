import React, { useRef, useEffect, useState } from 'react';
import Quagga from 'quagga';
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const BarcodeScanner = ({ onBarcodeDetected }) => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    const initQuagga = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: 'environment' },
          },
        });
        videoRef.current.srcObject = stream;

        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: videoRef.current,
            },
            locate: true,
            locator: {
              patchSize: 'large',
              halfSample: true,
            },
            decoder: {
              readers: [
                'code_128_reader',
                'ean_reader',
                'code_39_reader',
                'code_93_reader',
                'codabar_reader',
              ],
            },
          },
          function (err) {
            if (err) {
              console.error('Error initializing Quagga:', err);
              return;
            }
            Quagga.start();
          }
        );

        Quagga.onDetected(handleBarcode);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initQuagga();

    return () => {
      Quagga.stop();
    };
  }, []);

  const handleBarcode = (result) => {
    const scannedBarcode = result.codeResult.code;
    const barcodeType = result.codeResult.format;
    setBarcode(scannedBarcode);
    if (onBarcodeDetected) {
      onBarcodeDetected(scannedBarcode, barcodeType);
    }
  };

  const updateVideoHeight = () => {
    const containerHeight = window.innerHeight / 4; // Set the desired height, e.g., 1/4 of the screen height
    videoRef.current.style.height = `${containerHeight}px`;
  };

  useEffect(() => {
    updateVideoHeight();
    window.addEventListener('resize', updateVideoHeight);
    return () => {
      window.removeEventListener('resize', updateVideoHeight);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    const overlayContext = overlay.getContext('2d');

    const drawOverlay = () => {
      const containerHeight = video.offsetHeight;
      const containerWidth = video.offsetWidth;

      overlay.width = containerWidth;
      overlay.height = containerHeight;

      overlayContext.clearRect(0, 0, containerWidth, containerHeight);
      overlayContext.strokeStyle = 'green';
      overlayContext.lineWidth = 2;

      const rectWidth = containerWidth * 0.6; // Adjust the rectangle width as needed
      const rectHeight = containerHeight * 0.3; // Adjust the rectangle height as needed
      const rectX = (containerWidth - rectWidth) / 2;
      const rectY = (containerHeight - rectHeight) / 2;

      overlayContext.strokeRect(rectX, rectY, rectWidth, rectHeight);
    };

    drawOverlay();
  }, []);

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        position: 'relative',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <canvas
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default BarcodeScanner;
