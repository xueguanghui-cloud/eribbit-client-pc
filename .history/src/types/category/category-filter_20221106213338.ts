import type {} from "../home/home-brand";

interface IProperties {
  id: string;
  name: string;
}

interface ISaleProperties {
  id: string;
  name: string;
  selectedProp: string;
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

export type { ICategoryFilter, ISaleProperties, IBrand, IProperties };
