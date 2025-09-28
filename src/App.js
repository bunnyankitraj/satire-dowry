import React, { useState, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { calculateDowry } from "./helpers/dowryLogic";
import { formatIndianCurrency } from "./helpers/utils";
import "./App.css";

export default function App() {
  const [dowryValue, setDowryValue] = useState(0);
  const [displayDowry, setDisplayDowry] = useState(0);

  const [view, setView] = useState("Male");
  const [male, setMale] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    marital: "Single",
    home: "Yes",
    car: "Yes",
    location: "India - Rural",
  });
  const [female, setFemale] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    marital: "Single",
    home: "Yes",
    car: "Yes",
    location: "India - Rural",
  });

  const [result, setResult] = useState("");
  const [breakdown, setBreakdown] = useState([]);

  // Animate Dowry
  useEffect(() => {
    if (dowryValue > 0) {
      let start = 0;
      const increment = dowryValue / 50; // 50 steps
      const interval = setInterval(() => {
        start += increment;
        if (start >= dowryValue) {
          start = dowryValue;
          clearInterval(interval);
        }
        setDisplayDowry(Math.floor(start));
      }, 20);
    } else {
      setDisplayDowry(0);
    }
  }, [dowryValue]);

  // Handle form input
  const handleChange = (e, gender) => {
    const { name, value } = e.target;

    let updatedValue = value;
    // Only allow numbers for salary and age
    if (name === "salary" || name === "age") {
      updatedValue = value.replace(/\D/g, "");
    }

    if (gender === "male") setMale({ ...male, [name]: updatedValue });
    else setFemale({ ...female, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultObj = calculateDowry({ male, female, view });
    setResult(resultObj.message);
    setBreakdown(resultObj.breakdownData);
    setDowryValue(resultObj.dowryAmount);
  };

  const renderForm = (gender) => {
    const data = gender === "male" ? male : female;
    return (
      <div className="form-box">
        <h2>{gender === "male" ? "👨 Male Info" : "👩 Female Info"}</h2>

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={(e) => handleChange(e, gender)}
          min="18"
          max="70"
          placeholder="Enter Age"
          className="age-input"
        />

        <label>Profession</label>
        <select
          name="profession"
          onChange={(e) => handleChange(e, gender)}
          value={data.profession}
        >
          <option value="">Select</option>
          <option>Engineer</option>
          <option>Doctor</option>
          <option>Teacher</option>
          <option>IT</option>
          <option>Artist</option>
          <option>Business</option>
          <option>Government Employee</option>
          <option>Unemployed Philosopher</option>
          <option>Student</option>
        </select>

        <label>Monthly Salary (₹)</label>
        <input
          type="number"
          name="salary"
          value={data.salary}
          onChange={(e) => handleChange(e, gender)}
          placeholder="Enter salary in ₹"
          className="salary-input"
        />
        {data.salary && (
          <small>Formatted: ₹{formatIndianCurrency(data.salary)}</small>
        )}

        <label>Education</label>
        <select
          name="education"
          onChange={(e) => handleChange(e, gender)}
          value={data.education}
        >
          <option value="">Select</option>
          <option>High School</option>
          <option>Bachelor's</option>
          <option>Master's</option>
          <option>PhD</option>
          <option>School of Life</option>
        </select>

        <label>Marital Status</label>
        <select
          name="marital"
          onChange={(e) => handleChange(e, gender)}
          value={data.marital}
        >
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
        </select>

        <label>Home Ownership</label>
        <select
          name="home"
          onChange={(e) => handleChange(e, gender)}
          value={data.home}
        >
          <option>Yes</option>
          <option>No</option>
        </select>

        <label>Car Ownership</label>
        <select
          name="car"
          onChange={(e) => handleChange(e, gender)}
          value={data.car}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    );
  };

  return (
    <div className="container">
      <Header />

      {/* View Selection */}
      <div className="view-selection">
        <label>
          <input
            type="radio"
            name="view"
            value="Couple"
            checked={view === "Couple"}
            onChange={(e) => setView(e.target.value)}
          />{" "}
          Couple
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="Male"
            checked={view === "Male"}
            onChange={(e) => setView(e.target.value)}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="Female"
            checked={view === "Female"}
            onChange={(e) => setView(e.target.value)}
          />{" "}
          Female
        </label>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        {(view === "Couple" || view === "Male") && renderForm("male")}
        {(view === "Couple" || view === "Female") && renderForm("female")}
      </form>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Calculate 🔮
      </button>

      {
        <div className="dowry-bar-container">
          <p>Estimated Dowry: ₹{formatIndianCurrency(displayDowry)}</p>
          <div className="dowry-bar-bg">
            <div
              className="dowry-bar-fill"
              style={{
                width: `${Math.min((displayDowry / 500000) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      }

      {result && (
        <div className="result">
          <h3>{result}</h3>
          <table>
            <thead>
              <tr>
                <th>Side</th>
                <th>Contributions</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((row, i) => (
                <tr key={i}>
                  <td>{row.side}</td>
                  <td>{row.contributions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Footer />
    </div>
  );
}
