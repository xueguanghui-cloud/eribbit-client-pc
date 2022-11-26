export interface IRequestParams {
  page: number;
  pageSize: number;
  hasPicture: boolean | null;
  tag: string | null;
  sortField: string | null;
}

export interface ICommentInfo {
  evaluateCount: number;
  hasPictureCount: number;
  praisePercent: number;
  salesCount: number;
  tags: { tagCount: number; title: string }[];
}
