import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

type BookSizesProps = {
  description: string;
  cover: string;
  selectedLength?: string;
  onClickBookLength: (length: string) => void;
};

function BookSizes({
  description,
  cover,
  selectedLength,
  onClickBookLength,
}: BookSizesProps) {
  const handleSelectBookLength = () => {
    if (selectedLength === description) {
      onClickBookLength("");
    } else {
      onClickBookLength(description);
    }
  };

  return (
    <div
      className="group relative block bg-black hover:cursor-pointer"
      onClick={handleSelectBookLength}
    >
      <Image
        src={`/bookSizes/${cover}`}
        alt={description}
        width={200}
        height={100}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-lg font-bold text-white sm:text-2xl">
          {description}
        </p>
      </div>

      {selectedLength === description && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-600/75 text-white">
          <CheckCircle2 size={40} color="white" />
          <p className="mt-2 text-sm font-semibold">Length selected!</p>
        </div>
      )}
    </div>
  );
}

export default BookSizes;
