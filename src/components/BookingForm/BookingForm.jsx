import React, { useCallback, useEffect, useState } from "react";
import horses from "../HorsesList";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const url = "https://65fd057c9fc4425c6530ff71.mockapi.io/booking";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[6-9]\d{9}$/;
const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{0,49}$/;

function BookingForm({}) {
  const [date, setDate] = useState("");
  const [getData, setGetData] = useState({});
  const [formData, setFormData] = useState({
    selectedHorse: "",
    date: "",
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const hanldeDateInput = (userDate) => {
    setDate(userDate);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleTimeInput = (bookingTime) => {
    const [hours, minutes] = bookingTime.split(":");
    const newDate = new Date(date).setHours(hours, minutes);
    const finalDate = new Date(newDate).toLocaleString();
    setFormData({ ...formData, date: finalDate });
  };

  const postBookingData = async () => {
    try {
      const result = await axios.post(url, { ...formData });
      console.log(result.data);
    } catch (error) {
      console.log(`error while posting data`);
    }
  };

  const isButtonEnable = Object.values(formData).every((value) => value !== "");

  const getDetails = async() => {
    try {
      const response = (await axios.get("https://65fd057c9fc4425c6530ff71.mockapi.io/booking")).data;
      setGetData(response[response.length - 1]);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetails();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isButtonEnable) {
      postBookingData();
      toast.success(<div className="invite">
        <div className="invite-div">
          <label htmlFor="">Horse Name : </label>
          <label style={{color:"#283618"}} htmlFor="">{getData.selectedHorse}</label>
        </div>
        <p>Thanks For Booking 🙂</p>
      </div>);
      navigate("/");
    } else {
      toast.error("Form Not Submitted !");
    }
  };


  return (
    <div className="form-container">
      <form className="form">
        <div className="crossIcon-div">
          <Link to={"/"}>
            <RxCross2 size={23} cursor={"pointer"} />
          </Link>
        </div>
        <div>
          <select
            onClick={(e) => handleChange("selectedHorse", e.target.value)}
          >
            {horses?.map((horse) => (
              <option key={horse.id}>{horse.name}</option>
            ))}
          </select>
        </div>
        <div className="date-time-container">
          <div className="Date-label-div">
            <label htmlFor="">Choose Date</label>
            <label htmlFor="">Time</label>
          </div>
          <div className="date-container">
            <input
              onChange={(e) => hanldeDateInput(e.target.value)}
              type="Date"
              className=""
            />
            <input
              onChange={(e) => handleTimeInput(e.target.value)}
              type="time"
            />
          </div>
        </div>
        <div className="name-container">
          <label>Name</label>
          <input
            onChange={(e) =>
              handleChange(
                "name",
                nameRegex.test(e.target.value) ? e.target.value : ""
              )
            }
            type="text"
            placeholder="Enter name...."
          />
        </div>
        <div className="email-container">
          <label htmlFor="">Email</label>
          <input
            // style={{ border: `${isEmailValid && "1px solid green"}` }}
            onChange={(e) =>
              handleChange(
                "email",
                emailRegex.test(e.target.value) ? e.target.value : ""
              )
            }
            type="email"
            placeholder="Enter email..."
          />
        </div>
        <div className="phone-container">
          <label htmlFor="">Phone</label>
          <input
            onChange={(e) =>
              handleChange(
                "phone",
                phoneRegex.test(e.target.value) ? e.target.value : ""
              )
            }
            type="number"
            placeholder="Enter phone...."
          />
        </div>
        <button
          disabled={!isButtonEnable}
          style={{
            opacity: `${isButtonEnable ? "1" : "0.4"}`,
            cursor: `${isButtonEnable ? "pointer" : "not-allowed"}`,
          }}
          onClick={(e) => {handleSubmit(e)}}
          className="submitButton"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
