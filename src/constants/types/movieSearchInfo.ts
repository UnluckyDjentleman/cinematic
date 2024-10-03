interface MovieSearchInfo{
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<string>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: string,
    poster_path: string,
    release_date: Date,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export default MovieSearchInfo;