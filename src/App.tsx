import { useState, useEffect } from 'react';
import './App.css';

import SearchBar from './components/search-bar/search-bar';
import MovieTable from './components/movie-table/movie-table';
import { Movie } from './models/movie';

import {watchLaterRef} from "./firebase";

const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=aeb03ac3';

function App() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [moviesToWatchLater, setMoviesToWatchLater] = useState<{[key: string]: boolean}>({});
  const [movieNameToDbID, setMovieNameToDbID] = useState<{[key: string]: string}>({});

  useEffect(() => {
    watchLaterRef.on('value', (snapshot) => {
      const items = snapshot.val();
      if (items) {
        const uniqueIds = Object.keys(items);
        let newMoviesTowatchLater: {[key: string]: boolean} = {};
        let newMovieNameToDbID: {[key: string]: string} = {};
        for (const uniqueId of uniqueIds) {
          const value = items[uniqueId];
          newMoviesTowatchLater[value.name] = value.watchLater;
          newMovieNameToDbID[value.name] = uniqueId;
        }
        setMoviesToWatchLater(newMoviesTowatchLater);
        setMovieNameToDbID(newMovieNameToDbID);
      }
    });
  }, []);

  useEffect(() => {
    const result: Movie[] = [];

    for (const movie of movies) {
      const newMovie = {
        ...movie,
        shouldWatchLater: moviesToWatchLater[movie.name]
      };
      result.push(newMovie);
    }

    setMovies(result);
  }, [moviesToWatchLater]);

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
          shouldWatchLater: moviesToWatchLater[searchResult.Title]
        };
        result.push(movie);
      }
    }
    return result;
  };

  const onWatchLaterToggled = (shouldWatchLater: boolean, movieName: string) => {
    if (!movieNameToDbID[movieName]) {
      watchLaterRef.push({
        name: movieName,
        watchLater: shouldWatchLater
      });
    } else {
      watchLaterRef.child(movieNameToDbID[movieName]).set({name: movieName,
        watchLater: shouldWatchLater})
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
