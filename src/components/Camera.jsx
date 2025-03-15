import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Camera = () => {
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [photoStrip, setPhotoStrip] = useState(null);
  const totalPhotos = 4;

  const startCapturing = () => {
    setIsCapturing(true);
    setPhotos([]);
    captureNextPhoto(0, []);
  };

  const captureNextPhoto = (photoIndex, capturedPhotos) => {
    if (photoIndex >= totalPhotos) {
      setIsCapturing(false);
      setPhotos(capturedPhotos);
      generatePhotoStrip(capturedPhotos);
      return;
    }

    setCountdown(3);
    let timeLeft = 3;

    const interval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft === 0) {
        clearInterval(interval);
        capturePhoto(photoIndex, capturedPhotos);
      }
    }, 1000);
  };

  const capturePhoto = (photoIndex, capturedPhotos) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.translate(img.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const flippedImg = canvas.toDataURL("image/jpeg");

        const newPhotos = [...capturedPhotos, flippedImg];
        captureNextPhoto(photoIndex + 1, newPhotos);
      };
    }
  };

  const generatePhotoStrip = (photos) => {
    const stripWidth = 300;
    const stripHeight = 600;
    const photoHeight = stripHeight / totalPhotos;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = stripWidth;
    canvas.height = stripHeight;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, stripWidth, stripHeight);

    let loadedImages = 0;

    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        ctx.drawImage(img, 0, index * photoHeight, stripWidth, photoHeight);
        loadedImages++;

        if (loadedImages === photos.length) {
          setPhotoStrip(canvas.toDataURL("image/jpeg"));
        }
      };
    });
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = photoStrip;
    link.download = "photobooth.jpeg";
    link.click();
  };

  const resetPhotos = () => {
    setPhotos([]);
    setPhotoStrip(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!photoStrip ? (
        <>
          {countdown > 0 && <h2>{countdown}</h2>}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              width: 1920,
              height: 1080,
              facingMode: "user",
            }}
            mirrored={true}
          />
          <button
            onClick={startCapturing}
            style={{ marginTop: "10px" }}
            disabled={isCapturing}
          >
            {isCapturing ? "Capturing..." : "Capture Photo"}
          </button>
        </>
      ) : (
        <>
          <img src={photoStrip} alt="Captured image" width="100%" />
          <button onClick={resetPhotos} style={{ marginTop: "10px" }}>
            Retake Photo
          </button>
          <button onClick={download} style={{ marginTop: "10px" }}>
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;
