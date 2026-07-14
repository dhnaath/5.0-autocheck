import * as LucideIcons from "lucide-react";

const icons = [
  "Fan",
  "Gauge",
  "Snowflake",
  "Flame",
  "Video",
  "Cable",
  "Microchip",
  "Flashlight",
  "Aperture",
  "MapPin",
  "ShieldAlert",
  "AlertTriangle",
  "Umbrella",
  "Hexagon",
  "Eye",
  "Bluetooth",
  "Wifi",
  "Music",
  "Smartphone",
  "Headphones"
];

for (const icon of icons) {
  if (LucideIcons[icon]) {
    console.log(icon + " EXISTS");
  } else {
    console.log(icon + " MISSING");
  }
}
