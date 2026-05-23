import { Button, ImageGrid } from '@/components';
import { TV_ENDPOINT } from '@/core/constants';
import type { EpisodeResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
 
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
    <section className="px-2 flex-1 space-y-3">
      <Button variant="primary" onClick={() => navigate(-1)}>← Back</Button>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-gray-400 flex items-center gap-2">
        <FaCalendarAlt />
        {data.air_date}
      </p>
      <p className="text-gray-300">{data.overview}</p>
      <h2 className="text-2xl font-bold">Episodes</h2>
      {data.episodes.length
        ? <ImageGrid results={gridData} />
        : <p className="text-gray-400 text-center">No episodes available.</p>
      }
    </section>
  );
};