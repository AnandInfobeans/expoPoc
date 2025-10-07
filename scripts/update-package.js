const fs = require("fs");
const path = require("path");

const appJsonPath = path.join(__dirname, "..", "app.json");

// Read app.json
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

// Get package name from command line arg
const appName = process.argv[2].toLowerCase();
const displayName = process.argv[2];

if (!appName) {
  console.error("❌ Please provide a package name (e.g. com.packagenameA)");
  process.exit(1);
}

// Update package name
appJson.expo.name = `${displayName} Buy`;
appJson.expo.android.adaptiveIcon.foregroundImage = `./assets/${appName}Buy.png`;
appJson.expo.android.package = `com.${appName}Buy`;
appJson.expo.splash.image = `./assets/${appName}Buy.png`;
appJson.expo.icon = `./assets/${appName}Buy.png`;
appJson.expo.icon = `./assets/${appName}Buy.png`;

// Write back
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

console.log(`✅ Updated Android package name to: com.${appName}`);