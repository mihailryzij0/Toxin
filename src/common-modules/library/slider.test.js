import { Slider } from "./slider";

describe("Slider", () => {
  let el;
  let sliderImg;
  let btnPrev;
  let btnNext;
  beforeEach(() => {
    el = document.createElement("div");
    document.body.append(el);
    el.innerHTML = `  
    <div class="slider">
      <div class="slider__wrapper">
        <div class="slider__container">
          <div class="slider__item">
          <img class="slider__img" alt="keik" />
          </div>
          <div class="slider__item">
          <img class="slider__img" alt="keik" />
          </div>
          <div class="slider__item">
          <img class="slider__img" alt="keik" />
          </div>
        </div>  
          <button class="slider__control slider__control_prev"></button>
          <button class="slider__control slider__control_next"></button>    
      </div>
    </div>
      `;
    btnPrev = el.querySelector(".slider__control_prev");
    btnNext = el.querySelector(".slider__control_next");
    sliderImg = el.querySelectorAll(".slider__img");

    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");
  });
  afterEach(() => {
    document.querySelector("div").innerHTML = null;
  });
  it("checking the initial operation of the slide", () => {
    new Slider(document.querySelector(".slider"), {
      autoplay: true,
      interval: 5000,
      doots: true,
    });
    const sliderDots = el.querySelectorAll(".slider__dot");
    const sliderImgActiv = el.querySelectorAll(".slider__img_hidden");
    expect(sliderImgActiv.length).toBe(2);
    expect(sliderDots.length).toBe(3);
    expect(sliderDots[0].classList.contains("slider__dot_activ")).toBeTruthy();
    expect(sliderImg[0].classList.contains("slider__img_hidden")).toBeFalsy();
  });
  it("checking the operation of the buttons and flipping slider", () => {
    new Slider(document.querySelector(".slider"), {
      autoplay: true,
      interval: 5000,
      doots: true,
    });
    const sliderDots = el.querySelectorAll(".slider__dot");
    btnPrev.dispatchEvent(new Event("click"));
    expect(sliderDots[2].classList.contains("slider__dot_activ")).toBeTruthy();
    expect(sliderImg[2].classList.contains("slider__img_hidden")).toBeFalsy();
    btnNext.dispatchEvent(new Event("click"));
    btnNext.dispatchEvent(new Event("click"));
    expect(sliderDots[1].classList.contains("slider__dot_activ")).toBeTruthy();
    expect(sliderImg[1].classList.contains("slider__img_hidden")).toBeFalsy();
    btnPrev.dispatchEvent(new Event("click"));
    expect(sliderDots[0].classList.contains("slider__dot_activ")).toBeTruthy();
    expect(sliderImg[0].classList.contains("slider__img_hidden")).toBeFalsy();
  });
  it("check start setInterval", () => {
    new Slider(document.querySelector(".slider"), {
      autoplay: true,
      interval: 5000,
      doots: true,
    });
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
  it("checking the work sliderDots", () => {
    new Slider(document.querySelector(".slider"), {
      autoplay: true,
      interval: 5000,
      doots: true,
    });
    const sliderDots = document.querySelectorAll(".slider__dot");
    sliderDots[2].dispatchEvent(new Event("click"));
    expect(sliderDots[2].classList.contains("slider__dot_activ")).toBeTruthy();
    expect(sliderImg[2].classList.contains("slider__img_hidden")).toBeFalsy();
  });
  // it("checking the work sliderDots", () => {
  //   new Slider(document.querySelector(".slider"), {
  //     autoplay: true,
  //     interval: 5000,
  //     doots: true,
  //   });
  //   let sliderWrapper = el.querySelector(".slider__container");
  //   sliderWrapper.dispatchEvent(new PointerEvent("pointerdown", {

  //         clientX:300

  //   }));
  //   sliderWrapper.dispatchEvent(new PointerEvent("pointermove", {

  //       clientX:400

  //   }));

  //   const sliderDots = document.querySelectorAll(".slider__dot");
  //   expect(sliderDots[0].classList.contains("slider__dot_activ")).toBeTruthy();
  //   expect(sliderImg[0].classList.contains("slider__img_hidden")).toBeFalsy();
  // });
});
