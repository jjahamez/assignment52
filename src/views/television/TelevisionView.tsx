import { ImageGrid, LinkGroup, Pagination } from '@/components';
import { TV_ENDPOINT } from '@/core/constants';
import type { TvResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { category } = useParams();

  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${category}`, { page }, [category, page]);
  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
  }));

  useEffect(() => {
    setPage(1);
  }, [category]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-stone-800/90">
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <LinkGroup
          options={[
            { label: 'Airing Today', to: '/tv/category/airing_today' },
            { label: 'On The Air', to: '/tv/category/on_the_air' },
            { label: 'Popular', to: '/tv/category/popular' },
            { label: 'Top Rated', to: '/tv/category/top_rated' },
          ]}
        />
        <ImageGrid results={gridData} onClick={(id) => navigate(`/tv/${id}/seasons`)} />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};  