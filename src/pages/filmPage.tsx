import useMovie from "../utils/hooks/useMovie";
import { Card, Image, Text, Flex, Loader, Container } from "@mantine/core";
import ReactPlayer from "react-player";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import EmptyFrame from "../constants/images/Frame.svg";
import EmptySearch from "../constants/images/emptySearch.svg";
import { useAppSelector } from "../utils/hooks/reduxStore";
import { useDisclosure } from "@mantine/hooks";
import ModalRate from "../components/modalRating/modalRating";
import { useState } from "react";
import User from "../constants/types/user";
import useIsRated from "../utils/hooks/useIsRated";
import MovieSearchInfo from "../constants/types/movieSearchInfo";

export default function FilmPage() {
  const user = useAppSelector((state) => state.user.user);
  const movieId = useAppSelector((state) => state.id);
  const result = useMovie(movieId.id);
  const isMovieRated = useIsRated(
    user as User,
    result.movie?.movieSearchInfo as MovieSearchInfo
  );
  const prefix = "https://image.tmdb.org/t/p/w154";

  const [opened, { open, close }] = useDisclosure(false);

  const [ratingValue, setRatingValue] = useState<number | undefined>(
    isMovieRated.isRated?.rating
  );

  console.log(isMovieRated.isRated?.rating);

  return (
    <>
      {result.error && (
        <Flex justify="center" align="center">
          <Image src={EmptySearch} w="20%"></Image>
          <Text fw={800}>Sorry, we don't have such film</Text>
        </Flex>
      )}
      {result.load === "Loading..." && (
        <Flex justify="center">
          <Loader size={30}></Loader>
        </Flex>
      )}
      {result.movie && (
        <Container>
          <Card shadow="sm" m="sm" w="90%">
            <Flex justify="space-between" pos="relative">
              <Image
                src={prefix + result.movie.movieSearchInfo.poster_path}
                alt={result.movie.movieSearchInfo.title}
              />
              <Flex direction="column">
                <Text fw={800} c="violet.4" size="xl" mt="md" ta="center">
                  {result.movie.movieSearchInfo.original_title}
                </Text>
                <Text size="xs" c="dimmed" mt="xs" ta="center">
                  {result.movie.movieSearchInfo.release_date
                    .toString()
                    .substring(0, 4)}
                </Text>
                <Flex mt="md" mb="xs">
                  <FaStar size={24} color="#fab005"></FaStar>
                  <Text fw={600}>
                    {result.movie.movieSearchInfo.vote_average.toFixed(1)}
                  </Text>
                  <Text>({result.movie.movieSearchInfo.vote_count})</Text>
                </Flex>
                <Flex display="flex" wrap="wrap" w="100%" mt="lg" gap="lg">
                  <Flex direction="column">
                    <Text mt="xs" c="gray">
                      Duration
                    </Text>
                    <Text mt="xs" c="gray">
                      Premiere
                    </Text>
                    <Text mt="xs" c="gray">
                      Budget
                    </Text>
                    <Text mt="xs" c="gray">
                      Gross worldwide
                    </Text>
                    <Text mt="xs" c="gray">
                      Genres
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <Text mt="xs">{result.movie.runtime}min</Text>
                    <Text mt="xs">
                      {result.movie.movieSearchInfo.release_date.toString()}
                    </Text>
                    <Text mt="xs">${result.movie.budget}</Text>
                    <Text mt="xs">${result.movie.revenue}</Text>
                    <Text mt="xs">
                      {result.movie.genres.map((el) => el.name).join(", ")}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <ModalRate
                opened={opened}
                close={close}
                onChangeRating={setRatingValue}
              />
              {ratingValue || isMovieRated.isRated?.isRated ? (
                <Flex>
                  <FaStar size={24} color="#9854F6" onClick={open}></FaStar>
                  <Text>{ratingValue}</Text>
                </Flex>
              ) : (
                <FaStar size={24} color="gray" onClick={open}></FaStar>
              )}
            </Flex>
          </Card>
          <Card shadow="sm" m="sm" w="90%">
            <Text fw={800} mt="lg" mb="md">
              Trailer
            </Text>
            {result.movie.videos.results !== undefined &&
            result.movie.videos.results[0] !== undefined ? (
              <ReactPlayer
                url={`www.youtube.com/watch?v=${result.movie.videos.results[0].key}`}
                width="100%"
                controls={true}
              ></ReactPlayer>
            ) : (
              <Text>Cannot find video...</Text>
            )}
            <hr style={{ color: "gray" }} />
            <Text fw={800} mt="lg" mb="md">
              Description
            </Text>
            <Text>{result.movie.movieSearchInfo.overview}</Text>
            <hr style={{ color: "gray" }} />
            <Text fw={800} mt="lg" mb="md">
              Production
            </Text>
            <Flex direction="column">
              {result.movie.production_companies.map((el) => (
                <Flex wrap="wrap" mt="lg" gap="lg">
                  <Image
                    src={
                      el.logo_path !== null
                        ? `http://image.tmdb.org/t/p/w92/${el.logo_path}`
                        : EmptyFrame
                    }
                  ></Image>
                  <Text>{el.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Container>
      )}
    </>
  );
}
