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

interface IsaleProperties {
  id: string;
  name: string;
  properties: IProperties[];
}

interface ICategoryFilter {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  picture: string;
  saleProperties: string;
}

export type {};
