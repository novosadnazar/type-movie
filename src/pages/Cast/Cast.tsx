import { useState, useEffect, } from "react"
import { useParams } from "react-router-dom"
import {getMovieCast} from "../../services/api"
export default function Cast() {

  interface Cast {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}


const [cast, setCast] = useState<Cast[]>([])
const {movieId} = useParams()
  
  useEffect(() => {
    async function fetchCast() {
      if (!movieId) {
        return
      }
      const data = await getMovieCast(movieId)
      setCast(data)

    }

    fetchCast()
  }, [movieId])
 
  return (
    <>
      <div>Cast</div>
      <ul>{cast.map(({ name, id, profile_path, character }) => {
        return (
          <li key={id}>
            {profile_path ? <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={name} /> : <p>no photo</p>}
            <h2>{ name}</h2>
            <p>{character }</p>
          </li>
        );
      })}</ul>
    </>
  );
}

  