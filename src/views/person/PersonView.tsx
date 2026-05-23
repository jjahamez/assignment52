import { Button, LinkGroup } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants';
import type { PersonResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaBirthdayCake, FaLocationArrow } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-neutral-800/90">
      <section className="max-w-4xl mx-auto pt-10 p-5 space-y-5">
        <div className="flex gap-8">
          <img
            className="w-[220px] h-[330px] object-cover rounded-xl"
            src={`${IMAGE_BASE_URL}${data.profile_path}`}
            alt={data.name}
          />
          <div className="flex-1 space-y-4">
            <Button variant="primary" onClick={() => navigate(-1)}>← Back</Button>
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaLocationArrow />
              {data.place_of_birth}
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <FaBirthdayCake />
              {data.birthday}
            </p>
            <p className="text-gray-300">{data.biography}</p>
            <LinkGroup
              options={[
                { label: 'Career', to: 'career' },
                { label: 'Images', to: 'images' },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </section>
    </div>
  );
};
