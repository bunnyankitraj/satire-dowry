export function calculateDowry({ male, female, view }) {
  let message = "";
  let maleExtras = [];
  let femaleExtras = [];
  let dowryAmount = 0;

  const parseSalary = (salaryStr) => {
    if (!salaryStr) return 0;
    const n = parseInt(salaryStr.toString().replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  };

  const maleSalary = parseSalary(male.salary);
  const femaleSalary = parseSalary(female.salary);

  const maleHasSalary = maleSalary > 0;
  const femaleHasSalary = femaleSalary > 0;

  if (view === "Couple") {
    if (maleHasSalary && femaleHasSalary) {
      message = "Congrats, equality wins! No dowry needed 🏆";
    } else if (maleHasSalary && !femaleHasSalary) {
      message = "Traditional logic: Female’s family pays dowry 💸";
      dowryAmount = 500000;
    } else if (!maleHasSalary && femaleHasSalary) {
      message = "Reverse logic: Male’s family pays dowry 💸 (tables turned)";
      dowryAmount = 500000;
    } else {
      message = "Both are broke, only blessings will do 🙏";
    }

    if (male.profession === "Government Employee") {
      dowryAmount += 2000000; // Add 5 lakh
    }
    if (femaleSalary === 0) {
      dowryAmount += maleSalary * 10;
    } else if (maleSalary > femaleSalary) {
      const diff = maleSalary - femaleSalary;
      dowryAmount += diff * 5;
    }
  } else if (view === "Male") {
    message = maleHasSalary ? `Male has income 💰` : "Male has no income 😅";
    if (maleHasSalary) dowryAmount = maleSalary * 7; // new logic
  } else if (view === "Female") {
    message = femaleHasSalary
      ? `Female has income 💰`
      : "Female has no income 😅";
    if (femaleHasSalary) dowryAmount = femaleSalary * 5; // new logic
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
