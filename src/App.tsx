import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import {
  CareerView,
  CartView,
  CreditsView,
  EpisodeView,
  ErrorView,
  FavoritesView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  NowPlayingView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SettingsView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from "@/views";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout />}>
        <Route element={<Navigate to="/movies/category/popular" />} path="movies" />
        <Route element={<Navigate to="/tv/category/airing_today" />} path="tv" />
        <Route element={<NowPlayingView />} path="now-playing" />
        <Route element={<TrendingView />} path="trending/:category" />
        <Route element={<SearchView />} path="search" />
        <Route element={<MoviesView />} path="movies/category/:category" />
        <Route element={<TelevisionView />} path="tv/category/:category" />
        <Route element={<GenreView />} path="genre/:mediaType/:genre" />
        <Route element={<MovieView />} path=":category/:id">
          <Route element={<SeasonsView />} path="seasons" />
          <Route element={<EpisodeView />} path="season/:season" />
          <Route element={<CreditsView />} path="credits" />
          <Route element={<TrailersView />} path="trailers" />
          <Route element={<ReviewsView />} path="reviews" />
        </Route>
        <Route element={<PersonView />} path="person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/favorites" element={<FavoritesView />} />
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
