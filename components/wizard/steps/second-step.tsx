import { literaryThemes } from "@/data/literaryThemes";

import ThemesArtwork from "../themes-artwork";

function SecondStep() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-3 lg:gap-8">
      {literaryThemes.map((theme) => (
        <ThemesArtwork name={theme.name} cover={theme.cover} />
      ))}
    </div>
  );
}

export default SecondStep;
