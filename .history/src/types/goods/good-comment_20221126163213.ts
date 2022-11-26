interface IRequestParams {
  page: number;
  pageSize: number;
  hasPicture: boolean | null;
  tag: string | null;
  sortField: string | null;
}

interface ICommentInfo {
  evaluateCount: number;
  hasPictureCount: number;
  praisePercent: number;
  salesCount: number;
  tags: { tagCount: number; title: string }[];
}

interface ICommentList {
  content: string;
  createTime: string;
  id: number;
  member: {
    id: "10021";
    nickname: "兔子tony";
    avatar: "http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png";
  };
  officialReply: string;
  orderInfo: {
    specs: { name: string; nameValue: string }[];
    quantity: number;
    createTime: string;
  };
  pictures: string[];
  praiseCount: number;
  score: number;
  tags: string[];
}

export type { ICommentInfo, IRequestParams };
