import React, { useState } from 'react';
import './App.css';

// Replace this with your JSON data
const jsonData = {
  "Manufacturing": {
    "Construction materials": null,
    "Electronics and Optics": null,
    "Food and Beverage": {
      "Bakery & confectionery products": null,
      "Beverages": null,
      "Fish & fish products": null,
      "Meat & meat products": null,
      "Milk & dairy products": null,
      "Other": null,
      "Sweets & snack food": null
    },
    // Add other sectors here...
  },
  "other": {
    "Creative industries": null,
    "Energy technology": null,
    "Environment": null
  },
  "Service": {
    "Business services": null,
    "Engineering": null,
    "Information Technology and Telecommunications": {
      "Data processing, Web portals, E-marketing": null,
      "Programming, Consultancy": null,
      "Software, Hardware": null,
      "Telecommunications": null
    },
    // Add other service sectors here...
  }
};

function App() {
  const [name, setName] = useState('');
  const [selectedMainSector, setSelectedMainSector] = useState('');
  const [selectedSubSector, setSelectedSubSector] = useState('');
  const [selectedSubSubSector, setSelectedSubSubSector] = useState('');

  const mainSectors = Object.keys(jsonData);

  const subSectors = jsonData[selectedMainSector]
    ? Object.keys(jsonData[selectedMainSector])
    : [];

  const subSubSectors =
    jsonData[selectedMainSector] && jsonData[selectedMainSector][selectedSubSector]
      ? Object.keys(jsonData[selectedMainSector][selectedSubSector])
      : [];

  const handleMainSectorChange = (e) => {
    const value = e.target.value;
    setSelectedMainSector(value);
    setSelectedSubSector('');
    setSelectedSubSubSector('');
  };

  const handleSubSectorChange = (e) => {
    const value = e.target.value;
    setSelectedSubSector(value);
    setSelectedSubSubSector('');
  };

  return (
    <div className="App">
      <form>
        <p>Please enter your name and pick the Sectors you are currently involved in.</p>
        <br />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <br />
        <label htmlFor="sectors">Sectors:</label>
        <select value={selectedMainSector} onChange={handleMainSectorChange}>
          <option value="">Select Main Sector</option>
          {mainSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        {selectedMainSector && (
          <div>
            <select value={selectedSubSector} onChange={handleSubSectorChange}>
              <option value="">Select Sub Sector</option>
              {subSectors.map((subSector) => (
                <option key={subSector} value={subSector}>
                  {subSector}
                </option>
              ))}
            </select>
            {selectedSubSector && (
              <div>
                <select
                  value={selectedSubSubSector}
                  onChange={(e) => setSelectedSubSubSector(e.target.value)}
                >
                  <option value="">Select Sub-Sub Sector</option>
                  {subSubSectors.map((subSubSector) => (
                    <option key={subSubSector} value={subSubSector}>
                      {subSubSector}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
        <br />
        <br />
        <input type="checkbox" id="agree" />
        <label htmlFor="agree">Agree to terms</label>
        <br />
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default App;
