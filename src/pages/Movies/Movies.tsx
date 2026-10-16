import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { getMovieSearch } from "../../services/api";
import style from "./Movies.module.css";
import MovieList from "../../components/MovieList/MovieList";

interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string | null;
}

function Movies() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleInput = (evt:ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = async (evt:SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!query.trim()) {
      return;
    }
    const data = await getMovieSearch(query);
    setMovie(data);
   
    setQuery("");
  };

  return (
    <>
      <h2 className={style.title}>Movies-page</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          placeholder="Search-movie"
          value={query}
          onChange={handleInput}
          className={style.inpt}
        />
        <button type="submit" className={style.btn}>Search</button>
      </form>
      {movie.length > 0 ? (
        <MovieList movies={movie} />
      ) : (
        <h3 className={style.text} >There is no films that are you looking for by this name.</h3>
      )}
    </>
  );
}
//
export default Movies;
