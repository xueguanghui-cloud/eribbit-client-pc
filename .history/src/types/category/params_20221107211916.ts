interface IParams {
  categoryId: string;
  page: number;
  pageSize: number;
  inventory?: boolean;
  onlyDiscount?: boolean;
  sortField?: null | string;
  sortMethod?: null | string;
  brandId?: string;
  attrs?: {
    groupName: string;
    propertyName: string;
  }[];
}

interface ISortParams {
  inventory: boolean;
  onlyDiscount: boolean;
  sortField: null | string;
  sortMethod: null | string;
}

interface IFilterParams {
  brandId: string;
  attrs: null || {
    groupName: string;
    propertyName: string;
  }[];
}

export type { IParams, ISortParams, IFilterParams };
