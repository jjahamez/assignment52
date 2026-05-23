import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { NOW_PLAYING_ENDPOINT } from "@/core/constants";
import type { MoviesResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const NowPlayingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<MoviesResponse>(NOW_PLAYING_ENDPOINT, { page }, [page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-5">
      <h1 className="mb-4 font-bold text-3xl">Now Playing</h1>
      <ImageGrid onClick={(id) => navigate(`/movie/${id}/credits`)} results={gridData} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
