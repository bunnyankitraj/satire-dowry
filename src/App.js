import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [male, setMale] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    state: "",
  });

  const [female, setFemale] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    state: "",
  });

  const [result, setResult] = useState("");
  const [breakdown, setBreakdown] = useState([]);

  const handleChange = (e, gender) => {
    if (gender === "male") {
      setMale({ ...male, [e.target.name]: e.target.value });
    } else {
      setFemale({ ...female, [e.target.name]: e.target.value });
    }
  };

  const calculateDowry = () => {
    let message = "";
    let maleExtras = [];
    let femaleExtras = [];

    const maleHasSalary = male.salary && male.salary !== "None";
    const femaleHasSalary = female.salary && female.salary !== "None";

    if (maleHasSalary && femaleHasSalary) {
      message = "Congrats, equality wins! No dowry needed 🏆";
    } else if (maleHasSalary && !femaleHasSalary) {
      message = "Traditional logic: Female’s family pays dowry 💸";
    } else if (!maleHasSalary && femaleHasSalary) {
      message = "Reverse logic: Male’s family pays dowry 💸 (tables turned)";
    } else {
      message = "Both are broke, only blessings will do 🙏";
    }

    // Satire extras
    if (male.profession === "Engineer") maleExtras.push("Free Jio hotspot 📶");
    if (male.profession === "Doctor") maleExtras.push("Free checkups 🩺");
    if (female.profession === "Doctor") femaleExtras.push("Health checkups 🩺");
    if (female.profession === "Teacher") femaleExtras.push("Homework checking 📚");

    if (male.education === "PhD") maleExtras.push("1000-page thesis 📄");
    if (female.education === "Master's") femaleExtras.push("Extra degree 🎓");

    if (male.state === "Delhi") maleExtras.push("Pollution mask 😷");
    if (female.state === "Kerala") femaleExtras.push("Houseboat ride 🛶");

    setBreakdown([
      { side: "Male", contributions: maleExtras.length ? maleExtras.join(", ") : "None" },
      { side: "Female", contributions: femaleExtras.length ? femaleExtras.join(", ") : "None" },
    ]);

    setResult(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateDowry();
  };

  return (
    <div className="container">
      <h1>💍 Satire Dowry Calculator</h1>

      <form onSubmit={handleSubmit} className="form-grid">
        {/* Male */}
        <div className="form-box">
          <h2>👨 Male Info</h2>
          <label>Age</label>
          <select name="age" onChange={(e) => handleChange(e, "male")}>
            <option value="">Select</option>
            <option>18-22</option>
            <option>23-28</option>
            <option>29-35</option>
            <option>35+</option>
          </select>

          <label>Profession</label>
          <select name="profession" onChange={(e) => handleChange(e, "male")}>
            <option value="">Select</option>
            <option>Engineer</option>
            <option>Doctor</option>
            <option>Teacher</option>
            <option>Artist</option>
            <option>Unemployed Philosopher</option>
          </select>

          <label>Monthly Salary</label>
          <select name="salary" onChange={(e) => handleChange(e, "male")}>
            <option value="">Select</option>
            <option>None</option>
            <option>0 - 20k</option>
            <option>20k - 50k</option>
            <option>50k - 1L</option>
            <option>1L+</option>
          </select>

          <label>Education</label>
          <select name="education" onChange={(e) => handleChange(e, "male")}>
            <option value="">Select</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
            <option>School of Life</option>
          </select>

          <label>Residence State</label>
          <select name="state" onChange={(e) => handleChange(e, "male")}>
            <option value="">Select</option>
            <option>Bihar</option>
            <option>Delhi</option>
            <option>Karnataka</option>
            <option>Maharashtra</option>
            <option>Kerala</option>
          </select>
        </div>

        {/* Female */}
        <div className="form-box">
          <h2>👩 Female Info</h2>
          <label>Age</label>
          <select name="age" onChange={(e) => handleChange(e, "female")}>
            <option value="">Select</option>
            <option>18-22</option>
            <option>23-28</option>
            <option>29-35</option>
            <option>35+</option>
          </select>

          <label>Profession</label>
          <select name="profession" onChange={(e) => handleChange(e, "female")}>
            <option value="">Select</option>
            <option>Engineer</option>
            <option>Doctor</option>
            <option>Teacher</option>
            <option>Artist</option>
            <option>Unemployed Philosopher</option>
          </select>

          <label>Monthly Salary</label>
          <select name="salary" onChange={(e) => handleChange(e, "female")}>
            <option value="">Select</option>
            <option>None</option>
            <option>0 - 20k</option>
            <option>20k - 50k</option>
            <option>50k - 1L</option>
            <option>1L+</option>
          </select>

          <label>Education</label>
          <select name="education" onChange={(e) => handleChange(e, "female")}>
            <option value="">Select</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
            <option>School of Life</option>
          </select>

          <label>Residence State</label>
          <select name="state" onChange={(e) => handleChange(e, "female")}>
            <option value="">Select</option>
            <option>Bihar</option>
            <option>Delhi</option>
            <option>Karnataka</option>
            <option>Maharashtra</option>
            <option>Kerala</option>
          </select>
        </div>
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
    </div>
  );
}
