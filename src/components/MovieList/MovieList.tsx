import { Link, useLocation } from "react-router-dom"
import style from "./MovieList.module.css"

interface Movie{
  id: number;
  original_title: string;
}

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }:MovieListProps) {
  const location = useLocation();

  
  return (
    <ul className={style.list}>
      {movies.map(({ original_title, id }) => {
        return (
          <li key={id} >
            <Link to={`/movies/${id}`} state={location}>{original_title}</Link>
          </li>
        );
      })}
    </ul>
  );
} 
