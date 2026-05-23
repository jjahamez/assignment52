import { ImageGrid } from '@/components';
import { PERSON_ENDPOINT } from '@/core/constants';
import type { ImagesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';
 
export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id]);
 
  const gridData = (data?.profiles ?? []).map((image, i) => ({
    id: i,
    imagePath: image.file_path,
    primaryText: '',
  }));
 
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
 
  return (
    <section className="px-2 mt-10">
      <h2 className="text-2xl font-bold mb-6">Images</h2>
      {gridData.length
        ? <ImageGrid results={gridData} />
        : <p className="text-gray-400 text-center">No images available.</p>
      }
    </section>
  );
};