import { Modal, Flex, Rating, Button } from "@mantine/core";
import { useCallback, useState } from "react";
import { addMovieRating, deleteMovie } from "../../firebase/queries";
import { useAppSelector } from "../../utils/hooks/reduxStore";
import { User } from "firebase/auth";
import useIsRated from "../../utils/hooks/useIsRated";
import useMovie from "../../utils/hooks/useMovie";
import MovieSearchInfo from "../../constants/types/movieSearchInfo";

export default function ModalRate({
  opened,
  close,
  onChangeRating,
}: {
  opened: boolean;
  close: () => void;
  onChangeRating: (value: number | undefined) => void;
}) {
  const user = useAppSelector((state) => state.user.user);

  const movieId = useAppSelector((state) => state.id);

  const movie = useMovie(movieId.id);

  const ratedMovie = useIsRated(
    user as User,
    movie.movie?.movieSearchInfo as MovieSearchInfo
  );

  console.log(ratedMovie);

  const [rating, setRating] = useState<number | undefined>(
    ratedMovie.isRated?.rating
  );

  const setRatingValue = useCallback(
    (ratingValue: number) => {
      console.log(ratingValue);
      setRating(ratingValue);
    },
    [rating]
  );

  const onChangeRatingValue = useCallback(
    async (rating: number | undefined) => {
      setRating(rating);
      onChangeRating(rating);
      if (rating !== undefined) {
        await addMovieRating(user as User, movieId.id, rating);
      } else {
        await deleteMovie(user as User, movieId.id);
      }
      close();
    },
    [onChangeRating]
  );

  return (
    <>
      <Modal opened={opened} onClose={close} title="Rating">
        <Flex direction="column">
          <Rating
            value={rating}
            defaultValue={ratedMovie.isRated?.rating}
            fractions={2}
            count={10}
            onChange={setRatingValue}
          />
          <Flex w="54%" mt="lg">
            <Button
              size="xs"
              radius={8}
              color="#9854F6"
              onClick={() => onChangeRatingValue(rating)}
            >
              Save
            </Button>
            <Button
              size="xs"
              radius={8}
              variant="transparent"
              color="#9854F6"
              onClick={() => onChangeRatingValue(undefined)}
            >
              Remove rating
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
