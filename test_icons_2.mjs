import * as LucideIcons from "lucide-react";

const icons = [
  "Camera",
  "Navigation",
  "AlertCircle",
  "PaintBucket",
  "ThermometerSun",
  "CloudRain",
  "KeyRound",
  "AudioWaveform",
  "GaugeCircle",
  "Link",
  "Circle",
  "ZapOff",
  "BatteryMedium",
  "BatteryFull",
  "Magnet",
  "Scan",
  "Wind",
  "Fan",
  "Siren"
];

let valid = [];
for (const icon of icons) {
  if (LucideIcons[icon]) {
    valid.push(icon);
  } else {
    console.log(icon + " MISSING");
  }
}
console.log("VALID: " + valid.join(","));
