import { MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';
 
export const TrailersView = () => {
  const { id, category } = useParams();
  const endpoint = category === 'movies' ? `${MOVIE_ENDPOINT}/${id}` : `${TV_ENDPOINT}/${id}`;
  const { data } = useTmdb<MovieRepsonse>(endpoint, { append_to_response: 'videos' }, [id]);
 
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
 
  const trailerVideos = data?.videos?.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer') ?? [];
 
  return (
    <section className="px-2 space-y-4">
      <h2 className="text-2xl font-bold">Trailers</h2>
      {trailerVideos.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {trailerVideos.map((video) => (
            <div key={video.key} className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allowFullScreen
              />
              <p className="text-sm text-gray-400 mt-2">{video.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No trailers available.</p>
      )}
    </section>
  );
};