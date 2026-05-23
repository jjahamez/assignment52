import { ImageGrid, LinkGroup, Pagination } from '@/components';
import { GENRE_ENDPOINT } from '@/core/constants';
import type { GenreResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOVIE_GENRES = [
  { name: 'Action', id: 28 },
  { name: 'Adventure', id: 12 },
  { name: 'Animation', id: 16 },
  { name: 'Crime', id: 80 },
  { name: 'Family', id: 10751 },
  { name: 'Fantasy', id: 14 },
  { name: 'History', id: 36 },
  { name: 'Horror', id: 27 },
  { name: 'Mystery', id: 9648 },
  { name: 'Sci-Fi', id: 878 },
];

const TV_GENRES = [
  { name: 'Action', id: 10759 },
  { name: 'Animation', id: 16 },
  { name: 'Comedy', id: 35 },
  { name: 'Crime', id: 80 },
  { name: 'Documentary', id: 99 },
  { name: 'Drama', id: 18 },
  { name: 'Family', id: 10751 },
  { name: 'Kids', id: 10762 },
  { name: 'Mystery', id: 9648 },
  { name: 'Sci-Fi', id: 10765 },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType, genre } = useParams();
  const [page, setPage] = useState<number>(1);

  const genres = mediaType === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const genreId = genres.find((item) => item.name.toLowerCase() === genre)?.id;

  const { data } = useTmdb<GenreResponse>(
    `${GENRE_ENDPOINT}/${mediaType}`,
    { with_genres: genreId, page },
    [mediaType, genreId, page]
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title ?? result.name ?? '',
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
  }));

  useEffect(() => {
    setPage(1);
  }, [mediaType, genre]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-green-950/90">
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <LinkGroup
          options={[
            { label: 'Movies', to: `/genre/movie/action`, match: ['/genre/movie/:genre'] },
            { label: 'TV', to: `/genre/tv/action`, match: ['/genre/tv/:genre'] },
          ]}
        />
        <LinkGroup
          options={genres.map((item) => ({
            label: item.name,
            to: `/genre/${mediaType}/${item.name.toLowerCase()}`,
          }))}
        />
        <ImageGrid
          results={gridData}
          onClick={(id) =>
            mediaType === 'movie' ? navigate(`/movies/${id}/credits`) : navigate(`/tv/${id}/seasons`)
          }
        />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};