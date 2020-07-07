import React from 'react';
import './App.css';
import BankData from "./BankData";
import {SignupForm} from "./SignupForm";

function App() {
  return (
    <div>
      <header className="App">
        <BankData/>
        {/*<SignupForm/>*/}
      </header>
    </div>
  );
}

export default App;
