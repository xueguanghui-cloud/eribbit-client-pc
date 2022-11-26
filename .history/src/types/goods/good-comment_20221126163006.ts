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
  content
: 
"這個煱我看中了3年，終於在大減價時下手。性價比超高！😁😁😁 今天剛剛收到，包裝精美，閃令令漂亮到冇朋友！😍😍😍 下星期會開煱！十分期待啊！"
createTime
: 
"2021-04-03 13:20:32"
id
: 
1
member
: 
{id: '10021', nickname: '兔子tony', avatar: 'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png'}
officialReply
: 
""
orderInfo
: 
{specs: Array(3), quantity: 1, createTime: '2020-10-10 19:20:20'}
pictures
: 
[]
praiseCount
: 
61
score
: 
4
tags

}

export type { ICommentInfo, IRequestParams };
