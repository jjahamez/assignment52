import { IMAGE_BASE_URL, IMAGE_PLACEHOLDER } from "@/core";

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
  }>;
  onClick?: (id: number) => void;
};

export const ImageGrid = ({ results, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-5">
      {results.map((result) => (
        <div
          key={result.id}
          className={`overflow-hidden rounded-lg bg-gray-800 ${onClick ? "cursor-pointer transition hover:scale-[1.02]" : ""}`}
          onClick={() => onClick?.(result.id)}
        >
          <img
            className="h-[280px] w-full object-cover"
            src={result.imagePath ? `${IMAGE_BASE_URL}${result.imagePath}` : IMAGE_PLACEHOLDER}
            alt={result.primaryText}
          />
          <div className="p-3 text-center">
            <p className="truncate text-sm font-semibold">{result.primaryText}</p>
            {result.secondaryText && <p className="text-xs text-gray-400">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};