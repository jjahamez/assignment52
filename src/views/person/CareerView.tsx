import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { PERSON_ENDPOINT } from "@/core/constants";
import type { CareerResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: movieCredits } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);
  const { data: tvCredits } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/tv_credits`, {}, [id]);

  const combinedCredits = [
    ...(movieCredits?.cast ?? []).map((item) => ({ ...item, category: "movies" })),
    ...(tvCredits?.cast ?? []).map((item) => ({ ...item, category: "tv" })),
  ];

  const gridData = combinedCredits.map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title ?? result.name ?? "",
    secondaryText: result.character,
  }));

  if (!movieCredits && !tvCredits) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mt-10 px-2">
      <h2 className="mb-6 font-bold text-2xl">Career</h2>
      {gridData.length ? (
        <ImageGrid
          onClick={(id) => {
            const item = combinedCredits.find((x) => x.id === id);
            navigate(`/${item?.category}/${id}/credits`);
          }}
          results={gridData}
        />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
