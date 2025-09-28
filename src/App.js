import React, { useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { calculateDowry } from "./helpers/dowryLogic";
import "./App.css";

export default function App() {
  const [view, setView] = useState("Couple");
  const [male, setMale] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    state: "",
    marital: "",
    home: "",
    car: "",
    location: "",
  });
  const [female, setFemale] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    state: "",
    marital: "",
    home: "",
    car: "",
    location: "",
  });

  const [result, setResult] = useState("");
  const [breakdown, setBreakdown] = useState([]);

  const handleChange = (e, gender) => {
    if (gender === "male")
      setMale({ ...male, [e.target.name]: e.target.value });
    else setFemale({ ...female, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultObj = calculateDowry({ male, female, view });
    setResult(resultObj.message);
    setBreakdown(resultObj.breakdownData);
  };

  const renderForm = (gender) => {
    const data = gender === "male" ? male : female;
    return (
      <div className="form-box">
        <h2>{gender === "male" ? "👨 Male Info" : "👩 Female Info"}</h2>
        <label>Age</label>
        <select
          name="age"
          onChange={(e) => handleChange(e, gender)}
          value={data.age}
        >
          <option value="">Select</option>
          <option>18-22</option>
          <option>23-28</option>
          <option>29-35</option>
          <option>35+</option>
        </select>

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
          <option>Artist</option>
          <option>Unemployed Philosopher</option>
        </select>

        <label>Monthly Salary</label>
        <select
          name="salary"
          onChange={(e) => handleChange(e, gender)}
          value={data.salary}
        >
          <option value="">Select</option>
          <option>None</option>
          <option>0 - 20k</option>
          <option>20k - 50k</option>
          <option>50k - 1L</option>
          <option>1L+</option>
        </select>

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

        <label>Residence State</label>
        <select
          name="state"
          onChange={(e) => handleChange(e, gender)}
          value={data.state}
        >
          <option value="">Select</option>
          <option>Bihar</option>
          <option>Delhi</option>
          <option>Karnataka</option>
          <option>Maharashtra</option>
          <option>Kerala</option>
        </select>

        <label>Marital Status</label>
        <select
          name="marital"
          onChange={(e) => handleChange(e, gender)}
          value={data.marital}
        >
          <option value="">Select</option>
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
          <option value="">Select</option>
          <option>Owned</option>
          <option>Rented</option>
        </select>

        <label>Car Ownership</label>
        <select
          name="car"
          onChange={(e) => handleChange(e, gender)}
          value={data.car}
        >
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label>Location</label>
        <select
          name="location"
          onChange={(e) => handleChange(e, gender)}
          value={data.location}
        >
          <option value="">Select</option>
          <option>India - Urban</option>
          <option>India - Rural</option>
          <option>Outside India</option>
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
