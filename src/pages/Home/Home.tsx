import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string | null;
}



function Home() {
  const [movies, setMovies] = useState <Movie[]>([]);


  useEffect(() => {
    async function fetchMovies() {
      const data = await getTrendingMovies();
      setMovies(data);
    }
    fetchMovies();
  }, []);


  return (
    <>
      <h2>Trending Todays Films</h2>
      <MovieList movies={movies} />
    </>
  );
}

export default Home;
