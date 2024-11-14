import { useAppDispatch, useAppSelector } from "../utils/hooks/reduxStore";
import useRatedMovies from "../utils/hooks/useRatedMovies";
import User from "../constants/types/user";
import MovieCard from "../components/card/movieCard";
import { useCallback, useState } from "react";
import { setId } from "../store/reducers/idReducer";
import { Loader, Image, Flex } from "@mantine/core";
import ErrorImage from "../constants/images/not-found.svg";

export default function Liked() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const id = useAppSelector((state) => state.id.id);
  const data = useRatedMovies(user as User);

  console.log(data);

  const [movieId, setMovieId] = useState<number | undefined>(id);
  const setIdMovie = useCallback(
    (idMovie: number) => {
      setMovieId(idMovie);
      console.log(idMovie);
      dispatch(setId(idMovie));
    },
    [movieId]
  );

  return (
    <>
      {data.error && <Image src={ErrorImage} w="auto"></Image>}
      {data.load === "Loading..." && <Loader />}
      {data.ratedMovies && (
        <Flex wrap="wrap" justify="center">
          {data.ratedMovies?.map((item) => (
            <MovieCard movieInfo={item.movie} onClick={setIdMovie} />
          ))}
        </Flex>
      )}
    </>
  );
}
