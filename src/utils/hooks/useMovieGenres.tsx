import { useEffect, useState } from "react";
import MovieGenre from "../../constants/types/movieGenre";
import MoviesAPI from "../moviesapi";
import { AxiosError } from "axios";

export default function useMovieGenres(){
    const [movieGenres, setMovieGenres]=useState<MovieGenre[]>([]);
    const [error, setError] = useState<AxiosError>()
    const [load, setLoad] = useState<string | boolean>();
    
    useEffect(()=>{
        setLoad("Loading....");
        MoviesAPI.GetMoviesGenre().then(data => {
            if (data.length===0)
                setMovieGenres([])
            else setMovieGenres(data.genres)
            setLoad(true)
        })
        .catch(err => {
            setError(err)
            setLoad(false)
        })
    },[])

    return {movieGenres, error, load};
}