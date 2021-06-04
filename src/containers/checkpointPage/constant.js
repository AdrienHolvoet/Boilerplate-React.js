export const BASE_URL = process.env.REACT_APP_API_URL;
export const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

export const IMAGE_WIDTH = 2461;
export const IMAGE_HEIGHT = 1842;
export const RATIO_IMG = 7;
export const RATIO_IMG_MODAL = 6;

export const PER_PAGE = 10;

export const SORTWAY_ASCENDING = "ASCENDING";
export const SORTWAY_DESCENDING = "DESCENDING";

export const FILTER_TYPE_DATE = "BY_DATE";
export const FILTER_TYPE_CONFIDENCE = "BY_CONFIDENCE";

export const SORTING_OPTIONS = [
  { value: FILTER_TYPE_CONFIDENCE, label: "indice de confiance" },
  ,
  { value: FILTER_TYPE_DATE, label: "date de création" },
];
