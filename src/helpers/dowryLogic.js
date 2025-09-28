export function calculateDowry({ male, female, view }) {
  let message = "";
  let breakdownData = [];

  // ======= Utilities =======
  const parseSalary = (salaryStr) => {
    if (!salaryStr) return 0;
    const n = parseInt(salaryStr.toString().replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  };

  const formatIndianCurrency = (num) => {
    if (!num) return "0";
    return num.toLocaleString("en-IN");
  };

  const addEducationBonus = (person) => {
    let bonus = 0;
    if (person.education === "Bachelor's") bonus += 500000;
    if (person.education === "Master's") bonus += 300000;
    if (person.education === "PhD") bonus += 300000;
    return bonus;
  };

  // ======= Individual dowry calculation =======
  const calculateIndividualDowry = (person, salaryMultiplier = 5) => {
    const salary = parseSalary(person.salary);
    let dowry = salary * salaryMultiplier;

    if (person.profession === "Government Employee") dowry += 500000;
    if (person.car === "Yes") dowry += 500000;
    if (person.home === "Yes") dowry += 1000000;
    dowry += addEducationBonus(person);

    return dowry;
  };

  // ======= Satire contributions =======
  const getSatireExtras = (person, gender) => {
    const extras = [];

    if (gender === "male") {
      if (person.profession === "Engineer") extras.push("Free Jio hotspot 📶");
      if (person.profession === "Doctor") extras.push("Free checkups 🩺");
      if (person.profession === "IT") extras.push("WiFi expert skills 💻");
      if (person.education === "PhD") extras.push("1000-page thesis 📄");
      if (person.home === "Yes") extras.push("2BHK flat bragging rights 🏠");
      if (person.car === "Yes") extras.push("Swift Dzire 🚗");
      if (person.location === "Outside India") extras.push("NRI tag 🌍");
      if (person.age && person.age < 25) extras.push("Young and naive 🍼");
      if (parseSalary(person.salary) > 500000)
        extras.push("High income flex 💰");
    } else {
      if (person.profession === "Doctor") extras.push("Health checkups 🩺");
      if (person.profession === "Teacher") extras.push("Homework checking 📚");
      if (person.profession === "IT") extras.push("Tech support skills 💻");
      if (person.education === "Master's") extras.push("Extra degree 🎓");
      if (person.home === "Yes") extras.push("Stability bonus 🏡");
      if (person.car === "Yes") extras.push("Scooty pep+ 🛵");
      if (person.location === "Outside India")
        extras.push("Foreign diploma 🎓");
      if (person.age && person.age < 25) extras.push("Young and charming ✨");
      if (parseSalary(person.salary) > 300000)
        extras.push("High income flex 💰");
    }

    return extras.length ? extras.join(", ") : "None";
  };

  // ======= Calculate male and female dowry =======
  const maleDowry = calculateIndividualDowry(male);
  const femaleDowry = calculateIndividualDowry(female);

  let finalDowry = 0;

  if (view === "Couple") {
    finalDowry = maleDowry - femaleDowry;

    if (finalDowry === 0)
      message = "Congrats, equality wins! No dowry needed 🏆";
    else if (finalDowry > 0) message = "Male side pays more 💸";
    else message = "Female side pays more 💸";

    breakdownData.push({
      side: "Male",
      contributions: getSatireExtras(male, "male"),
      amount: formatIndianCurrency(maleDowry),
    });
    breakdownData.push({
      side: "Female",
      contributions: getSatireExtras(female, "female"),
      amount: formatIndianCurrency(femaleDowry),
    });
  } else if (view === "Male") {
    finalDowry = maleDowry;
    message = `Male's total dowry: ₹${formatIndianCurrency(maleDowry)}`;
    breakdownData.push({
      side: "Male",
      contributions: getSatireExtras(male, "male"),
      amount: formatIndianCurrency(maleDowry),
    });
  } else if (view === "Female") {
    finalDowry = femaleDowry;
    message = `Female's total dowry: ₹${formatIndianCurrency(femaleDowry)}`;
    breakdownData.push({
      side: "Female",
      contributions: getSatireExtras(female, "female"),
      amount: formatIndianCurrency(femaleDowry),
    });
  }

  return {
    message,
    breakdownData,
    dowryAmount: finalDowry,
  };
}
