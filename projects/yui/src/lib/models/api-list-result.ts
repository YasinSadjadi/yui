/** Default response contract used by Tasker's searchable inputs and pageable grid. */
export interface ApiListResult<T> {
  succeeded: boolean;
  results: T[];
  totalCount: number;
  totalPages: number;
  message?: string | null;
}
