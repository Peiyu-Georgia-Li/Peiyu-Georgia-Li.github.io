"use strict";

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
	headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll(
	".header-left a:link, .hero-text-box a:link, .footer-link:link"
);

allLinks.forEach(function (link) {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		const href = link.getAttribute("href");

		// Scroll back to top
		if (href === "#")
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});

		// Scroll to other links
		if (href !== "#" && href.startsWith("#")) {
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({ behavior: "smooth" });
		} else {
		}

		// Close mobile naviagtion
		if (link.classList.contains("main-nav-link"))
			headerEl.classList.toggle("nav-open");
	});
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];
		console.log(ent);

		if (ent.isIntersecting === false) {
			document.body.classList.add("sticky");
		}

		if (ent.isIntersecting === true) {
			document.body.classList.remove("sticky");
		}
	},
	{
		// In the viewport
		root: null,
		threshold: 0,
		rootMargin: "-80px",
	}
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement("div");
	flex.style.display = "flex";
	flex.style.flexDirection = "column";
	flex.style.rowGap = "1px";

	flex.appendChild(document.createElement("div"));
	flex.appendChild(document.createElement("div"));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	console.log(isSupported);

	if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////
// Slider Element
const slidesBake = document.querySelectorAll(".slide-bake");
const slidesDrink = document.querySelectorAll(".slide-drink");
const slidesTravel = document.querySelectorAll(".slide-travel");
const slidesSport = document.querySelectorAll(".slide-sport");
const slidesCraft = document.querySelectorAll(".slide-craft");

const btnLeftBake = document.querySelector(".slider__btn--left_bake");
const btnRightBake = document.querySelector(".slider__btn--right_bake");
const btnLeftDrink = document.querySelector(".slider__btn--left_drink");
const btnRightDrink = document.querySelector(".slider__btn--right_drink");
const btnLeftTravel = document.querySelector(".slider__btn--left_travel");
const btnRightTravel = document.querySelector(".slider__btn--right_travel");
const btnLeftSport = document.querySelector(".slider__btn--left_sport");
const btnRightSport = document.querySelector(".slider__btn--right_sport");
const btnLeftCraft = document.querySelector(".slider__btn--left_craft");
const btnRightCraft = document.querySelector(".slider__btn--right_craft");

const hobbyBake = document.querySelector(".hobby-bake");
const hobbyDrink = document.querySelector(".hobby-drink");
const hobbyTravel = document.querySelector(".hobby-travel");
const hobbySport = document.querySelector(".hobby-sport");
const hobbyCraft = document.querySelector(".hobby-craft");

const displayBtnSlider = function (hobby, btnLeft, btnRight) {
	// Check if something is hovered
	const isHover = (e) => e.parentElement.querySelector(":hover") === e;

	// if <div hobby> is hovered, show the btnLeft and btnRight
	document.addEventListener("mousemove", function checkHover() {
		const hovered = isHover(hobby);
		if (hovered !== checkHover.hovered) {
			hovered
				? btnLeft.classList.remove("hidden") &
				  btnRight.classList.remove("hidden")
				: btnLeft.classList.add("hidden") & btnRight.classList.add("hidden");

			checkHover.hovered = hovered;
		}
	});
};

// Picture Slider Function
const sliderPicture = function (slides, btnLeft, btnRight) {
	let curSlide = 0;
	const maxSlide = slides.length;
	// Inner Functions

	const goToSlide = function (slide) {
		slides.forEach(
			// (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
			(s) => s.classList.add("hidden")
		);
		slides[curSlide].classList.remove("hidden");
	};

	// Next slide
	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
	};

	// Event handlers
	btnRight.addEventListener("click", nextSlide);
	btnLeft.addEventListener("click", prevSlide);
};

// Activate the slider functionality
sliderPicture(slidesBake, btnLeftBake, btnRightBake);
sliderPicture(slidesSport, btnLeftSport, btnRightSport);
sliderPicture(slidesDrink, btnLeftDrink, btnRightDrink);
sliderPicture(slidesTravel, btnLeftTravel, btnRightTravel);
sliderPicture(slidesCraft, btnLeftCraft, btnRightCraft);

// Activate the displayBtnSlider functionality
displayBtnSlider(hobbyBake, btnLeftBake, btnRightBake);
displayBtnSlider(hobbySport, btnLeftSport, btnRightSport);
displayBtnSlider(hobbyDrink, btnLeftDrink, btnRightDrink);
displayBtnSlider(hobbyTravel, btnLeftTravel, btnRightTravel);
displayBtnSlider(hobbyCraft, btnLeftCraft, btnRightCraft);

