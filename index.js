const QRCode = require("qrcode");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option("ssid", {
    alias: "s",
    description: "Set your WiFi SSID",
    type: "string",
  })
  .option("password", {
    alias: "p",
    description: "Set your WiFi Password",
    type: "string",
  })
  .option("type", {
    alias: "t",
    description: "Set your WiFi encryption type (WPA/WEP)",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

const generateQR = async () => {
  const { ssid, password, type } = argv;

  if (!ssid || !password || !type) {
    console.log("All options --ssid, --password, and --type are required");
    return;
  }

  const wifiConfig = `WIFI:T:${type};S:${ssid};P:${password};;`;

  try {
    await QRCode.toFile("wifi-qr.svg", wifiConfig, {
      type: "svg",
    });
    console.log("QR code has been saved as wifi-qr.svg");
  } catch (err) {
    console.log("Failed to generate QR code", err);
  }
};

generateQR();
