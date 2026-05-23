import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { SEARCH_ENDPOINT } from "@/core/constants";
import type { SearchResponse } from "@/core/types";
import { useDebounce, useTmdb } from "@/hooks";

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";
  const debouncedQuery = useDebounce(query, 670);

  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, { page, query: debouncedQuery }, [debouncedQuery, type, page]);

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path ?? result.poster_path ?? null,
    primaryText: result.name ?? result.title ?? "",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-800/90">
      <section className="mx-auto max-w-[1200px] space-y-5 p-10">
        <h1 className="font-bold text-3xl">Results for: {query}</h1>
        <ImageGrid
          onClick={(id) => {
            if (type === "person") navigate(`/person/${id}/career`);
            else navigate(`/${type === "movie" ? "movies" : "tv"}/${id}/credits`);
          }}
          results={gridData}
        />
        {data.results.length ? (
          <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
        ) : (
          <p className="text-center text-gray-400">No results found.</p>
        )}
      </section>
    </div>
  );
};
