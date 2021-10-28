(function ($) {
  $(function () {
    //  open and close nav
    $("#navbar-toggle").click(function () {
      $("nav ul").slideToggle();
    });

    // Hamburger toggle
    $("#navbar-toggle").on("click", function () {
      this.classList.toggle("active");
    });

    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".navbar-dropdown").slideToggle("slow");

      // Close dropdown when select another dropdown
      $(".navbar-dropdown").not($(this).siblings()).hide("slow");
      e.stopPropagation();
    });

    // Click outside the dropdown will remove the dropdown class
    $("html").click(function () {
      $(".navbar-dropdown").hide();
    });
  });
})(jQuery);

const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  counter.innerHTML = 0;

  const updateCounter = () => {
    const targetCount = +counter.getAttribute("data-target");
    const startingCount = Number(counter.innerHTML);

    let incr;

    if (targetCount == 12) {
      incr = 1;
      if (startingCount < targetCount) {
        counter.innerHTML = `${Math.round(startingCount + incr)}`;
        setTimeout(updateCounter, 150);
      } else {
        counter.innerHTML = targetCount;
      }
    } else {
      incr = targetCount / 100;
      if (startingCount < targetCount) {
        counter.innerHTML = `${Math.round(startingCount + incr)}`;
        setTimeout(updateCounter, 25);
      } else {
        counter.innerHTML = `${targetCount}+`;
      }
    }
  };
  updateCounter();
});

// // Map Code
// let mapOptions = {
//   center: [18.979, 72.949],
//   zoom: 10,
// };

// let map = new L.map("map", mapOptions);

// let layer = new L.TileLayer(
//   "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// );
// map.addLayer(layer);

// let marker = new L.Marker([51.958, 9.141]);
// marker.addTo(map);

// Slider Code
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

// Arrange the slided next to one another
let c = 0;
slides.forEach((slide, index) => {
  if (index > 0) {
    c = index * 1.7;
    slide.style.left = slideWidth * c + "px";
  } else {
    slide.style.left = slideWidth * index + "px";
  }
});

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

// When I click Right, move slides to the right

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// When i click left, move slides to the left

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
