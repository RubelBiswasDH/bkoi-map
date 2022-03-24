
import React from 'react';
import './App.css';
// import bkoigl from "bkoi-gl"
import MapPanel from "./component/MapPanel";
import SearchPanel from "./component/SearchPanel";

function App() {
  
  return (
    <div className="App">
      <SearchPanel />
       <MapPanel />
      
    </div>
  );
}

export default App;
