interface MovieListFilter{
    page: number,
    genre: number|undefined,
    release_year: number|undefined,
    vote_average_lte: number|undefined,
    vote_average_gte: number|undefined,
    sort_by: string|null
}

export default MovieListFilter