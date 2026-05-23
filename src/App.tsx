import { MainLayout } from '@/layouts/MainLayout';
import { ErrorView, GenreView, HomeView, NowPlayingView, SearchView, TrendingView, MoviesView, MovieView, CreditsView, ReviewsView, TrailersView, TelevisionView, SeasonsView, PersonView, CareerView, ImagesView, EpisodeView } from '@/views';
import { Navigate, Route, Routes } from 'react-router-dom';
 
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="movies" element={<Navigate to="/movies/category/popular" />} />
        <Route path="tv" element={<Navigate to="/tv/category/airing_today" />} />
        <Route path="now-playing" element={<NowPlayingView />} />
        <Route path="trending/:category" element={<TrendingView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="movies/category/:category" element={<MoviesView />} />
        <Route path="tv/category/:category" element={<TelevisionView />} />
        <Route path="genre/:mediaType/:genre" element={<GenreView />} />
        <Route path=":category/:id" element={<MovieView />}>
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:season" element={<EpisodeView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};