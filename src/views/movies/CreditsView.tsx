import { ImageGrid } from '@/components';
import { MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core/constants';
import type { CreditsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
 
export const CreditsView = () => {
  const navigate = useNavigate();
  const { id, category } = useParams();
  const endpoint = category === 'movies' ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<CreditsResponse>(`${endpoint}/credits`, {}, [id]);
 
  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));
 
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
 
  return (
    <section className="px-2">
      <h2 className="text-2xl font-bold mb-6">Credits</h2>
      {data.cast.length
        ? <ImageGrid results={gridData} onClick={(id) => navigate(`/person/${id}/career`)} />
        : <p className="text-gray-400 text-center">No credits available.</p>
      }
    </section>
  );
};