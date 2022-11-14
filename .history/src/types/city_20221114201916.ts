interface ICity {
  name: string;
  level: number;
  code: string;
  areaList?: ICity[];
}
export type { ICity };
