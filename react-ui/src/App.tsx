import React from 'react';
import logo from './logo.svg';
import './App.css';
import Typography from '@mui/material/Typography';
import Login from './components/Login';
import Signup from './components/Signup';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Typography variant="h1" component="h2">
        Congress Connection
      </Typography>
      <Typography variant="h4">
        Description of Service Below the Title
      </Typography>
      <div className="form">
        <Login />
      </div>

    </div>
  );
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

<div className="App">
      <Typography variant="h1" component="h2">
        Congress Connection
      </Typography>
      <Typography variant="h4">
        Description of Service Below the Title
      </Typography>
      <div className = "form">
        <Login />
      </div>
    
    </div>



*/