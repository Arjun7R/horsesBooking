import React, { useEffect, useState } from "react";
import horses from "../HorsesList";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url, emailRegex, nameRegex, phoneRegex } from "../../utils/Utils";


function BookingForm({}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({
    selectedHorse: {
      value: "",
      errorMessage: "",
    },
    date: {
      value: "",
      errorMessage: "",
    },
    name: {
      value: "",
      errorMessage: "",
    },
    email: {
      value: "",
      errorMessage: "",
    },
    phone: {
      value: "",
      errorMessage: "",
    },
  });

  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [minDate, setMinDate] = useState(getCurrentDate());

  const hanldeDateInput = (userDate) => {
    setDate(userDate);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: { value, errorMessage: "" } });
  };

  const handleTimeInput = (bookingTime) => {
    setTime(bookingTime);
    const [hours, minutes] = bookingTime.split(":");
    const newDate = new Date(date).setHours(hours, minutes);
    const finalDate = new Date(newDate).toLocaleString();
    setFormData({ ...formData, date: { value: finalDate, errorMessage: "" } });
  };

  const postBookingData = async () => {
    try {
      const response = await axios.post(url, { ...formData });
      setFormData(response);
    } catch (error) {
      console.log(`error while posting data`);
    }
  };

  const onNameBlur = () => {
    if (!nameRegex.test(formData?.name?.value)) {
      setFormData({
        ...formData,
        name: {
          value: formData?.name?.value,
          errorMessage: "please enter a valid name",
        },
      });
    }
  };

  const onEmailBlur = () => {
    if (!emailRegex.test(formData.email.value)) {
      setFormData({
        ...formData,
        email: {
          value: formData?.email?.value,
          errorMessage: "please enter a valid email",
        },
      });
    }
  };

  const onPhoneBlur = () => {
    if (!phoneRegex.test(formData?.phone?.value)) {
      setFormData({
        ...formData,
        phone: {
          value: formData?.phone?.value,
          errorMessage: "please enter a valid phone",
        },
      });
    }
  };

  const onSelectionBlur = () => {
    if (!formData?.selectedHorse?.value) {
      setFormData({
        ...formData,
        selectedHorse: {
          value: formData?.selectedHorse?.value,
          errorMessage: "please select a Horse",
        },
      });
    }
  };

  const getDeepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const setErrorMessage = (key, errorMessage) => {
    setFormData((prevFormData) => {
      return {
        ...getDeepCopy(prevFormData),
        [key]: { value: formData?.[key]?.value, errorMessage },
      };
    });
  };

  const validateForm = () => {
    let isValidForm = true;

    const keys = Object.keys(formData);

    keys.forEach((key) => {
      if (key === "selectedHorse" && formData?.[key]?.value === "Select") {
        setErrorMessage(key, "This field is required");
        isValidForm = false;
      }
      if (!formData?.[key]?.value) {
        setErrorMessage(key, "This field is required");
        isValidForm = false;
      }
    });

    return isValidForm;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && Object.values(formData).every(item => item.errorMessage == "")) {
      postBookingData()
      navigate("/");
      toast.success(
        <div className="invite">
          <div className="invite-div">
            <label htmlFor="">Horse Name : </label>
            <label style={{ color: "#283618" }} htmlFor="">
              {formData.selectedHorse.value}
            </label>
          </div>
          <p style={{color:"brown"}}>Thanks For Booking</p>
        </div>
      );
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
            className={
              formData?.selectedHorse?.errorMessage ? "error-field" : ""
            }
            onBlur={(e) => onSelectionBlur()}
          >
            {horses?.map((horse) => (
              <option key={horse.id}>{horse.name}</option>
            ))}
          </select>
          {formData?.selectedHorse?.errorMessage && (
            <p className="error">{formData?.selectedHorse?.errorMessage}</p>
          )}
        </div>
        <div className={`date-time-container ${formData?.date?.errorMessage && "error-field"}`}>
          <div className="Date-label-div">
            <label htmlFor="">Choose Date</label>
            {date !== "" && <label htmlFor="">Time</label>}
          </div>
          <div className="date-container">
            <input
              onChange={(e) => {
                hanldeDateInput(e.target.value);
              }}
              type="Date"
              value={date}
              className=""
              min={minDate}
            />
            {date !== "" && <input
              value={time}
              onChange={(e) => handleTimeInput(e.target.value)}
              type="time"
            />}
          </div>
        </div>
        {formData?.date?.errorMessage && (
          <p className="error">{formData?.date?.errorMessage}</p>
        )}
        <div className="name-container">
          <label>Name</label>
          <input
            onChange={(e) => handleChange("name", e.target.value)}
            value={formData?.name?.value}
            className={formData?.name?.errorMessage ? "error-field" : ""}
            type="text"
            placeholder="Enter name...."
            onBlur={(e) => {
              onNameBlur();
            }}
          />
          {formData?.name.errorMessage && (
            <p className="error">{formData?.name?.errorMessage}</p>
          )}
        </div>
        <div className="email-container">
          <label htmlFor="">Email</label>
          <input
            onChange={(e) => handleChange("email", e.target.value)}
            value={formData?.email?.value}
            className={formData?.email.errorMessage ? "error-field" : ""}
            type="email"
            placeholder="Enter email..."
            onBlur={(e) => {
              onEmailBlur();
            }}
          />
          {formData?.email.errorMessage && (
            <p className="error">{formData?.email?.errorMessage}</p>
          )}
        </div>
        <div className="phone-container">
          <label htmlFor="">Phone</label>
          <input
            onChange={(e) => handleChange("phone", e.target.value)}
            value={formData?.phone?.value}
            type="number"
            className={formData?.phone?.errorMessage ? "error-field" : ""}
            placeholder="Enter phone...."
            onBlur={onPhoneBlur}
          />
          {formData?.phone?.errorMessage && (
            <p className="error">{formData?.phone?.errorMessage}</p>
          )}
        </div>
        <button
          style={{
            cursor: `${"pointer"}`,
          }}
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="submitButton"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
