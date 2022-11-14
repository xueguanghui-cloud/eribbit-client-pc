import type { IBrand } from "../brand";
import type { IGood } from "../good";

interface Icategorie {
  id: string;
  layer: number;
  name: string;
  parent: Icategorie;
}

interface ISku {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: { name: string; valueName: string }[];
}

interface IUserAddresses {
  address: string;
  addressTags: string;
  cityCode: string;
  contact: string;
  countyCode: string;
  fullcation: string;
  id: string;
  isDefault: number;
  postalCode: string;
  provinceCode: string;
  receiver: string;
}

interface IValues {
  selected: boolean;
  desc: string;
  name: string;
  picture: string;
}
interface ISpecs {
  id: string;
  name: string;
  values: {
    selected: boolean;
    desc: string;
    name: string;
    picture: string;
  }[];
}

interface IGoods {
  brand: IBrand;
  categories: Icategorie[];
  collectCount: number;
  commentCount: number;
  desc: string;
  details: {
    pictures: string[];
    properties: { name: string; value: string }[];
  };
  discount: number;
  evaluationInfo: string[];
  hotByDay: IGood[];
  id: string;
  inventory: number;
  isCollect: boolean;
  isPreSale: boolean;
  mainPictures: string[];
  mainVideos: string[];
  name: string;
  oldPrice: string;
  price: string;
  recommends: string[];
  salesCount: number;
  similarProducts: IGood[];
  skus: ISku[];
  specs: ISpecs[];
  spuCode: string;
  userAddresses: IUserAddresses[];
  videoScale: number;
}

export type { IGoods };
