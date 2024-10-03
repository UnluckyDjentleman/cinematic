import { useEffect, useState } from "react";
import User from "../../constants/types/user";
import { isMovieRated } from "../../firebase/queries";
import MovieSearchInfo from "../../constants/types/movieSearchInfo";

export default function useIsRated(user:User, movie: MovieSearchInfo){
    const [isRated, setIsRated] = useState<{isRated: boolean, rating: number|undefined}>();
    const [loading, setLoading]=useState<boolean|string>();
    const [error, setError]=useState<Error>();
    useEffect(()=>{
        setLoading("Loading...");
        if(user&&movie){
            isMovieRated(user,movie).then(val=>setIsRated({isRated:val.isRated, rating: val.rating}));
            setLoading(true)
        }
        else{
            setError(error);
            setLoading(false)
        }
    },[user, movie])

    return { isRated, setIsRated, loading, error };
}