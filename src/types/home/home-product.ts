import type {IGood} from "./home-good";

interface IHomeProductChild {
    id: string;
    name: string;
    layer: string;
    parent: string;
}

interface IHomeProduct {
    id: string;
    name: string;
    picture: string;
    saleInfo: string;
    goods: IGood;
    children: IHomeProductChild[];
}

export type { IHomeProduct }
