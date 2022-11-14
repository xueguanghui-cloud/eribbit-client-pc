interface ICity {
  name: string;
  level: number;
  code: string;
  areaList?: ICity[];
}

interface ISelectCity {
  [x: string]: string;
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  countyCode: string;
  countyName: string;
  fullLocation: string;
}

export type { ICity, ISelectCity };
