import { IBrand } from "../brand";
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
