let slidePosition = 0;

// Collect some slides from our HTML
const slides = document.querySelectorAll(".carousel_item"); // This is different than the web tutorial
const slidesAsArray = Array.from(slides);
const totalSlides = slidesAsArray.length;

// Collect our buttons

const prev = document.querySelector("button.prev");
const next = document.querySelector(".next");

console.log(slidesAsArray);

// Functions
function updateSlidePosition(slides_private) {
  slides_private.forEach((slide) => {
    console.log(slide)
    slide.classList.remove("carousel_item--visible");
    slide.classList.add("carousel_item--hidden");
    console.log(slide)
  });
  slides_private[slidePosition].classList.add("carousel_item--visible");
  console.log(slides[slidePosition]);
}

// Add some event listeners
prev.addEventListener("click", (event) => {
    console.log(totalSlides)
  event.preventDefault(); // these help us with form submissions later
  console.log("prev");
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition -= 1;
  }
  updateSlidePosition(slides);
});

next.addEventListener("click", (event) => {
  event.preventDefault(); // these help us with form submissions later
  console.log("next");
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition += 1;
  }
  updateSlidePosition(slides);
});
