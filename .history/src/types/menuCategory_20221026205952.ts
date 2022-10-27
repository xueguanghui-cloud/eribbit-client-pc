import type { IGood } from "./home/home-good";
import type { ICategory } from "./category";
import type { IBrand } from "./home/home-brand";

interface IMenuCategory {
  id: string;
  name: string;
  children: ICategory[];
  goods?: IGood[];
  brands?: IBrand[];
}
export type { IMenuCategory };
