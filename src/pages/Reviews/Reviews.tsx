import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMovieReviews } from "../../services/api"
import { format } from "date-fns";


interface MovieReviews {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    rating: number | null;
  }
}

export default function Reviews() {

  const [reviews, setReviews] = useState<MovieReviews[]>([])

  const { movieId } = useParams<{ movieId: string }>()
  
  useEffect(() => {
    async function fetchReviews() {
      if (!movieId) {
        return
      }
      const data = await getMovieReviews(movieId)
      setReviews(data)
    }

    fetchReviews()
  }, [movieId])


  return (
    <>
      <div>Reviews</div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ author, content, id, created_at, author_details: { rating } }) => {
            const result = format(Date.parse(created_at), "MMMM - dd - yyyy");
            return (
              <li key={id}>
                <h2>{author}</h2>
                <p>rating: {rating ? rating : "no rating"} </p>
                <p>{result }</p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>no reviews</p>
      )}
    </>
  );
}
