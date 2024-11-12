const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "products");
let allData = [];
const files = [
  "pizzas.json",
  "snacks.json",
  "breakfasts.json",
  "coctails.json",
  "coffee.json",
  "drinks.json",
  "desserts.json",
  "sauces.json",
  "others.json",
];

files.forEach((file) => {
  const filePath = path.join(dataDir, file);
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  allData = [...allData, ...fileData];
});

fs.writeFileSync(
  path.join(dataDir, "allData.json"),
  JSON.stringify(allData, null, 2),
  "utf8"
);

console.log("Files have been successfully merged into allData.json");
