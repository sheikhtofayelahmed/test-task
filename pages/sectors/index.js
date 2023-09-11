import React, { useState, useEffect } from 'react';
import styles from './index.module.css'; 

function Index() {
  const [name, setName] = useState('');
  const [jsonData, setJsonData] = useState({});
  const [selectedMainSector, setSelectedMainSector] = useState('');
  const [selectedSubSector, setSelectedSubSector] = useState('');
  const [selectedSubSubSector, setSelectedSubSubSector] = useState('');
  const [selectedSubSubSubSector, setSelectedSubSubSubSector] = useState('');

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

  const subSubSubSectors =
    jsonData[selectedMainSector] &&
    jsonData[selectedMainSector][selectedSubSector] &&
    jsonData[selectedMainSector][selectedSubSector][selectedSubSubSector]
      ? Object.keys(jsonData[selectedMainSector][selectedSubSector][selectedSubSubSector])
      : [];

  const handleMainSectorChange = (e) => {
    const value = e.target.value;
    setSelectedMainSector(value);
    setSelectedSubSector('');
    setSelectedSubSubSector('');
    setSelectedSubSubSubSector('');
  };

  const handleSubSectorChange = (e) => {
    const value = e.target.value;
    setSelectedSubSector(value);
    setSelectedSubSubSector('');
    setSelectedSubSubSubSector('');
  };

  const handleSubSubSectorChange = (e) => {
    const value = e.target.value;
    setSelectedSubSubSector(value);
    setSelectedSubSubSubSector('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let isValid = true;
  
    if (name.trim() === '') {
      isValid = false;
      alert('Please enter a name.');
    }
  
    const agreeCheckbox = document.getElementById('agree');
    if (!agreeCheckbox.checked) {
      isValid = false;
      alert('Please agree to the terms.');
    }
  
    if (selectedMainSector === '') {
      isValid = false;
      alert('Please select a main sector.');
    }
  
    if (selectedSubSector === '') {
      isValid = false;
      alert('Please select a sub sector.');
    }
  
    if (selectedSubSubSector === '') {
      isValid = false;
      alert('Please select a sub-sub sector.');
    }
  
    if (isValid) {
      // Save data 
      setName('');
      setSelectedMainSector('');
      setSelectedSubSector('');
      setSelectedSubSubSector('');
      setSelectedSubSubSubSector('');
    }
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
          <option value="">Choose One</option>
          {mainSectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        {selectedMainSector && subSectors.length !==0 && (
          <div>
            <select
              value={selectedSubSector}
              onChange={handleSubSectorChange}
              required
            >
              <option value="">Choose One</option>
              {subSectors.map((subSector) => (
                <option key={subSector} value={subSector}>
                  {subSector}
                </option>
              ))}
            </select>

            {selectedSubSector && subSubSectors.length !==0 &&(
              <div>
                <select
                  value={selectedSubSubSector}
                  onChange={handleSubSubSectorChange}
                  required
                >
                  <option value="">Choose One</option>
                  {subSubSectors.map((subSubSector) => (
                    <option key={subSubSector} value={subSubSector}>
                      {subSubSector}
                    </option>
                  ))}
                </select>

                {selectedSubSubSector && subSubSubSectors.length !==0 && (
                  <div>
                    <select
                      value={selectedSubSubSubSector}
                      onChange={(e) => setSelectedSubSubSubSector(e.target.value)}
                      required
                    >
                      <option value="">Choose One</option>
                      {subSubSubSectors.map((subSubSubSector) => (
                        <option key={subSubSubSector} value={subSubSubSector}>
                          {subSubSubSector}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
