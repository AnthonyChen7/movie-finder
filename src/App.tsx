import { useState } from 'react';
import './App.css';

import SearchBar from './components/search-bar/search-bar';
import MovieTable from './components/movie-table/movie-table';
import { Movie } from './models/movie';

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=aeb03ac3';

function App() {
  const [movies, setMovies] = useState([] as Movie[]);
  const onSearchPressed = async (searchVal: string) => {
    const response = await fetch(`batman.json`);
    const json = await response.json();
    const parsedJson = parseJson(json);
    setMovies(parsedJson);
  };

  const parseJson = (json: any) => {
    const result: Movie[] = [];
    if (json && json.Search) {
      const searchResults = json.Search;
      for (const searchResult of searchResults) {
        const movie: Movie = {
          name: searchResult.Title,
          releasedDate: searchResult.Year,
          posterUrl: searchResult.Poster
        };
        result.push(movie);
      }
    }
    return result;
  };
  return (
    <div className="App">
      <SearchBar
        disabled={false}
        searchPressed={onSearchPressed}
      />

      <MovieTable
        movies={movies}
      />
      
    </div>
  );
}

export default App;
