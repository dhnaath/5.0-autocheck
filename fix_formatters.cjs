const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldFormatters = `  // Dynamic localization formatters
  const formatCurrency = (val: number) => {
    const formattedVal = Math.round(val).toLocaleString(
      separator === "dot" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    );
    return \`\${currency} \${formattedVal}\`;
  };

  const formatVolume = (val: number) => {
    const formatted = val.toLocaleString(
      separator === "dot" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
    return \`\${formatted} \${volUnit === "gallon" ? "Gal" : "L"}\`;
  };

  const formatNumber = (val: number, decimals = 0) => {
    return val.toLocaleString(separator === "dot" ? "id-ID" : "en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };`;

const newFormatters = `  // Dynamic localization formatters
  const formatCurrency = (val: number) => {
    if (isNaN(val) || !isFinite(val)) val = 0;
    const formattedVal = Math.round(val).toLocaleString(
      separator === "dot" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    );
    return \`\${currency} \${formattedVal}\`;
  };

  const formatVolume = (val: number) => {
    if (isNaN(val) || !isFinite(val)) val = 0;
    const formatted = val.toLocaleString(
      separator === "dot" ? "id-ID" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
    return \`\${formatted} \${volUnit === "gallon" ? "Gal" : "L"}\`;
  };

  const formatNumber = (val: number, decimals = 0) => {
    if (isNaN(val) || !isFinite(val)) val = 0;
    return val.toLocaleString(separator === "dot" ? "id-ID" : "en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };`;

if (code.includes(oldFormatters)) {
  code = code.replace(oldFormatters, newFormatters);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Formatters fixed.");
} else {
  console.log("Formatters not found.");
}
