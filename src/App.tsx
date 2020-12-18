import React from 'react';
import './App.css';

import SearchBar from './components/search-bar/search-bar';

function App() {
  return (
    <div className="App">
      <SearchBar
        disabled={false}
        searchPressed={(searchVal) => { console.log(searchVal) }}
      />
    </div>
  );
}

export default App;
