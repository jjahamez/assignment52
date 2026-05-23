import { ImageGrid, Pagination } from '@/components';
import { SEARCH_ENDPOINT } from '@/core/constants';
import type { SearchResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const query = searchParams.get('q') ?? '';
  const type = searchParams.get('type') ?? 'movie';
  const debouncedQuery = useDebounce(query, 670);

  const { data } = useTmdb<SearchResponse>(
    `${SEARCH_ENDPOINT}/${type}`,
    { query: debouncedQuery, page },
    [debouncedQuery, type, page]
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, type]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path ?? result.poster_path ?? null,
    primaryText: result.name ?? result.title ?? '',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-800/90">
      <section className="max-w-[1200px] mx-auto p-10 space-y-5">
        <h1 className="text-3xl font-bold">Results for: {query}</h1>
        <ImageGrid
          results={gridData}
          onClick={(id) => {
            if (type === 'person') navigate(`/person/${id}/career`);
            else navigate(`/${type === 'movie' ? 'movies' : 'tv'}/${id}/credits`);
          }}
        />
        {data.results.length ? (
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        ) : (
          <p className="text-center text-gray-400">No results found.</p>
        )}
      </section>
    </div>
  );
};