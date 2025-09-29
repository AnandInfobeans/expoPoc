const fs = require("fs");
const path = require("path");

const appJsonPath = path.join(__dirname, "..", "app.json");

// Read app.json
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

// Get package name from command line arg
const packageName = process.argv[2];

if (!packageName) {
  console.error("❌ Please provide a package name (e.g. com.packagenameA)");
  process.exit(1);
}

// Update package name
appJson.expo.android.package = packageName;
appJson.expo.splash.image = `./assets/${packageName}.png`;
appJson.expo.icon = `./assets/${packageName}.png`;

// Write back
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

console.log(`✅ Updated Android package name to: ${packageName}`);