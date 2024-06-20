import React, { useEffect } from "react";

export const Home1 = () => {
  useEffect(() => {}, []);

  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <img
        src={require("./../../../assets/Image/2.jpg")}
        className="img-fluid w-100 h-100"
        alt="..."
        style={{
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div className="text-center text-white mt-3" style={{ zIndex: 1 }}>
        <h1 className="display-4">Recipe for everyone.</h1>
        <p className="mb-4">
          Welcome to our recipe paradise, where there are a variety of delicious<br />
          recipes, from home-cooked meals to exquisite dishes. Whether you are a<br />
          novice or a chef, we have prepared detailed steps and thoughtful tips<br />
          for you. Discover more surprising recipes and start your food journey!
        </p>
        <a className="btn btn-success btn-lg" href="#">
          Get Recipe
        </a>
      </div>
    </div>
  );
};
