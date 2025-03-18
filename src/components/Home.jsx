import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [openPhotobooth, setOpenPhotobooth] = useState(false);

  if (openPhotobooth) {
    return <Navigate to="/photobooth/camera" />;
  }

  return (
    <div className="delicious-handrawn-regular" style={{ fontSize: "3rem" }}>
      Home
      <br />
      <button
        onClick={() => {
          setOpenPhotobooth(true);
        }}
      >
        go to camera
      </button>
    </div>
  );
};

export default Home;
