import { uais } from "../utils/lang";
import IosBridge from "./IosBridge";
import AndroidBridge from "./AndroidBridge";
let bridge;
if (uais("ios")) {
  bridge = new IosBridge();
}
if (uais("android")) {
  bridge = new AndroidBridge();
}
// bridge.create = name => {
//   switch (name) {
//     case "ios":
//       return new IosBridge();
//     case "andoird":
//       return new AndroidBridge();
//   }
// };
export default bridge;
