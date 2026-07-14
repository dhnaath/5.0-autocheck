import { JSDOM } from "jsdom";
import fs from "fs";

// To make this work, we need to know the state.
// We can't know the exact React state, so let's render the app with different states and check if the selector exists.
// Wait, why don't I just parse the TSX to find `div:nth-of-type(4)`?
