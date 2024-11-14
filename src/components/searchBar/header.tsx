import { Button, Flex } from "@mantine/core";
import Selector from "./select/select";
import VoteInput from "./vote/vote";
import listYear from "../../constants/yearList";
import sortByArray from "../../constants/sortBy";
import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxStore";
import {
  setMovieFilter,
  setPage,
} from "../../store/reducers/movieListFilterReducer";

export default function Header() {
  const dispatch = useAppDispatch();
  const movieFilter = useAppSelector((state) => state.movieListFilter);
  const movieGenresArray = useAppSelector((state) => state.genres);

  const movieYearRelease = useRef<number | undefined>(movieFilter.release_year);
  const movieVoteLte = useRef<number | undefined>(movieFilter.vote_average_lte);
  const movieVoteGte = useRef<number | undefined>(movieFilter.vote_average_gte);
  const movieSortBy = useRef<string | null>(movieFilter.sort_by);
  const genreSetted = useRef<string | null>(
    movieGenresArray.movieGenres.find((el) => el.id === movieFilter.genre)
      ?.name as string
  );

  const onFilterSubmit = useCallback(() => {
    console.log(
      movieGenresArray.movieGenres.find((el) => el.name === genreSetted.current)
    );
    dispatch(
      setMovieFilter({
        page: 1,
        genre: movieGenresArray.movieGenres.find(
          (el) => el.name === genreSetted.current
        )?.id,
        release_year: movieYearRelease.current,
        vote_average_lte: movieVoteLte.current,
        vote_average_gte: movieVoteGte.current,
        sort_by: movieSortBy.current as string,
      })
    );
    dispatch(setPage(1));
  }, [movieYearRelease, movieVoteGte, movieVoteLte, movieSortBy, genreSetted]);

  const onFilterReset = useCallback(() => {
    genreSetted.current = null;
    movieVoteGte.current = undefined;
    movieVoteLte.current = undefined;
    movieYearRelease.current = undefined;
    movieSortBy.current = null;
    dispatch(
      setMovieFilter({
        page: 0,
        genre: undefined,
        release_year: undefined,
        vote_average_lte: undefined,
        vote_average_gte: undefined,
        sort_by: "",
      })
    );
    onFilterSubmit();
  }, [movieYearRelease, movieVoteLte, movieVoteGte, movieSortBy, genreSetted]);

  const onPickGenre = useCallback(
    (value: string | null) => {
      genreSetted.current = value as string;
      onFilterSubmit();
    },
    [genreSetted]
  );

  const onRatingLte = useCallback(
    (value: number | string) => {
      movieVoteLte.current = value as number;
      onFilterSubmit();
    },
    [movieVoteLte]
  );

  const onRatingGte = useCallback(
    (value: number | string) => {
      movieVoteGte.current = value as number;
      onFilterSubmit();
    },
    [movieVoteGte]
  );

  const onPickYear = useCallback(
    (value: string | null) => {
      movieYearRelease.current = parseInt(value as string);
      onFilterSubmit();
    },
    [movieYearRelease]
  );

  const onPickSortBy = useCallback(
    (value: string | null) => {
      movieSortBy.current = value;
      onFilterSubmit();
    },
    [movieSortBy]
  );

  return (
    <div style={{ margin: "3%" }}>
      <Flex mt="md" mb="xs" justify="space-between">
        <Selector
          selector={movieGenresArray.movieGenres.map((el) => el.name)}
          label="Genre"
          placeholder="Select Genre"
          onPickVal={onPickGenre}
          value={genreSetted.current as string}
        ></Selector>
        <VoteInput
          placeholder="From"
          label="Ratings"
          onVote={onRatingGte}
          value={movieVoteGte.current}
        ></VoteInput>
        <VoteInput
          placeholder="To"
          label={undefined}
          onVote={onRatingLte}
          value={movieVoteLte.current}
        ></VoteInput>
        <Selector
          selector={listYear.map(String)}
          label="Year"
          placeholder="Year"
          onPickVal={onPickYear}
          value={movieYearRelease.current?.toString()}
        ></Selector>
        <Button
          variant="transparent"
          style={{ alignSelf: "flex-end", marginBottom: "0" }}
          color="#7B7C88"
          onClick={onFilterReset}
        >
          Reset Filters
        </Button>
      </Flex>
      <Flex mt="md" mb="xs" justify="flex-end">
        <Selector
          selector={sortByArray}
          label="Sort By"
          placeholder="Sort By"
          onPickVal={onPickSortBy}
          value={movieSortBy.current as string}
        ></Selector>
      </Flex>
    </div>
  );
}
