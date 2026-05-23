import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ImageGrid } from "@/components";
import { TV_ENDPOINT } from "@/core/constants";
import type { EpisodeResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const EpisodeView = () => {
  const navigate = useNavigate();
  const { id, season } = useParams();
  const { data } = useTmdb<EpisodeResponse>(`${TV_ENDPOINT}/${id}/season/${season}`, {}, [id, season]);

  const gridData = (data?.episodes ?? []).map((result) => ({
    id: result.episode_number,
    imagePath: result.still_path,
    primaryText: `Ep ${result.episode_number}: ${result.name}`,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="flex-1 space-y-3 px-2">
      <Button onClick={() => navigate(-1)} variant="primary">
        ← Back
      </Button>
      <h1 className="font-bold text-3xl">{data.name}</h1>
      <p className="flex items-center gap-2 text-gray-400">
        <FaCalendarAlt />
        {data.air_date}
      </p>
      <p className="text-gray-300">{data.overview}</p>
      <h2 className="font-bold text-2xl">Episodes</h2>
      {data.episodes.length ? <ImageGrid results={gridData} /> : <p className="text-center text-gray-400">No episodes available.</p>}
    </section>
  );
};
