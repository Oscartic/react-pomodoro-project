import './App.css';
import Settings from './components/Settings';
import Timer from './components/Timer';
import { useState } from 'react';
import SettingsContext from './contexts/SettingContext';

function App() {

  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  const handleSettingsPanel = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  return (
    <main>
      <SettingsContext.Provider value={{
        handleSettingsPanel,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        { isSettingsOpen ? <Settings /> : <Timer /> } 
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
