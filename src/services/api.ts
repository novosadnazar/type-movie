import axios from "axios";
const API_KEY = "db49be3e69dd9bff6de58b5f8a0e3a4d";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string | null;
}

interface TrendingMoviesResponce {
  results: Movie[];
}

interface MovieDetails {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  
  release_date: string;
}

interface MovieSearch{
  results: Movie[];
}

//name, id, profile_path, character;
interface MovieCast {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;

}

interface MovieCastResponce{
  cast: MovieCast[]; 
}

interface MovieReviews {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    rating: number | null;
  }
}

interface MovieReviewsResponce {
  results: MovieReviews[];
}

export async function getTrendingMovies() {
  const res = await axios.get<TrendingMoviesResponce>("trending/movie/day", {
    params: {
      api_key: API_KEY,
    },
  });
  return res.data.results;
}

export async function getMovieDetails(movieId: string) {
  const res = await axios.get<MovieDetails>(`movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return res.data;
}

export async function getMovieCast(movieId:string) {
  const res = await axios.get<MovieCastResponce>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res.data.cast;
}

export async function getMovieReviews(movieId:string) {
  const res = await axios.get<MovieReviewsResponce>(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res.data.results;
}

export async function getMovieSearch(query:string) {
  const res = await axios.get<MovieSearch>(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    },
  });
  return res.data.results;
}
