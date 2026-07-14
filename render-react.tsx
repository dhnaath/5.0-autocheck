import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';

global.localStorage = {
  getItem: (key) => {
    if (key === 'fc_has_onboarded') return 'true';
    if (key === 'fc_vehicle_type') return 'mobil';
    if (key === 'fc_motor_type') return 'bensin';
    return null;
  },
  setItem: () => {},
  removeItem: () => {},
};

global.window = {
    innerWidth: 1024,
    innerHeight: 768,
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
};

console.log(renderToString(<App />));
