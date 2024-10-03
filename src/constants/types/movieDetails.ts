import MovieGenre from "./movieGenre";
import MovieSearchInfo from "./movieSearchInfo";

interface MovieDetails{
    belongs_to_collection: string,
    budget: number,
    genres: Array<MovieGenre>,
    homepage: string,
    imdb_id: string,
    origin_country: Array<string>,
    production_companies: Array<{
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }>,
    production_countries: Array<{
        iso_3166_1: string,
        name: string
    }>,
    movieSearchInfo: MovieSearchInfo
    revenue: number,
    runtime: number,
    spoken_languages: [],
    status: string,
    tagline: string,
    videos: {
        results:Array<{
            iso_639_1: string,
            iso_3166_1: string,
            name: string,
            key: string,
            site: string,
            size: number,
            type: string,
            official: boolean,
            published_at: Date,
            id: string
        }>
    }
}

export default MovieDetails;