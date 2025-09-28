// Inside dowryLogic.js
import { formatIndianCurrency } from "./utils";

export function calculateDowry({ male, female, view }) {
  let message = "";
  let maleExtras = [];
  let femaleExtras = [];
  let dowryAmount = 0; // numeric satire dowry

  // Convert salary string to number (if using ranges)
  const parseSalary = (salaryStr) => {
    if (!salaryStr || salaryStr === "None") return 0;
    if (salaryStr.includes("0 - 20k")) return 20000;
    if (salaryStr.includes("20k - 50k")) return 35000;
    if (salaryStr.includes("50k - 1L")) return 75000;
    if (salaryStr.includes("1L - 2L")) return 150000;
    if (salaryStr.includes("2L - 5L")) return 350000;
    if (salaryStr.includes("5L+")) return 500000;
    // If user enters exact number, parse as integer
    const n = parseInt(salaryStr.replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  };

  const maleSalary = parseSalary(male.salary);
  const femaleSalary = parseSalary(female.salary);

  const maleHasSalary = maleSalary > 0;
  const femaleHasSalary = femaleSalary > 0;

  // Dowry logic
  if (view === "Couple") {
    if (maleHasSalary && femaleHasSalary) {
      message = "Congrats, both have money";
    } else if (maleHasSalary && !femaleHasSalary) {
      message = "Traditional logic: Female’s family pays dowry 💸";
      dowryAmount = 50000;
    } else if (!maleHasSalary && femaleHasSalary) {
      message = "Reverse logic: Male’s family pays dowry 💸 (tables turned)";
      dowryAmount = 50000;
    } else {
      message = "Both are broke, only blessings will do 🙏";
    }

    // Increase dowry by 50× salary difference if male > female
    if (maleSalary > femaleSalary) {
      const diff = maleSalary - femaleSalary;
      dowryAmount += diff * 50;
    }

    // Append formatted dowry to message for display
    if (dowryAmount > 0) {
      message += ` | Estimated Dowry: ₹${formatIndianCurrency(dowryAmount)}`;
    }
  } else if (view === "Male") {
    message = maleHasSalary ? `Male has income 💰` : "Male has no income 😅";
  } else if (view === "Female") {
    message = femaleHasSalary
      ? `Female has income 💰`
      : "Female has no income 😅";
  }

  // Satire extras
  if (male.profession === "Engineer") maleExtras.push("Free Jio hotspot 📶");
  if (male.profession === "Doctor") maleExtras.push("Free checkups 🩺");
  if (male.profession === "IT") maleExtras.push("WiFi expert skills 💻");
  if (male.education === "PhD") maleExtras.push("1000-page thesis 📄");
  if (male.home === "Yes") maleExtras.push("2BHK flat bragging rights 🏠");
  if (male.car === "Yes") maleExtras.push("Swift Dzire 🚗");
  if (male.location === "Outside India") maleExtras.push("NRI tag 🌍");

  if (female.profession === "Doctor") femaleExtras.push("Health checkups 🩺");
  if (female.profession === "Teacher")
    femaleExtras.push("Homework checking 📚");
  if (female.profession === "IT") femaleExtras.push("Tech support skills 💻");
  if (female.education === "Master's") femaleExtras.push("Extra degree 🎓");
  if (female.home === "Yes") femaleExtras.push("Stability bonus 🏡");
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

  return { message, breakdownData, dowryAmount };
}
