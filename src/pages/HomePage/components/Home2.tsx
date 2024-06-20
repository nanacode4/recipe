import React, { useEffect } from "react";

export const Home2 = () => {
  useEffect(() => {}, []);

  return (
    <div className="container mt-5">
        <div className="row g-0 mb-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left">
              <img src={require("./../../../assets/Image/3.png")} className="img-fluid" alt="Reading" />
            </div>
          </div>
          <div className="col-4 col-md-5 container d-flex justify-content-center align-items-center">
            <div className="ml-2 text-center">
              <h1>What have you been cooking?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-5 col-md-5 container d-flex justify-content-center align-items-center">
            <div className="ml-2 text-center">
              <h1>Our collection is  changing!</h1>
              <p className="lead">
                Try to cook in daily.  We are diligent about our
                recipe selection always going to be our top
                priority.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right">
              <img src={require("./../../../assets/Image/1.png")} className="img-fluid" alt="Library" />
            </div>
          </div>
        </div>
      </div>
    
    
  );
};
