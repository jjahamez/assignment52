import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonGroup, ImageGrid, LinkGroup, Pagination } from "@/components";
import { TRENDING_ENDPOINT } from "@/core/constants";
import type { GenreResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get("interval") ?? "day";
  const formatCategory = category === "movies" ? "movie" : "tv";

  const { data } = useTmdb<GenreResponse>(`${TRENDING_ENDPOINT}/${formatCategory}/${interval}`, { page }, [category, interval, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title ?? result.name ?? "",
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-800/90">
      <section className="mx-auto max-w-[1200px] space-y-5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <LinkGroup
            options={[
              { label: "Movies", to: `/trending/movies?interval=${interval}` },
              { label: "TV", to: `/trending/tv?interval=${interval}` },
            ]}
          />
          <ButtonGroup
            onClick={(value) => setSearchParams({ interval: value })}
            options={[
              { label: "Today", value: "day" },
              { label: "Week", value: "week" },
            ]}
            value={interval}
          />
        </div>
        <ImageGrid
          onClick={(id) => (category === "movies" ? navigate(`/movies/${id}/credits`) : navigate(`/tv/${id}/seasons`))}
          results={gridData}
        />
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
