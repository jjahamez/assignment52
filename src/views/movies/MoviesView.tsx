import { ImageGrid, LinkGroup, Pagination } from '@/components';
import { MOVIE_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [category, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title ?? result.original_title,
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
  }));

  useEffect(() => {
    setPage(1);
  }, [category]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900/90">
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <LinkGroup
          options={[
            { label: 'Popular', to: '/movies/category/popular' },
            { label: 'Now Playing', to: '/movies/category/now_playing' },
            { label: 'Top Rated', to: '/movies/category/top_rated' },
            { label: 'Upcoming', to: '/movies/category/upcoming' },
          ]}
        />
        <ImageGrid results={gridData} onClick={(id) => navigate(`/movies/${id}/credits`)} />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};