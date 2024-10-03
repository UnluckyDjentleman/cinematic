import MovieSearchInfo from "./movieSearchInfo"

interface MovieSearchResult{
    page: number,
    results: MovieSearchInfo[],
    total_pages: number,
    total_results: number
}

export default MovieSearchResult