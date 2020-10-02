import React from 'react';
import logo from './logo.svg';
import './App.css';

import Provider from "react-redux/es/components/Provider"
import store from "./store/Store/store"
import SearchBar from "./Components/SearchComponent"

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      
         <SearchBar />
         {/* <MovieComponent/>
         <SeriesComponent/> */}
      

    </div>
    </Provider>
  );
}

export default App;
