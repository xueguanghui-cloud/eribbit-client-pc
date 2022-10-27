import { IGood } from "../good";
interface ISubList {
  id: string;
  name: string;
  picture: string;
  children: [];
}

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
