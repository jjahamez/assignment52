import { ImageGrid } from '@/components';
import { TV_ENDPOINT } from '@/core/constants';
import type { SeasonsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
 
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
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {data.seasons.length
        ? <ImageGrid results={gridData} onClick={(number) => navigate(`/tv/${id}/season/${number}`)} />
        : <p className="text-gray-400 text-center">No seasons available.</p>
      }
    </section>
  );
};