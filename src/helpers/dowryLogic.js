export function calculateDowry({
  male,
  female,
  maleParent,
  femaleParent,
  view,
}) {
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
    if (person.education === "Bachelor's") bonus += 200000;
    if (person.education === "Master's") bonus += 300000;
    if (person.education === "PhD") bonus += 500000;
    return bonus;
  };

  const addMatrialStatusBonus = (person) => {
    let bonus = 0;
    if (person.marital === "Divorced") bonus -= 200000;
    if (person.marital === "Married") bonus -= 500000;
    return bonus;
  };

  const addAgeBonus = (person) => {
    let bonus = 0;
    if (person.age) {
      const age = parseInt(person.age);
      if (age < 25) bonus -= 200000;
      else if (age <= 30) bonus += 300000;
      else if (age <= 35) bonus += 100000;
      else bonus -= 300000;
    }
    return bonus;
  };

  const addCarBonus = (person) => (person.car === "Yes" ? 500000 : -500000);

  const addProfessionBonus = (profession) => {
    let bonus = 0;
    if (profession === "Government Employee") bonus += 1000000;
    if (profession === "Doctor") bonus += 500000;
    if (profession === "Engineer") bonus += 300000;
    if (profession === "IT") bonus += 300000;
    if (profession === "Teacher") bonus += 100000;
    if (profession === "Artist") bonus -= 100000;
    if (profession === "Business") bonus -= 100000;
    if (profession === "Unemployed Philosopher") bonus -= 500000;
    if (profession === "Student") bonus -= 300000;
    return bonus;
  };

  const addHomeBonus = (person) => (person.home === "Yes" ? 1000000 : -1000000);

  // ======= Individual dowry calculation (include parents salary) =======
  const calculateIndividualDowry = (
    person,
    parent = { salary: 0 },
    salaryMultiplier = 5
  ) => {
    const salary = parseSalary(person.salary) + parseSalary(parent.salary);
    let dowry = salary * salaryMultiplier;

    dowry += addProfessionBonus(person.profession);
    dowry += addProfessionBonus(parent.occupation);
    dowry += addHomeBonus(person);
    dowry += addCarBonus(person);
    dowry += addEducationBonus(person);
    dowry += addMatrialStatusBonus(person);
    dowry += addAgeBonus(person);

    return dowry;
  };

  // ======= Satire contributions =======
  const getSatireExtras = (person, parent, gender) => {
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

      // Parent info
      if (parent.occupation)
        extras.push(`Father's Occupation: ${parent.occupation}`);
      if (parseSalary(parent.salary) > 0)
        extras.push(`Father's Salary: ₹${formatIndianCurrency(parent.salary)}`);
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

      // Parent info
      if (parent.occupation)
        extras.push(`Father's Occupation: ${parent.occupation}`);
      if (parseSalary(parent.salary) > 0)
        extras.push(`Father's Salary: ₹${formatIndianCurrency(parent.salary)}`);
    }

    return extras.length ? extras.join(", ") : "None";
  };

  // ======= Calculate dowry =======
  const maleDowry = calculateIndividualDowry(male, maleParent);
  const femaleDowry = calculateIndividualDowry(female, femaleParent);

  let finalDowry = 0;

  if (view === "Couple") {
    finalDowry = maleDowry - femaleDowry;
    if (finalDowry === 0)
      message = "Congrats, equality wins! No dowry needed 🏆";
    else if (finalDowry > 0) message = "Female side pays more 💸";
    else {
      message = "Male side pays more 💸";
      finalDowry = Math.abs(finalDowry);
    }

    breakdownData.push({
      side: "Male",
      contributions: getSatireExtras(male, maleParent, "male"),
      amount: formatIndianCurrency(maleDowry),
    });
    breakdownData.push({
      side: "Female",
      contributions: getSatireExtras(female, femaleParent, "female"),
      amount: formatIndianCurrency(femaleDowry),
    });
  } else if (view === "Male") {
    finalDowry = maleDowry;
    message = `Male's total dowry: ₹${formatIndianCurrency(maleDowry)}`;
    breakdownData.push({
      side: "Male",
      contributions: getSatireExtras(male, maleParent, "male"),
      amount: formatIndianCurrency(maleDowry),
    });
  } else if (view === "Female") {
    finalDowry = femaleDowry;
    message = `Female's total dowry: ₹${formatIndianCurrency(femaleDowry)}`;
    breakdownData.push({
      side: "Female",
      contributions: getSatireExtras(female, femaleParent, "female"),
      amount: formatIndianCurrency(femaleDowry),
    });
  }

  return {
    message,
    breakdownData,
    dowryAmount: finalDowry,
  };
}
