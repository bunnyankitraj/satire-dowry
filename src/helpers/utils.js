export function formatIndianCurrency(x) {
  if (!x) return "0";
  let numStr = x.toString();
  let lastThree = numStr.slice(-3);
  let otherNumbers = numStr.slice(0, -3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return result;
}
