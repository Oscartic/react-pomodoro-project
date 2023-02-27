import { useContext } from 'react'
import ReactSlider from 'react-slider'
import '../Slider.css'
import settingsContext from '../contexts/SettingContext'
import BackButton from './BackButton';

function Settings() {

    const settingsInfo = useContext(settingsContext);

    return (
        <div style={{textAlign:'left'}}>
            <label>Work minutes: {settingsInfo.workMinutes}:00</label>
            <ReactSlider 
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={(value) => settingsInfo.setWorkMinutes(value)}
                min={1}
                max={120}
            />
            <label>Break minutes: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider 
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakMinutes}
                onChange={(value) => settingsInfo.setBreakMinutes(value)}
                min={1}
                max={120}
            />
            <div style={{textAlign:'center', marginTop: '20px'}}>
                <BackButton onClick={settingsInfo.handleSettingsPanel}/>
            </div>
        </div>
    )
} 

export default Settings;    