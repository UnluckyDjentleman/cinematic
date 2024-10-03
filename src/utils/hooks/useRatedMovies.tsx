import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import MoviesAPI from "../moviesapi";
import User from "../../constants/types/user";
import MovieSearchInfo from "../../constants/types/movieSearchInfo";

export default function useRatedMovies(user: User){
    const [ratedMovies, setRatedMovies]=useState<{
        movie: MovieSearchInfo,
        rating: number
    }[]>([]);
    const [error, setError] = useState<AxiosError>()
    const [load, setLoad] = useState<string | boolean>();

    useEffect(()=>{
        setLoad("Loading...");
        MoviesAPI.GetFavouriteMovies(user).then(data => {
            if (data.length===0){
                setRatedMovies([])
            }
            else setRatedMovies(data)
            setLoad(true)
        })
        .catch(err => {
            setError(err)
            setLoad(false)
        })
    },[])

    return {ratedMovies, error, load};
}