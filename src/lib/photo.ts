import heroRoom from "@/assets/painting-hero.jpg";

/**
 * The single photography source for the site.
 * Swap `src/assets/painting-hero.jpg` and update `alt` — every section follows.
 *
 * shortcut: stock placeholder, replace with the client's own job photos
 * before launch (and delete the credit line in Hero).
 */
export const photo = {
  src: heroRoom,
  alt: "Sunlit living room with freshly painted warm cream walls",
  credit: "Photo: Infrogmation · CC BY 2.0",
};

/** The "before" is the same photograph, dulled — one file, two looks. */
export const dullStyle = {
  filter: "saturate(0.32) brightness(0.84) contrast(0.92) sepia(0.2)",
};
