import { ButtonGroup, ImageGrid, LinkGroup, Pagination } from '@/components';
import { TRENDING_ENDPOINT } from '@/core/constants';
import type { GenreResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') ?? 'day';
  const formatCategory = category === 'movies' ? 'movie' : 'tv';

  const { data } = useTmdb<GenreResponse>(
    `${TRENDING_ENDPOINT}/${formatCategory}/${interval}`,
    { page },
    [category, interval, page]
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title ?? result.name ?? '',
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
  }));

  useEffect(() => {
    setPage(1);
  }, [category, interval]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-800/90">
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <LinkGroup
            options={[
              { label: 'Movies', to: `/trending/movies?interval=${interval}` },
              { label: 'TV', to: `/trending/tv?interval=${interval}` },
            ]}
          />
          <ButtonGroup
            value={interval}
            options={[
              { label: 'Today', value: 'day' },
              { label: 'Week', value: 'week' },
            ]}
            onClick={(value) => setSearchParams({ interval: value })}
          />
        </div>
        <ImageGrid
          results={gridData}
          onClick={(id) =>
            category === 'movies' ? navigate(`/movies/${id}/credits`) : navigate(`/tv/${id}/seasons`)
          }
        />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};