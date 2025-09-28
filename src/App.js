import React, { useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
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

  const calculateDowry = () => {
    let message = "";
    let maleExtras = [];
    let femaleExtras = [];

    const maleHasSalary = male.salary && male.salary !== "None";
    const femaleHasSalary = female.salary && female.salary !== "None";

    if (view === "Couple") {
      if (maleHasSalary && femaleHasSalary)
        message = "Congrats, equality wins! No dowry needed 🏆";
      else if (maleHasSalary && !femaleHasSalary)
        message = "Traditional logic: Female’s family pays dowry 💸";
      else if (!maleHasSalary && femaleHasSalary)
        message = "Reverse logic: Male’s family pays dowry 💸 (tables turned)";
      else message = "Both are broke, only blessings will do 🙏";
    } else if (view === "Male") {
      message = maleHasSalary ? "Male has income 💰" : "Male has no income 😅";
    } else if (view === "Female") {
      message = femaleHasSalary
        ? "Female has income 💰"
        : "Female has no income 😅";
    }

    // Satire extras for male
    if (male.profession === "Engineer") maleExtras.push("Free Jio hotspot 📶");
    if (male.profession === "Doctor") maleExtras.push("Free checkups 🩺");
    if (male.education === "PhD") maleExtras.push("1000-page thesis 📄");
    if (male.state === "Delhi") maleExtras.push("Pollution mask 😷");
    if (male.home === "Owned") maleExtras.push("2BHK flat bragging rights 🏠");
    if (male.car === "Yes") maleExtras.push("Swift Dzire 🚗");
    if (male.location === "Outside India") maleExtras.push("NRI tag 🌍");

    // Satire extras for female
    if (female.profession === "Doctor") femaleExtras.push("Health checkups 🩺");
    if (female.profession === "Teacher")
      femaleExtras.push("Homework checking 📚");
    if (female.education === "Master's") femaleExtras.push("Extra degree 🎓");
    if (female.state === "Kerala") femaleExtras.push("Houseboat ride 🛶");
    if (female.home === "Owned") femaleExtras.push("Stability bonus 🏡");
    if (female.car === "Yes") femaleExtras.push("Scooty pep+ 🛵");
    if (female.location === "Outside India")
      femaleExtras.push("Foreign diploma 🎓");

    const breakdownData = [];
    if (view !== "Female")
      breakdownData.push({
        side: "Male",
        contributions: maleExtras.length ? maleExtras.join(", ") : "None",
      });
    if (view !== "Male")
      breakdownData.push({
        side: "Female",
        contributions: femaleExtras.length ? femaleExtras.join(", ") : "None",
      });

    setBreakdown(breakdownData);
    setResult(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateDowry();
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
      <div className="header-container">
        <Header />
      </div>

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

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
