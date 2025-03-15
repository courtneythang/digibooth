import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Camera = () => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const photoList = [];

  const startTime = () => {
    setIsCapturing(true);
    let time = 5;
    setCountdown(time);

    const interval = setInterval(() => {
      time -= 1;
      setCountdown(time);
      if (time === 0) {
        clearInterval(interval);
        capturePhoto();
      }
    }, 1000);
  };

  const capturePhoto = () => {
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

      const flippedImg = canvas.toDataURL("image/png");
      setPhoto(flippedImg);
    };
    setIsCapturing(false);
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = photo;
    link.download = "photobooth.png";
    link.click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {!photo ? (
        <>
          {countdown > 0 && <h2>{countdown}</h2>}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: "user",
            }}
            style={{ transform: "scaleX(-1)" }}
          />
          <button
            onClick={startTime}
            style={{ marginTop: "10px" }}
            disabled={isCapturing}
          >
            {isCapturing ? "Capturing..." : "Capture Photo"}
          </button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured image" width="100%" />
          <button onClick={() => setPhoto(null)} style={{ marginTop: "10px" }}>
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
