import type { IGood } from "../good";
interface ICategory {
  id: string;
  name: string;
  goods: IGood[];
  children: ICategory[];
  picture: string;
  open: boolean;
}
export type { ICategory };
