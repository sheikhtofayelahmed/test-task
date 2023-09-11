import React, { useState, useEffect } from 'react';
import styles from './index.module.css'; 

function Index() {
  const [name, setName] = useState('');
  const [jsonData, setJsonData] = useState({});
  const [selectedMainSector, setSelectedMainSector] = useState('');
  const [selectedSubSector, setSelectedSubSector] = useState('');
  const [selectedSubSubSector, setSelectedSubSubSector] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sectors');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    //remains   
    // Validation 

    // Save data to the database 

    // Clear the form after saving
    setName('');
    setSelectedMainSector('');
    setSelectedSubSector('');
    setSelectedSubSubSector('');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Enter Your Information</h1>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="sectors">Sectors:</label>
        <select
          value={selectedMainSector}
          onChange={handleMainSectorChange}
          required
        >
          <option value="">Select Main Sector</option>
          {mainSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        {selectedMainSector && (
          <div>
            <select
              value={selectedSubSector}
              onChange={handleSubSectorChange}
              required
            >
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
                  required
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

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="agree" required />
          <label htmlFor="agree">Agree to terms</label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Index;
