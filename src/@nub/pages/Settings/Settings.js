// ** React
import  { useState } from 'react';

// ** Bootstrap
import { Form } from 'react-bootstrap';

// ** Css
import './Settings.css'; 


const Settings = () => {

  // ** States
  const [switches, setSwitches] = useState([true, false, false]);

  const handleSwitchChange = (index) => {
    const updatedSwitches = [...switches];
    updatedSwitches[index] = !updatedSwitches[index];
    setSwitches(updatedSwitches);
  };

  return (
    <div className='container'>
      <h3 className='header'>Api news sources</h3>
      <Form>
        <Form.Group>
          <div className="custom-switch-container">
            <div className="custom-switch-label">Api News</div>
            <Form.Check
              type="switch"
              id="switch1"
              checked={switches[0]}
              onChange={() => handleSwitchChange(0)}
            />
          </div>
          <div className="custom-switch-container">
            <div className="custom-switch-label">gordian news</div>
            <Form.Check
              type="switch"
              id="switch2"
              checked={switches[1]}
              onChange={() => handleSwitchChange(1)}
            />
          </div>
          <div className="custom-switch-container">
            <div className="custom-switch-label">news</div>
            <Form.Check
              type="switch"
              id="switch3"
              checked={switches[2]}
              onChange={() => handleSwitchChange(2)}
            />
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Settings;
