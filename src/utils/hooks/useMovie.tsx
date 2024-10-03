import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import MoviesAPI from "../moviesapi";
import MovieDetails from "../../constants/types/movieDetails";

export default function useMovie(id:number|undefined){
    const [movie, setMovie]=useState<MovieDetails>();
    const [error, setError] = useState<AxiosError>()
    const [load, setLoad] = useState<string | boolean>();

    useEffect(()=>{
        setLoad("Loading...");
        MoviesAPI.GetMovie(id).then(data => {
            console.log(data);
            setMovie({
                belongs_to_collection: data.belongs_to_collection,
                budget: data.budget,
                genres: data.genres,
                homepage: data.homepage,
                imdb_id: data.imdb_id,
                origin_country: data.originCountries,
                production_companies: data.production_companies,
                production_countries: data.production_countries,
                movieSearchInfo: {
                    adult: data.adult,
                    backdrop_path: data.backdrop_path,
                    genre_ids: data.genres.map((el: { id: any; })=>el.id),
                    id: data.id,
                    original_language: data.original_language,
                    original_title: data.original_title,
                    overview: data.overview,
                    popularity: data.popularity,
                    poster_path: data.poster_path,
                    release_date: data.release_date,
                    title: data.title,
                    video: data.video,
                    vote_average: data.vote_average,
                    vote_count: data.vote_count
                },
                revenue: data.revenue,
                runtime: data.runtime,
                spoken_languages: data.spoken_languages,
                status: data.status,
                tagline: data.tagline,
                videos: {
                    results:data.videos.results
                }
            })
            setLoad(true)
        })
        .catch(err => {
            setError(err)
            setLoad(false)
        })
    },[])
    
    return { movie, error, load }
}