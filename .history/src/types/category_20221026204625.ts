import type { IGood } from "./home/home-good";
interface ICategory {
  id: string;
  name: string;
  goods: IGood[];
  children: ICategory[];
  picture: string;
  open: boolean;
}
export type { ICategory };
