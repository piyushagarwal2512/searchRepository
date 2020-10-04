import React from 'react';
import './App.css';
import Provider from "react-redux/es/components/Provider"
import store from "./store/Store/store"
import SearchBar from "./Components/SearchComponent"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import MainComponent from './Components/MainComponent';
import SearchComponentByType from './Components/SearchComponentByType';
import SeasonComponent from './Components/contentTypes/SeasonComponent';
import EpisodeComponent from './Components/contentTypes/EpisodeComponent';
import MyContent from './Components/MyContent';
import InfoComponent from './Components/InfoComponent';
import DataComponent from './Common/DataComponent';

function App() {
  return (
    <Provider store={store}>
      <Router>
    <div className="App">    
       <SearchBar />
       <Switch>
       <Route path="/" exact component={DataComponent}/>
         <Route path="/:searchText" exact component={MainComponent}/>
         <Route path="/search/:type/:searchText" exact component={SearchComponentByType}/>
         <Route path="/series/episodes/:imdbId/:seasonId" exact component={EpisodeComponent}/>
         <Route path="/series/:imdbId" exact component={SeasonComponent}/>
         <Route path="/me/content" exact component={MyContent}/>
         <Route path="/info/:imdbID" exact component={InfoComponent}/>
      </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
