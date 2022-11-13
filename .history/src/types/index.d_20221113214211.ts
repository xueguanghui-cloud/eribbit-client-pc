import {} from "./city";
interface Window {
  cityData: {
    name: string;
    level: string;
    code: number;
    areaList?: window[];
  }[];
}
