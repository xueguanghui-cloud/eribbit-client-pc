import type { IGood } from "../good";
interface children {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  picture: string;
  brands: string;
  categories: string;
  goods: IGood[];
  saleProperties: string;
}

export type { ISubList };
