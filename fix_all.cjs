const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Find the start of the duplicated map header which was injected.
// The code right before the duplication is:
/*
                              </div>
                            </div>
                          ))
                        ))}
*/
// Let's find exactly this block.
const seamIndex = code.indexOf('                          ))\n                        ))}');
if (seamIndex === -1) {
  console.log("Could not find seam");
  process.exit(1);
}
// The end of the correct code is right after `                        ))}`.
const endOfCorrect = seamIndex + '                          ))\n                        ))}'.length;

const correctCode = code.slice(0, endOfCorrect) + '\n                    </div>\n                  );\n                })()}\n                </div>\n                {/* END OF HISTORY PORTION */}\n              </div>\n            )}\n\n';

// 2. Find TAB 4 which comes after the duplicated history tab
const tab4Index = code.indexOf('            {/* TAB 4: APP & VEHICLE INITIALIZATION SETTINGS VIEW */}');
if (tab4Index === -1) {
  console.log("Could not find tab 4");
  process.exit(1);
}

const restOfFile = code.slice(tab4Index);

fs.writeFileSync('src/App.tsx', correctCode + restOfFile);
console.log("Fixed!");
