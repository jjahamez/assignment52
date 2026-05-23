import { ImageGrid } from '@/components';
import { PERSON_ENDPOINT } from '@/core/constants';
import type { CareerResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
 
export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const { data: movieCredits } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);
  const { data: tvCredits } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/tv_credits`, {}, [id]);
 
  const combinedCredits = [
    ...(movieCredits?.cast ?? []).map((item) => ({ ...item, category: 'movies' })),
    ...(tvCredits?.cast ?? []).map((item) => ({ ...item, category: 'tv' })),
  ];
 
  const gridData = combinedCredits.map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title ?? result.name ?? '',
    secondaryText: result.character,
  }));
 
  if (!movieCredits && !tvCredits) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
 
  return (
    <section className="px-2 mt-10">
      <h2 className="text-2xl font-bold mb-6">Career</h2>
      {gridData.length
        ? <ImageGrid
            results={gridData}
            onClick={(id) => {
              const item = combinedCredits.find((x) => x.id === id);
              navigate(`/${item?.category}/${id}/credits`);
            }}
          />
        : <p className="text-gray-400 text-center">No credits available.</p>
      }
    </section>
  );
};