const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const \[tripDistanceVal, setTripDistanceVal\] = useState<string>\(""\);/,
  `const [tripCalcMode, setTripCalcMode] = useState<"distance" | "volume">("distance");\n  const [tripDistanceVal, setTripDistanceVal] = useState<string>("");\n  const [tripVolumeVal, setTripVolumeVal] = useState<string>("");`
);

code = code.replace(
  /const tripCalcDetails = useMemo\(\(\) => \{[\s\S]*?\}, \[tripDistanceVal, dashboardEfficiency, activeFuelPrice\]\);/,
  `const tripCalcDetails = useMemo(() => {
    const minEff = dashboardEfficiency + 2;
    const maxEff = Math.max(5, dashboardEfficiency - 2);

    if (tripCalcMode === "distance") {
      const distance = parseFloat(tripDistanceVal) || 0;
      if (distance <= 0) return null;
      const minVolumeRequired = distance / minEff;
      const maxVolumeRequired = distance / maxEff;
      const minCostRange = minVolumeRequired * activeFuelPrice;
      const maxCostRange = maxVolumeRequired * activeFuelPrice;
      return {
        type: "distance",
        minVolumeRequired,
        maxVolumeRequired,
        minCostRange,
        maxCostRange,
      };
    } else {
      const volume = parseFloat(tripVolumeVal) || 0;
      if (volume <= 0) return null;
      const minDistanceRange = volume * maxEff; // maxEff means lower consumption per km, so less km? No, efficiency is km/L. So maxEff = more km/L. Thus maxDistance = volume * maxEff. minDistance = volume * minEff (wait, lower efficiency number means worse km/L, so minEff = dashboardEfficiency - 2 which is maxEff variable in code... wait).
      // Let's re-read maxEff definition.
      // const maxEff = Math.max(5, dashboardEfficiency - 2); // this is the lower number (worse efficiency)
      // const minEff = dashboardEfficiency + 2; // this is the higher number (better efficiency)
      // So minDistance is with maxEff (lower km/L).
      // minDistance = volume * maxEff
      // maxDistance = volume * minEff
      const minDistanceRange = volume * maxEff;
      const maxDistanceRange = volume * minEff;
      const exactCost = volume * activeFuelPrice;
      return {
        type: "volume",
        minDistanceRange,
        maxDistanceRange,
        exactCost,
      };
    }
  }, [tripCalcMode, tripDistanceVal, tripVolumeVal, dashboardEfficiency, activeFuelPrice]);`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Trip calc patched");
