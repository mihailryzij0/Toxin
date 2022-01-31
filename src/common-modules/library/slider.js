export class Slider {
  constructor(selector, settings) {
    this.sliderWrapper = selector.querySelector(".slider__wrapper");
    this.sliderContainer = selector.querySelector(".slider__container");
    this.sliderImg = selector.querySelectorAll(".slider__img");
    this.btnPrev = selector.querySelector(".slider__control_prev");
    this.btnNext = selector.querySelector(".slider__control_next");
    this.sliderControl = selector.querySelectorAll(".slider__control");
    this.dots;
    this.idInterval;
    this.current = 0;
    this.config = {
      autoplay: false,
      interval: 5000,
      doots: true,
    };

    Object.keys(settings).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this.config, key)) {
        this.config[key] = settings[key];
      }
    });
    this.createDots();
    this.addListener();
    this.autoplay();
    this.addСlasses();
  }

  createDots() {
    if (this.config.doots === true) {
      let listDoots = `<ul class= 'slider__dots-box' >`;
      for (let i = 0; i < this.sliderImg.length; i += 1) {
        listDoots += `<li style= "flex-basis:${+`${
          100 / this.sliderImg.length - 1
        }`}% " class= 'slider__dot'></li>`;
      }
      listDoots += `</li>`;
      this.sliderWrapper.insertAdjacentHTML("beforeend", listDoots);
      this.dots = this.sliderWrapper.querySelectorAll(".slider__dot");
    }
  }

  addListener() {
    this.btnNext.addEventListener("click", () => {
      clearInterval(this.idInterval);
      this.sliderNext();
    });
    this.btnPrev.addEventListener("click", () => {
      clearInterval(this.idInterval);
      this.sliderPrev();
    });
    for (let index = 0; index < this.dots.length; index += 1) {
      this.dots[index].addEventListener("click", () => {
        this.current = index;
        this.addСlasses();
      });
    }
    let x1 = null;
    this.sliderContainer.addEventListener("pointerdown", (event) => {
      x1 = event.clientX;
      this.sliderContainer.addEventListener(
        "pointermove",
        (e) => {
          if (!x1) {
            return;
          }
          const x2 = e.clientX;
          x1 > x2 ? this.sliderNext() : this.sliderPrev();
          clearInterval(this.idInterval);
          x1 = null;
        },
        { once: true }
      );
    });
  }

  autoplay() {
    if (this.config.autoplay === true) {
      this.idInterval = setInterval(() => {
        this.sliderNext();
      }, this.config.interval);
    }
  }

  sliderNext() {
    if (this.current + 1 === this.sliderImg.length) {
      this.current = 0;
    } else {
      this.current += 1;
    }
    this.addСlasses();
  }

  sliderPrev() {
    if (this.current <= 0) {
      this.current = this.sliderImg.length - 1;
    } else {
      this.current -= 1;
    }
    this.addСlasses();
  }

  addСlasses() {
    this.sliderImg.forEach((item) => {
      item.classList.add("slider__img_hidden");
    });
    this.sliderImg[this.current].classList.remove("slider__img_hidden");
    this.dots.forEach((item) => {
      item.classList.remove("slider__dot_activ");
    });
    this.dots[this.current].classList.add("slider__dot_activ");
  }
}
