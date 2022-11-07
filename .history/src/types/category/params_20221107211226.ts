interface IParams {
  categoryId: string;
  page: number;
  pageSize: number;
}

interface ISortParams {
  inventory: boolean;
  onlyDiscount: boolean;
  sortField: null | string;
  sortMethod: null | string;
}

export type { IParams, ISortParams };