////////////////////////////////////////////////////////////////
// Three Slider
const threeSlider = function () {
	const slides = document.querySelectorAll(".hobby");
	const btnLeft = document.querySelector(".slider__btnLeft");
	const btnRight = document.querySelector(".slider__btnRight");
	const dotContainer = document.querySelector(".dots");

	let curSlide = 1;
	const maxSlide = slides.length;

	// Functions
	const removeDots = function () {
		document.querySelectorAll(".dots__dot").forEach((dot) => dot.remove());
	};
	const createDots = function () {
		for (let i = 0; i < slides.length - 2; i++) {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" aria-label="dots" role="presentation" data-slide="${i}"></button>`
			);
		}
	};

	const activateDot = function (slide) {
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
	};

	const goToSlide = function (slide) {
		slides.forEach((s) => s.classList.add("hidden"));

		slides[curSlide].classList.remove("hidden");
		slides[curSlide + 1].classList.remove("hidden");
		slides[curSlide - 1].classList.remove("hidden");
	};

	// Next slide
	const nextSlide = function () {
		if (curSlide === maxSlide - 2) {
			curSlide = 1;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
		activateDot(curSlide - 1);
	};

	const prevSlide = function () {
		if (curSlide === 1) {
			curSlide = maxSlide - 2;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
		activateDot(curSlide - 1);
	};

	const init = function () {
		removeDots();
		goToSlide(0);
		createDots();

		activateDot(0);
	};
	init();

	// Event handlers
	btnRight.addEventListener("click", nextSlide);
	btnLeft.addEventListener("click", prevSlide);

	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft") prevSlide();
		e.key === "ArrowRight" && nextSlide();
	});

	dotContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};

////////////////////////////////////////////////////////////////
// Two Slider
const twoSlider = function () {
	const slides = document.querySelectorAll(".hobby");
	const btnLeft = document.querySelector(".slider__btnLeft");
	const btnRight = document.querySelector(".slider__btnRight");
	const dotContainer = document.querySelector(".dots");

	let curSlide = 0;
	const maxSlide = slides.length;

	// Functions
	const removeDots = function () {
		document.querySelectorAll(".dots__dot").forEach((dot) => dot.remove());
	};
	const createDots = function () {
		for (let i = 0; i < slides.length - 1; i++) {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" aria-label="dots" role="presentation" data-slide="${i}"></button>`
			);
		}
	};

	const activateDot = function (slide) {
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
	};

	const goToSlide = function (slide) {
		slides.forEach((s) => s.classList.add("hidden"));

		slides[curSlide].classList.remove("hidden");
		slides[curSlide + 1].classList.remove("hidden");
	};

	// Next slide
	const nextSlide = function () {
		if (curSlide === maxSlide - 2) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 2;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const init = function () {
		removeDots();
		goToSlide(0);

		createDots();

		activateDot(0);
	};
	init();

	// Event handlers
	btnRight.addEventListener("click", nextSlide);
	btnLeft.addEventListener("click", prevSlide);

	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft") prevSlide();
		e.key === "ArrowRight" && nextSlide();
	});

	dotContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};

////////////////////////////////////////////////////////////////
// One Slider
const oneSlider = function () {
	const slides = document.querySelectorAll(".hobby");
	const btnLeft = document.querySelector(".slider__btnLeft");
	const btnRight = document.querySelector(".slider__btnRight");
	const dotContainer = document.querySelector(".dots");

	let curSlide = 0;
	const maxSlide = slides.length;

	// Functions
	const removeDots = function () {
		document.querySelectorAll(".dots__dot").forEach((dot) => dot.remove());
	};
	const createDots = function () {
		for (let i = 0; i < slides.length; i++) {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" aria-label="dots" role="presentation" data-slide="${i}"></button>`
			);
		}
	};

	const activateDot = function (slide) {
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
	};

	const goToSlide = function (slide) {
		slides.forEach((s) => s.classList.add("hidden"));

		slides[curSlide].classList.remove("hidden");
	};

	// Next slide
	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const init = function () {
		removeDots();
		goToSlide(0);

		createDots();

		activateDot(0);
	};
	init();

	// Event handlers
	btnRight.addEventListener("click", nextSlide);
	btnLeft.addEventListener("click", prevSlide);

	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft") prevSlide();
		e.key === "ArrowRight" && nextSlide();
	});

	dotContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};
///////////////////////////////////////////////////////////
// Media queries: when

const two = window.matchMedia("(23.5rem < width <= 37rem");
const one = window.matchMedia("(max-width: 23.5rem)");
const three = window.matchMedia("(37rem < width");
const hobbies = document.querySelector(".hobbies");
function checkMediaQueries() {
	if (one.matches) {
		hobbies.classList.add("one");
		oneSlider();
	} else {
		hobbies.classList.remove("one");
	}

	if (two.matches) {
		hobbies.classList.add("two");
		twoSlider();
	} else {
		hobbies.classList.remove("two");
	}

	if (three.matches) {
		threeSlider();
	}
}

// Initial check on page load
checkMediaQueries();

// Event listeners for media query changes
one.addEventListener("change", checkMediaQueries);
two.addEventListener("change", checkMediaQueries);
three.addEventListener("change", checkMediaQueries);

////////////////////////////////////////////////////////////////
// Show appreciation when the like button is clicked
// const replaceNumber = ()
const heartIcon = document.querySelector(".like-button .heart-icon");
const likesAmountLabel = document.querySelector(".like-button .likes-amount");

let likesAmount = 999;

heartIcon.addEventListener("click", () => {
	heartIcon.classList.toggle("liked");
	if (heartIcon.classList.contains("liked")) {
		likesAmount++;
		alert("Thanks for showing some love to my website! 🥳");
	} else {
		likesAmount--;
	}

	likesAmountLabel.innerHTML = likesAmount;
});
