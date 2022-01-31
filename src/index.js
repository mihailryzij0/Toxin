import "./index.scss";
import "./feedBack.scss";
import "./recipePage.scss";
import "./common-modules/header/header.scss";
import "./common-modules/footer/footer.scss";
import { Slider } from "./common-modules/library/slider";
import "./common-modules/library/slider.scss";

document.addEventListener("DOMContentLoaded", () => {
  new Slider(document.querySelector(".slider"), {
    autoplay: true,
    interval: 5000,
    doots: true,
  });
});
