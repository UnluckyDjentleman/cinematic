import {configureStore} from '@reduxjs/toolkit'
import idReducer from './reducers/idReducer';
import movieListFilterReducer from './reducers/movieListFilterReducer';
import navigateLinkReducer from './reducers/navigateLinkReducer';
import userReducer from './reducers/userReducer';
import ratingsReducer from './reducers/ratingsReducer';
import genresReducer from './reducers/genresReducer';

export const store=configureStore({
    reducer:{
        id: idReducer,
        movieListFilter: movieListFilterReducer,
        navigateLink: navigateLinkReducer,
        user: userReducer,
        ratings: ratingsReducer,
        genres: genresReducer 
    }
});

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
