interface IWindow {
  name: string;
  level: string;
  code: number;
  areaList?: window[];
}
interface Window {
  cityData: IWindow[];
}
