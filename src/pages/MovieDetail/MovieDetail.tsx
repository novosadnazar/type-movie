import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import { useEffect, useState } from "react";
import style from "./MovieDetails.module.css";
import { GoArrowLeft } from "react-icons/go";

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

function MovieDetail() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  // const [movieDetails, setMovieDetails] = useState<MovieDetails>({});
  console.log(movieDetails);
  
  const location = useLocation();
 
  
  const { movieId } = useParams<{ movieId: string}>();

  useEffect(() => {
    async function fetchMovie() {
      if (!movieId) {
        return
      }
      const data = await getMovieDetails(movieId);
      setMovieDetails(data);
    }
    fetchMovie();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Завантаження деталей фільму...</p>;
  }
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;

  return (
    <>
      <Link className={style.back} to={location.state || "/"}>
        <GoArrowLeft /> Go Back
      </Link>
      <div>
        {movieDetails.poster_path ? (
          <img src={imageUrl} alt={movieDetails.original_title} />
        ) : (
          <p>Image is not found</p>
        )}

        <div>
          <h2 className={style.title}>
            {movieDetails.original_title} ({movieDetails.release_date})
          </h2>
          <p className={style.userScore}>
            User score: {movieDetails.vote_average}
          </p>
          <p className={style.overwiewTitle}>Overview</p>
          <p className={style.description}>{movieDetails.overview}</p>
          <p className={style.genre}>Genres</p>
          {movieDetails.genres && (
            <ul className={style.movie_list}>
              {movieDetails.genres.map(({ name, id }) => (
                <li key={id} className={style.movie_item}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <h2 className={style.aditional}>Aditional Information</h2>
      <ul>
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default MovieDetail;

//    https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
