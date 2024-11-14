import MovieSearchInfo from "../../constants/types/movieSearchInfo";
import { Card, Image, Text, Flex } from "@mantine/core";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { useDisclosure } from "@mantine/hooks";
import ModalRate from "../modalRating/modalRating";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useIsRated from "../../utils/hooks/useIsRated";
import { useAppSelector } from "../../utils/hooks/reduxStore";
import User from "../../constants/types/user";

export default function MovieCard({
  movieInfo,
  onClick,
}: {
  movieInfo: MovieSearchInfo;
  onClick: (id: number) => void;
}) {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  //set to .env
  const prefix = "https://image.tmdb.org/t/p/w154";
  const result = useAppSelector((state) => state.genres);

  console.log(result);

  const [opened, { open, close }] = useDisclosure(false);
  const { isRated, setIsRated } = useIsRated(user as User, movieInfo);
  const [ratingValue, setRatingValue] = useState<number | undefined>(
    isRated?.rating
  );
  const onSetRatingValue = useCallback(
    (rating: number | undefined) => {
      setRatingValue(rating);
      setIsRated(
        rating !== undefined
          ? {
              isRated: true,
              rating: rating,
            }
          : { isRated: false, rating: undefined }
      );
    },
    [ratingValue]
  );

  const onSetId = useCallback(() => {
    onClick(movieInfo.id);
    navigate("/film");
  }, [onClick]);

  return (
    <Card shadow="sm" m="sm" w="45%" onClick={onSetId}>
      <Flex justify="space-between" pos="relative">
        <Image src={prefix + movieInfo.poster_path} alt={movieInfo.title} />
        <Flex direction="column" ml="3%" w="40%">
          <Text fw={800} c="violet.4" size="xl" mt="md" ta="center">
            {movieInfo.original_title}
          </Text>
          <Text size="xs" c="dimmed" mt="xs" ta="center">
            {movieInfo.release_date.toString().substring(0, 4)}
          </Text>
          <Flex mt="md" mb="xs">
            <FaStar size={24} color="#fab005"></FaStar>
            <Text fw={600}>{movieInfo.vote_average.toFixed(1)}</Text>
            <Text>({movieInfo.vote_count})</Text>
          </Flex>
          <Flex mt="md" mb="xs">
            <Text>
              Genres:{" "}
              {result.movieGenres
                .filter((el) => movieInfo.genre_ids.map(Number).includes(el.id))
                .map((el) => el.name)
                .join(", ")}
            </Text>
          </Flex>
        </Flex>
        <ModalRate
          opened={opened}
          close={close}
          onChangeRating={onSetRatingValue}
        />
        {ratingValue !== undefined || isRated?.isRated ? (
          <Flex>
            <FaStar size={24} color="#9854F6" onClick={open}></FaStar>
            <Text>{isRated?.rating}</Text>
          </Flex>
        ) : (
          <FaStar size={24} color="gray" onClick={open}></FaStar>
        )}
      </Flex>
    </Card>
  );
}
