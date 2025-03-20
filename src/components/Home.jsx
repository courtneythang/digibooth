import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [openPhotobooth, setOpenPhotobooth] = useState(false);

  if (openPhotobooth) {
    return <Navigate to="/digibooth/camera" />;
  }

  return (
    <div className="delicious-handrawn-regular" style={{ fontSize: "3rem" }}>
      <div>
        <h1>DIGIBOOTH</h1>
        <h3>currently under development and enhancements</h3>
        <br></br>
      </div>
      <div>
        <button
          onClick={() => {
            setOpenPhotobooth(true);
          }}
        >
          go to camera
        </button>
      </div>
    </div>
  );
};

export default Home;
