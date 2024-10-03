import MovieSearchInfo from "../constants/types/movieSearchInfo";
import User from "../constants/types/user"
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firebaseData } from "./data";

async function isMovieRated(user: User, movie: MovieSearchInfo) {
    const dbq = query(
        firebaseData.likedMoviesCollection,
        where("userid", "==", user.email),
        where("movieid", "==", movie.id.toString())
      );
    
    const docSnap = await getDocs(dbq);
    var rated;
    if(!docSnap.empty){
      rated=docSnap.docs.map(el=>el.data()).map(el=>el.rate)[0] as number;
    }
    return {isRated: !docSnap.empty, rating: rated};
}

async function addMovieRating(user: User, movieid: number|undefined, rating: number){

    const dbq = query(
        firebaseData.likedMoviesCollection,
        where("userid", "==", user.email),
        where("movieid", "==", movieid?.toString())
      );
    
      const docSnap = await getDocs(dbq);

    if (!docSnap.empty) {
        await updateDoc(doc(firebaseData.database,'LikedMovies',docSnap.docs[0].id),{rate: rating.toString()})
    }
    else{
        await addDoc(firebaseData.likedMoviesCollection, { userid: user.email, movieid: movieid?.toString(), rate: rating.toString() });
    }
}

async function deleteMovie(user: User, movieid: number|undefined){
    
    const dbq = query(
        firebaseData.likedMoviesCollection,
        where("userid", "==", user.email),
        where("movieid", "==", movieid?.toString())
      );
    
      const docSnap = await getDocs(dbq);
    
      if(!docSnap.empty){
        await deleteDoc(doc(firebaseData.likedMoviesCollection, docSnap.docs[0].id))
      }
}

export {isMovieRated, addMovieRating, deleteMovie};