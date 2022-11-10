import type { IBrand } from "../brand";

interface Icategorie {
  id: string;
  layer: number;
  name: string;
  parent: Icategorie;
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
  evaluationInfo: null;
  hotByDay: [];
  id: string;
  inventory: number;
  isCollect: null;
  isPreSale: false;
  mainPictures: [];
  mainVideos: [];
  name: string;
  oldPrice: string;
  price: string;
  recommends: null;
  salesCount: number;
  similarProducts: [];
  skus: [];
  specs: [];
  spuCode: string;
  userAddresses: null;
  videoScale: 1;
}

export type { IGoods };
