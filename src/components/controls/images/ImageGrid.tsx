import { IMAGE_BASE_URL, IMAGE_PLACEHOLDER, type ImageCell } from "@/core";

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
  }>;
  onClick?: (id: number) => void;
  children?: (image: ImageCell) => React.ReactNode;
};

export const ImageGrid = ({ results, onClick, children }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-5">
      {results.map((result) => (
        <div
          className={`overflow-hidden rounded-lg bg-gray-800 ${onClick ? "cursor-pointer transition hover:scale-[1.02]" : ""}`}
          key={result.id}
          onClick={() => onClick?.(result.id)}
        >
          {children?.({
            id: result.id,
            imageUrl: result.imagePath ? `${IMAGE_BASE_URL}${result.imagePath}` : IMAGE_PLACEHOLDER,
            primaryText: result.primaryText,
            secondaryText: result.secondaryText,
          })}
          <img
            alt={result.primaryText}
            className="h-[280px] w-full object-cover"
            src={result.imagePath ? `${IMAGE_BASE_URL}${result.imagePath}` : IMAGE_PLACEHOLDER}
          />
          <div className="p-3 text-center">
            <p className="truncate font-semibold text-sm">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
