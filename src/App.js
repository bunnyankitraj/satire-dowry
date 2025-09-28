import React, { useState, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { calculateDowry } from "./helpers/dowryLogic";
import { formatIndianCurrency } from "./helpers/utils";
import "./App.css";

export default function App() {
  const [dowryValue, setDowryValue] = useState(0);
  const [displayDowry, setDisplayDowry] = useState(0);

  // Parent states
  const [maleParent, setMaleParent] = useState({ occupation: "", salary: "" });
  const [femaleParent, setFemaleParent] = useState({
    occupation: "",
    salary: "",
  });
  const [showMaleParent, setShowMaleParent] = useState(false);
  const [showFemaleParent, setShowFemaleParent] = useState(false);

  const handleParentChange = (e, gender) => {
    const { name, value } = e.target;
    const updatedValue = name === "salary" ? value.replace(/\D/g, "") : value;

    if (gender === "male")
      setMaleParent({ ...maleParent, [name]: updatedValue });
    else setFemaleParent({ ...femaleParent, [name]: updatedValue });
  };

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

  // Handle main form input
  const handleChange = (e, gender) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "salary" || name === "age" ? value.replace(/\D/g, "") : value;

    if (gender === "male") setMale({ ...male, [name]: updatedValue });
    else setFemale({ ...female, [name]: updatedValue });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultObj = calculateDowry({
      male,
      female,
      maleParent,
      femaleParent,
      view,
    });
    setResult(resultObj.message);
    setBreakdown(resultObj.breakdownData);
    setDowryValue(resultObj.dowryAmount);
  };

  // Render main + parent forms
  const renderForm = (gender) => {
    const data = gender === "male" ? male : female;
    const parentData = gender === "male" ? maleParent : femaleParent;
    const showParent = gender === "male" ? showMaleParent : showFemaleParent;
    const toggleParent =
      gender === "male" ? setShowMaleParent : setShowFemaleParent;
    // const setParent = gender === "male" ? setMaleParent : setFemaleParent;

    return (
      <div className="form-box">
        <h2>{gender === "male" ? "👨 Male Info" : "👩 Female Info"}</h2>

        {/* Existing fields */}
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={(e) => handleChange(e, gender)}
          min="18"
          max="70"
          placeholder="Enter Age"
        />

        <label>Profession</label>
        <select
          name="profession"
          value={data.profession}
          onChange={(e) => handleChange(e, gender)}
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
        />
        {data.salary && (
          <small>Formatted: ₹{formatIndianCurrency(data.salary)}</small>
        )}

        <label>Education</label>
        <select
          name="education"
          value={data.education}
          onChange={(e) => handleChange(e, gender)}
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
          value={data.marital}
          onChange={(e) => handleChange(e, gender)}
        >
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
        </select>

        <label>Home Ownership</label>
        <select
          name="home"
          value={data.home}
          onChange={(e) => handleChange(e, gender)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>

        <label>Car Ownership</label>
        <select
          name="car"
          value={data.car}
          onChange={(e) => handleChange(e, gender)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>

        {/* Toggle Parent Info */}
        <button
          type="button"
          className="toggle-btn"
          onClick={() => toggleParent(!showParent)}
        >
          {showParent ? "Hide Parents Info" : "Add Parents Info"}
        </button>

        {showParent && (
          <div className="parent-info">
            <h3>Parents Info</h3>

            <label>Parent Occupation</label>
            <select
              name="occupation"
              value={parentData.occupation}
              onChange={(e) => handleParentChange(e, gender)}
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

            <label>Parent Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={parentData.salary}
              onChange={(e) => handleParentChange(e, gender)}
              placeholder="Enter Parent Salary"
            />
            {parentData.salary && (
              <small>
                Formatted: ₹{formatIndianCurrency(parentData.salary)}
              </small>
            )}
          </div>
        )}
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
          />
          Couple
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="Male"
            checked={view === "Male"}
            onChange={(e) => setView(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="Female"
            checked={view === "Female"}
            onChange={(e) => setView(e.target.value)}
          />
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
