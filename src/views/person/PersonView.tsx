import { FaBirthdayCake, FaLocationArrow } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup } from "@/components";
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from "@/core/constants";
import type { PersonResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="mx-auto max-w-4xl space-y-5 p-5 pt-10">
        <div className="flex gap-8">
          <img alt={data.name} className="h-[330px] w-[220px] rounded-xl object-cover" src={`${IMAGE_BASE_URL}${data.profile_path}`} />
          <div className="flex-1 space-y-4">
            <Button onClick={() => navigate(-1)} variant="primary">
              ← Back
            </Button>
            <h1 className="font-bold text-4xl">{data.name}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaLocationArrow />
              {data.place_of_birth}
            </p>
            <p className="flex items-center gap-2 text-gray-400">
              <FaBirthdayCake />
              {data.birthday}
            </p>
            <p className="text-gray-300">{data.biography}</p>
            <LinkGroup
              options={[
                { label: "Career", to: "career" },
                { label: "Images", to: "images" },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </section>
    </div>
  );
};
