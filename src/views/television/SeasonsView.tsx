import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { TV_ENDPOINT } from "@/core/constants";
import type { SeasonsResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  const gridData = (data?.seasons ?? []).map((result) => ({
    id: result.season_number,
    imagePath: result.poster_path,
    primaryText: result.name,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons.length ? (
        <ImageGrid onClick={(number) => navigate(`/tv/${id}/season/${number}`)} results={gridData} />
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
