import React from 'react';
import './styles/App.scss';

import {
  Button,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core'

import ViewOne from './components/ViewOne'
import ViewTwo from './components/ViewTwo'
import ViewThree from './components/ViewThree'

function App() {

  const [currentView, setView] = React.useState(0)

  const changeView = (event, newView) => {
    setView(newView)
  }

  return (
    <div className="App">
      <nav>
        <Typography variant="h6" component="h1">ANOMALY DETECTION WITH MADI</Typography>
        <Tabs value = {currentView} onChange = {changeView} variant="fullWidth" centered indicatorColor="primary">
          <Tab label="AD Overview" />
          <Tab label="Overall Trends" />
          <Tab label="About MADI" />
        </Tabs>
        <Button href="https://www.kaggle.com/c/ieee-fraud-detection/overview" target="_blank" color="primary">Data Source: IEEE-CIS Fraud Detection</Button>
      </nav>
      <div id = "views">
        {
          [<ViewOne />, <ViewTwo />, <ViewThree />][currentView]
        }
      </div>
    </div>
  );
}

export default App;
