import { StaticImageData } from "next/image";

declare module "*.jpeg" {
  const content: StaticImageData;
  export default content;
}
