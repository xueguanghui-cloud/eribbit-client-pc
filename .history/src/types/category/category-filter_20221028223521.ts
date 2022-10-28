interface IBrand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  desc: string;
  picture: string;
  place: string;
}

interface IProperties {
  id: string;
  name: string;
}

interface ISaleProperties {
  id: string;
  name: string;
  selectedBrand: string;
  properties: IProperties[];
}

interface ICategoryFilter {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  picture: string;
  selectedBrand: string;
  saleProperties: ISaleProperties[];
  brands: IBrand[];
}

export type { ICategoryFilter };
