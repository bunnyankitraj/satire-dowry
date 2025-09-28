export function calculateDowry({
  male,
  female,
  maleParent,
  femaleParent,
  view,
}) {
  //console.log("male ", male);
  //console.log("female ", female);
  //console.log("maleParent ", maleParent);
  //console.log("femaleParent ", femaleParent);
  //console.log("view ", view);
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

  const addCasteBonus = (person) => {
    let bonus = 0;
    if (person.caste === "General") bonus += 500000;
    if (person.caste === "OBC") bonus += 200000;
    if (person.caste === "SC/ST") bonus += 10000;
    if (person.caste === "Other") bonus -= 100000;
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

  const addParentNetWorthBonus = (netWorth) => {
    //console.log("Parent net worth ", netWorth);
    const nw = parseSalary(netWorth);
    if (nw >= 1000000000) return 10000000; // 100 crore+
    if (nw >= 100000000) return 5000000; // 10 crore+
    if (nw >= 50000000) return 2000000; // 5 crore+
    if (nw >= 10000000) return 1000000; // 1 crore+
    if (nw >= 5000000) return 500000; // 50 lakh+
    if (nw >= 1000000) return 200000; // 10 lakh+
    if (nw >= 500000) return 100000; // 5 lakh+
    if (nw >= 0) return 50000;
  };
  // 1 lakh+
  // ======= Individual dowry calculation (include parents salary) =======
  const calculateIndividualDowry = (
    person,
    parent = { salary: 0 },
    salaryMultiplier = 5
  ) => {
    const salary = parseSalary(person.salary) + parseSalary(parent.salary);
    let dowry = salary * salaryMultiplier;
    //console.log("Base dowry from salary is ", dowry);

    dowry += addProfessionBonus(person.profession);
    //console.log("Profession bonus is ", addProfessionBonus(person.profession));
    dowry += addProfessionBonus(parent.occupation);
    //console.log("Parent Profession bonus is ",addProfessionBonus(parent.occupation));
    dowry += addHomeBonus(person);
    //console.log("Home bonus is ", addHomeBonus(person));
    dowry += addCarBonus(person);
    //console.log("Car bonus is ", addCarBonus(person));
    dowry += addEducationBonus(person);
    //console.log("Education bonus is ", addEducationBonus(person));
    dowry += addMatrialStatusBonus(person);
    //console.log("Marital status bonus is ", addMatrialStatusBonus(person));
    dowry += addAgeBonus(person);
    //console.log("Age bonus is ", addAgeBonus(person));
    dowry += addCasteBonus(person);
    //console.log("Caste bonus is ", addCasteBonus(person));
    dowry += addParentNetWorthBonus(parent.totalWorth);
    //console.log("Parent net worth bonus is ",addParentNetWorthBonus(parent.totalWorth));

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
    else if (finalDowry > 0) message = "Female will pay 💸";
    else {
      message = "Male will pay 💸";
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
