import { useState, useEffect } from "react";
import MovieSearchResult from "../../constants/types/moviesSearchResult";
import { AxiosError } from "axios";
import MoviesAPI from "../moviesapi";
import MovieListFilter from "../../constants/types/movieListFilter";

export default function useMovies(moviesFilter: MovieListFilter){
    const [movies, setMovies]=useState<MovieSearchResult>({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    });
    const [error, setError] = useState<AxiosError>()
    const [load, setLoad] = useState<string | boolean>();

    useEffect(()=>{
        setLoad("Loading...");
        MoviesAPI.GetMoviesList(moviesFilter).then(data => {
            if (data.total_results === 0)
                setMovies({page: 0,
                    results: [],
                    total_pages: 0,
                    total_results: 0
                })
            else setMovies(data)
            setLoad(true)
        })
        .catch(err => {
            setError(err)
            setLoad(false)
        })
    },[moviesFilter.genre,moviesFilter.release_year, moviesFilter.vote_average_gte, moviesFilter.vote_average_lte, moviesFilter.page, moviesFilter.sort_by])
    
    return { movies, error, load }
}