const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const strToReplace = `        </div>
      </div>
    </TripModalContext.Provider>
  );
}

export default App;`;

const newStr = `        </div>
      </div>
    </>
  );
}`;

code = code.replace(strToReplace, newStr);

// Also remove `export default App;` in case it's lingering
code = code.replace(/export default App;/g, '');

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed final tags");
