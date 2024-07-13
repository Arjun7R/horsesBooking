import React, { useEffect, useState } from "react";
import horses from "../../components/HorsesList";
import "./style.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function LandigPage({isBooking}) {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    if (!isBooking) {
      if (currentImage < 5) {
        setTimeout(() => {
          setCurrentImage(currentImage + 1);
        }, 3000);
      } else {
        setTimeout(() => {
          setCurrentImage(1);
        }, 3000);
      }
    }
  }, [currentImage, isBooking]);
  return (
    <div className="landing-page-container">
      <ToastContainer style={{display:"flex", alignItems:"center"}} />
      <div className="images-container">
        <img src={`./public/images/background-${currentImage}.jpg`} alt="" />
        <div className="forground-div">
          <div className="quote-box">
            <p className="quote">
              There is NO Greater pleasure in the world Than Horse Riding
              <span className=""> Good Horse</span>..
            </p>
            <Link to={"/bookingForm"}>
            <button
              className="booking-button"
            >
              Book Now
            </button>
            </Link>
          </div>
          <div className="">
            <div className="horses-showcase">
              <div className="showcase-heading">
                <h2>Our Avilable Horses</h2>
              </div>
              <div className="card-container">
                {horses?.map((horse, index) => (
                  <div className="image-div" key={horse.id}>
                    <img src={horse.image} alt="this is horse image" />
                    <p>{horse.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandigPage;
