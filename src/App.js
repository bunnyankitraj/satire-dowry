import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    age: "",
    profession: "",
    salary: "",
    education: "",
    state: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let baseValue = 0;
    let extras = [];

    // Salary logic
    if (formData.salary === "0 - 20k") baseValue = 200000;
    if (formData.salary === "20k - 50k") baseValue = 500000;
    if (formData.salary === "50k - 1L") baseValue = 1000000;
    if (formData.salary === "1L+") baseValue = 2000000;

    // Profession logic
    switch (formData.profession) {
      case "Doctor":
        baseValue += 500000;
        extras.push("Free stethoscope 🩺");
        break;
      case "Engineer":
        baseValue += 200000;
        extras.push("Lifetime supply of Maggi 🍜");
        break;
      case "Teacher":
        baseValue += 100000;
        extras.push("Respect (sometimes) 👩‍🏫");
        break;
      case "Unemployed Philosopher":
        baseValue = 0;
        extras.push("Infinite wisdom, zero dowry 🤯");
        break;
      default:
        break;
    }

    // Education logic
    if (formData.education === "Bachelor's") baseValue += 100000;
    if (formData.education === "Master's") baseValue += 200000;
    if (formData.education === "PhD") {
      baseValue += 500000;
      extras.push("Endless research papers 📄");
    }

    // State-based satire
    switch (formData.state) {
      case "Bihar":
        extras.push("Free tractor 🚜");
        break;
      case "Delhi":
        extras.push("Complimentary air purifier 🌫️");
        break;
      case "Kerala":
        extras.push("Backwater boat ride 🛶");
        break;
      case "Maharashtra":
        extras.push("Vada Pav for life 🍔");
        break;
      default:
        break;
    }

    // Final funny output
    if (baseValue === 0 && extras.length === 0) {
      setResult("Please fill all details to calculate 📋");
    } else {
      setResult(
        `Your satirical dowry value: ₹${baseValue.toLocaleString()} + ${
          extras.length > 0 ? extras.join(", ") : "no extras 🤷"
        }`
      );
    }
  };

  return (
    <div className="container">
      <h1>💍 Satire Dowry Calculator</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <label>Age</label>
        <select name="age" onChange={handleChange}>
          <option value="">Select</option>
          <option>18-22</option>
          <option>23-28</option>
          <option>29-35</option>
          <option>35+</option>
        </select>

        <label>Profession</label>
        <select name="profession" onChange={handleChange}>
          <option value="">Select</option>
          <option>Engineer</option>
          <option>Doctor</option>
          <option>Teacher</option>
          <option>Artist</option>
          <option>Unemployed Philosopher</option>
        </select>

        <label>Monthly Salary</label>
        <select name="salary" onChange={handleChange}>
          <option value="">Select</option>
          <option>0 - 20k</option>
          <option>20k - 50k</option>
          <option>50k - 1L</option>
          <option>1L+</option>
        </select>

        <label>Education</label>
        <select name="education" onChange={handleChange}>
          <option value="">Select</option>
          <option>High School</option>
          <option>Bachelor's</option>
          <option>Master's</option>
          <option>PhD</option>
          <option>School of Life</option>
        </select>

        <label>Residence State</label>
        <select name="state" onChange={handleChange}>
          <option value="">Select</option>
          <option>Bihar</option>
          <option>Delhi</option>
          <option>Karnataka</option>
          <option>Maharashtra</option>
          <option>Kerala</option>
        </select>

        <button type="submit">Calculate 🔮</button>
      </form>

      {result && <div className="result">{result}</div>}
    </div>
  );
}
