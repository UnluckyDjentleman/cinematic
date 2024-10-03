import useMovies from '../utils/hooks/useMovies'
import MovieCard from '../components/card/movieCard'
import {Flex, Loader, Pagination, Image} from '@mantine/core';
import Header from '../components/searchBar/header'
import ErrorImage from '../constants/images/not-found.svg'
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxStore';
import { useCallback, useRef, useState } from 'react';
import { setPage } from '../store/reducers/movieListFilterReducer';
import { setId } from '../store/reducers/idReducer';
import MovieListFilter from '../constants/types/movieListFilter';
import MovieSearchResult from '../constants/types/moviesSearchResult';

export default function MainPage(){

    const dispatch=useAppDispatch()
    const movieFilter=useAppSelector((state)=>state.movieListFilter)
    const id=useAppSelector((state)=>state.id)
    const defaultMovieFilter=useRef<MovieListFilter>(movieFilter);
    
    const [activePage, setActive]=useState<number>(movieFilter.page)
    const [movieId, setMovieId]=useState<number|undefined>(id.id)
    const moviesList=useRef<MovieSearchResult>({page: 0, results: [], total_pages: 0, total_results: 0})
    
    const result=useMovies({
      page: movieFilter.page,
      genre: movieFilter.genre,
      vote_average_lte: movieFilter.vote_average_lte,
      vote_average_gte: movieFilter.vote_average_gte,
      sort_by: movieFilter.sort_by,
      release_year: movieFilter.release_year
    })

    const setActivePage=useCallback((page:number)=>{
      setActive(page)
      dispatch(setPage(page))
    },[activePage])

    const setIdMovie=useCallback((idMovie:number)=>{
      setMovieId(idMovie)
      console.log(idMovie)
      dispatch(setId(idMovie))
    },[movieId])

    if (result.load === true) {
      moviesList.current = {
        page: result.movies.page,
        results: result.movies.results,
        total_pages: result.movies.total_pages,
        total_results: result.movies.total_results
      };
    }
    else if (result.load === "Loading...") {
      console.log(movieFilter.genre);
      if (defaultMovieFilter.current.genre !== movieFilter.genre ||
        defaultMovieFilter.current.release_year !== movieFilter.release_year ||
        defaultMovieFilter.current.sort_by !== movieFilter.sort_by||
        defaultMovieFilter.current.vote_average_lte !== movieFilter.vote_average_lte||
        defaultMovieFilter.current.vote_average_gte !== movieFilter.vote_average_gte) {
        moviesList.current = {
          page: 0,
          results: [],
          total_pages: 0,
          total_results: 0
        }
        defaultMovieFilter.current = movieFilter
      }
    }

    return (
        <>
          <Header></Header>
          {result.load==="Loading..."&&(
            <Loader size={30} mt="md" />
          )}
          {result.error&&(
            <Image src={ErrorImage} w="auto"></Image>       
          )}
          {result.movies.results&&(
            <Flex
            wrap="wrap"
            justify="center">
              {
              moviesList.current.results.map((el)=>(
                <MovieCard movieInfo={el} key={el.id} onClick={setIdMovie}></MovieCard>))
              }
            </Flex>)}
          <Flex mt="md" mb="xs" justify="flex-end">
            <Pagination total={moviesList.current.total_pages} color="violet.3" value={activePage} onChange={setActivePage}></Pagination>
          </Flex>
        </>
    )
}
