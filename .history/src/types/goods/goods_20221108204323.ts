import type { IBrand } from "../brand";

interface Icategorie {
  id: "109318003";
  layer: 2;
  name: "【年末狂欢季】";
  parent: { id: "1010000"; name: "服饰"; layer: 1; parent: null };
}

interface IGoods {
  brand: IBrand;
  categories: [];
  collectCount: number;
  commentCount: number;
  desc: string;
  details: {};
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
