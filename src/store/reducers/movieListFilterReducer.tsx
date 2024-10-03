import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import MovieListFilter from '../../constants/types/movieListFilter'

const initialState: MovieListFilter={
    page: 1,
    genre: undefined,
    release_year: undefined,
    vote_average_lte: undefined,
    vote_average_gte: undefined,
    sort_by: ""
}

export const movieListFilterReducer=createSlice({
    name: 'movieListFilter',
    initialState,
    reducers:{
        setMovieFilter: (state, action: PayloadAction<MovieListFilter>)=>{
            state.page=action.payload.page
            state.genre=action.payload.genre,
            state.release_year=action.payload.release_year,
            state.vote_average_lte=action.payload.vote_average_lte,
            state.vote_average_gte=action.payload.vote_average_gte,
            state.sort_by=action.payload.sort_by
        },
        setPage:(state, action: PayloadAction<number>)=>{
            state.page=action.payload;
        }
    }
})

export const {setMovieFilter, setPage} = movieListFilterReducer.actions

export default movieListFilterReducer.reducer; 