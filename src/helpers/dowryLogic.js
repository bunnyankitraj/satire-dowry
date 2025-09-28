// src/helpers/dowryLogic.js

export function calculateDowry({ male, female, view }) {
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

  return { message, breakdownData };
}
