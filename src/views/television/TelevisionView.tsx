import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { TV_ENDPOINT } from "@/core/constants";
import type { TvResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

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
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-stone-800/90">
      <section className="mx-auto max-w-[1200px] space-y-5 p-5">
        <LinkGroup
          options={[
            { label: "Airing Today", to: "/tv/category/airing_today" },
            { label: "On The Air", to: "/tv/category/on_the_air" },
            { label: "Popular", to: "/tv/category/popular" },
            { label: "Top Rated", to: "/tv/category/top_rated" },
          ]}
        />
        <ImageGrid onClick={(id) => navigate(`/tv/${id}/seasons`)} results={gridData} />
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
