import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from "@/core/constants";
import type { MovieRepsonse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: "videos" }, [id]);

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.name?.toLowerCase().includes("official")) ||
    data?.videos?.results.find((v) => v.site === "YouTube" && v.type === "Trailer");

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="space-y-6 p-6">
        <div
          className="h-[420px] rounded-2xl bg-center bg-cover"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img alt={data.title} className="h-[330px] w-[220px] rounded-xl object-cover" src={`${IMAGE_BASE_URL}${data.poster_path}`} />
          <div className="flex-1 space-y-4">
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              {data.release_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            {trailerVideo && (
              <div className="aspect-video">
                <iframe
                  allowFullScreen
                  className="h-full w-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title="Movie Trailer"
                />
              </div>
            )}
            <LinkGroup
              options={[
                { label: "Credits", to: "credits" },
                { label: "Reviews", to: "reviews" },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
