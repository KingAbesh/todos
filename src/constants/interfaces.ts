export interface AxiosDTO {
  path: string;
  method: string;
  args: object[];
}

export interface GeneralResponseDTO<T> {
  error: boolean;
  message: string;
  data: T;
}

export interface PaginateResponseDTO {
  data: any;
  total: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  perPage: number;
  totalPages: number;
}
