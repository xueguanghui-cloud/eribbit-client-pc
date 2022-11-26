export interface IRequestParams {
  page: number;
  pageSize: number;
  hasPicture: boolean | null;
  tag: string | null;
  sortField: string | null;
}
