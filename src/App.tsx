import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/mainLayout";
import MainPage from "./pages/mainPage";
import FilmPage from "./pages/filmPage";
import Liked from "./pages/liked";
import UserPanel from "./components/userPanel/userPanel";
import { useAppDispatch } from "./utils/hooks/reduxStore";
import useAuth from "./utils/hooks/useAuth";
import authState from "./constants/types/authState";
import { Loader } from "@mantine/core";
import { setUser } from "./store/reducers/userReducer";
import useMovieGenres from "./utils/hooks/useMovieGenres";
import { setMovieGenres } from "./store/reducers/genresReducer";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const genres = useMovieGenres();
  switch (auth.state) {
    case authState.Loading:
      return <Loader></Loader>;
    case authState.Authorized:
      dispatch(
        setUser({
          displayName: auth.data?.displayName ?? null,
          email: auth.data?.email,
          photoURL: auth.data?.photoURL ?? null,
        })
      );
      break;
    case authState.NotAuthorized:
      dispatch(setUser(undefined));
      break;
  }
  dispatch(
    setMovieGenres({
      movieGenres: genres.movieGenres,
      error: genres.error,
      load: genres.load,
    })
  );
  return (
    <>
      <MainLayout>
        <UserPanel />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/film" element={<FilmPage />} />
            <Route path="/rated" element={<Liked />} />
          </Routes>
        </BrowserRouter>
      </MainLayout>
    </>
  );
}

export default App;
