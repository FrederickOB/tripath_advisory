export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface SortParams {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterParams {
  [key: string]: string | number | boolean;
}

export interface QueryParams extends PaginationParams {
  sort?: SortParams;
  filters?: FilterParams;
}
