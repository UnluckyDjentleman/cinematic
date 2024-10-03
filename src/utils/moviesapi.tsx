import axios from "axios";
import MovieSearchResult from "../constants/types/moviesSearchResult";
import MovieListFilter from "../constants/types/movieListFilter";
import User from "../constants/types/user";
import MovieSearchInfo from "../constants/types/movieSearchInfo";
import { getDocs, query, where } from "firebase/firestore";
import { firebaseData } from "../firebase/data";

export default class MoviesAPI{
    public static async GetMoviesList(moviesFilter: MovieListFilter):Promise<MovieSearchResult>{
        const resp=await axios.get('https://api.themoviedb.org/3/discover/movie',{
            params:{
                page: moviesFilter.page,
                with_genres: moviesFilter.genre,
                year: moviesFilter.release_year,
                "vote_average.lte": moviesFilter.vote_average_lte,
                "vote_average.gte": moviesFilter.vote_average_gte,
                sort_by: moviesFilter.sort_by
            },
            headers:{
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGEzNDhiYTgxMTZjZGNkMTNkMzBjMGFiNzc0YzJiMiIsIm5iZiI6MTcyMTU3MjMwOC4zMzEzNjIsInN1YiI6IjY2OWQxYTQzMGUwYmIyYWIyMmRkNWFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxDKbhtim8s5zh4ZmJ86avxjnXeJcm2t6zCKtDIy01Q`
            }
        });
        console.log("Data:"+JSON.stringify(resp.data));
        return resp.data;
    }
    public static async GetMoviesGenre(){
        const resp=await axios.get('https://api.themoviedb.org/3/genre/movie/list',{
            headers:{
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGEzNDhiYTgxMTZjZGNkMTNkMzBjMGFiNzc0YzJiMiIsIm5iZiI6MTcyMTU3MjMwOC4zMzEzNjIsInN1YiI6IjY2OWQxYTQzMGUwYmIyYWIyMmRkNWFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxDKbhtim8s5zh4ZmJ86avxjnXeJcm2t6zCKtDIy01Q`
            }
        });
        return resp.data;
    }
    public static async GetMovie(id: number|undefined){
        const resp=await axios.get(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`,{
            headers:{
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGEzNDhiYTgxMTZjZGNkMTNkMzBjMGFiNzc0YzJiMiIsIm5iZiI6MTcyMTU3MjMwOC4zMzEzNjIsInN1YiI6IjY2OWQxYTQzMGUwYmIyYWIyMmRkNWFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxDKbhtim8s5zh4ZmJ86avxjnXeJcm2t6zCKtDIy01Q`
            }
        })
        return resp.data;
    }
    public static async GetFavouriteMovies(user: User): Promise<{
      movie: MovieSearchInfo,
      rating: number
    }[]>{
        const result:{
          movie: MovieSearchInfo,
          rating: number
        }[]=[]

        const dbq=query(
          firebaseData.likedMoviesCollection,
          where("userid",'==',user.email)
        )
      
        const docSnapshot=await getDocs(dbq);

        for(const item of docSnapshot.docs){
          const filmData=item.data();
          const response=await axios.get(`https://api.themoviedb.org/3/movie/${filmData.movieid}`,{
            headers:{
              accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGEzNDhiYTgxMTZjZGNkMTNkMzBjMGFiNzc0YzJiMiIsIm5iZiI6MTcyMTU3MjMwOC4zMzEzNjIsInN1YiI6IjY2OWQxYTQzMGUwYmIyYWIyMmRkNWFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxDKbhtim8s5zh4ZmJ86avxjnXeJcm2t6zCKtDIy01Q`
            }
          });
          console.log(result)
          result.push({
            movie: {
              adult: response.data.adult,
              backdrop_path: response.data.backdrop_path,
              genre_ids: response.data.genres.map((el: { id: any; })=>el.id),
              id: response.data.id,
              original_language: response.data.original_language,
              original_title: response.data.original_title,
              overview: response.data.overview,
              popularity: response.data.popularity,
              poster_path: response.data.poster_path,
              release_date: response.data.release_date,
              title: response.data.title,
              video: response.data.video,
              vote_average: response.data.vote_average,
              vote_count: response.data.vote_count
            },
            rating: filmData.rate
          });
        }
        
        console.log(result);

        return result;
      }
}