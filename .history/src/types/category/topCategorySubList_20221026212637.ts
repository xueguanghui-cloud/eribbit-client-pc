interface ISubList {
  id: string;
  name: string;
  picture: string;
  children: [];
}

interface children {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  picture: string;
}

export type { ISubList };
