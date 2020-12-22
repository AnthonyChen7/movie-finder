import { useState, useEffect } from 'react';
import './App.css';

import SearchBar from './components/search-bar/search-bar';
import MovieTable from './components/movie-table/movie-table';
import { Movie } from './models/movie';

import {watchLaterRef} from "./firebase";

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=aeb03ac3';

function App() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movieNameToDbID, setMovieNameToDbID] = useState<{[key: string]: string}>({});

  useEffect(() => {
    watchLaterRef.on('value', (snapshot) => {
      const items = snapshot.val();
      let newMovieNameToDbID: {[key: string]: string} = {};
      if (items) {
        const uniqueIds = Object.keys(items);
        for (const uniqueId of uniqueIds) {
          const value = items[uniqueId];
          newMovieNameToDbID[value] = uniqueId;
        }
      }
      setMovieNameToDbID(newMovieNameToDbID);
    });
  }, []);

  useEffect(() => {
   const result: Movie[] = [];
    for (const movie of movies) {
      const newMovie = {
        ...movie,
        shouldWatchLater: movieNameToDbID[movie.name] !== undefined
      };
      result.push(newMovie);
    }
   setMovies(result);
  }, [movieNameToDbID]);

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
          posterUrl: searchResult.Poster,
          shouldWatchLater: movieNameToDbID[searchResult.Title] !== undefined
        };
        result.push(movie);
      }
    }
    return result;
  };

  const onWatchLaterToggled = (shouldWatchLater: boolean, movieName: string) => {
    if (shouldWatchLater && !movieNameToDbID[movieName]) {
      watchLaterRef.push(movieName);
    } else {
      watchLaterRef.child(movieNameToDbID[movieName]).remove();
    } 
  };
  return (
    <div className="App">
      <SearchBar
        disabled={false}
        searchPressed={onSearchPressed}
      />

      <MovieTable
        movies={movies}
        watchLaterToggled={onWatchLaterToggled}
      />
      
    </div>
  );
}

export default App;
