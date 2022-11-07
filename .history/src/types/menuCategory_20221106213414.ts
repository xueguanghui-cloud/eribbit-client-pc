import type { IGood } from "./good";
import type { ICategory } from "./category/category";
import type { IBrand } from "./brand";

interface IMenuCategory {
  id: string;
  name: string;
  children: ICategory[];
  goods?: IGood[];
  brands?: IBrand[];
}
export type { IMenuCategory };
