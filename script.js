// ########## SCROLL TO SECTION #########
document.addEventListener("DOMContentLoaded", function () {
    // Add smooth scrolling behavior to links with the "smooth-scroll" class
    const smoothScrollLinks = document.querySelectorAll(".smooth-scroll");

    smoothScrollLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default link behavior

            const targetId = this.getAttribute("href").substring(1); // Get the target element's ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll smoothly to the target element
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });
});

// ########## SLIDER #########
const sliderTop = document.getElementById("sliderTop");
const sliderBottom = document.getElementById("sliderBottom");

const calculateSlider = (totalHeight, viewWidth, viewHeight) => {

    // Calculate the new height based on the scroll position
    const newTopHeight = (viewHeight - 0.19 * viewWidth) * window.scrollY / (totalHeight - viewHeight) + 0.02 * viewWidth;
    const newBottomHeight = (viewHeight - 0.19 * viewWidth) * (1 - window.scrollY / (totalHeight - viewHeight)) + 0.02 * viewWidth;

    // Set the new height for the .slider element
    sliderTop.style.height = `${newTopHeight}px`;
    sliderBottom.style.height = `${newBottomHeight}px`;
}

// Listen for the scroll event on the window
window.addEventListener("scroll", () => {
    calculateSlider(document.documentElement.scrollHeight, window.innerWidth, window.innerHeight);
});

// Listen for the screen resize event on the window
window.addEventListener("resize", () => {
    calculateSlider(document.documentElement.scrollHeight, window.innerWidth, window.innerHeight);
})

// ########## SECTION projectTitle TEXT EFFECT #########
const letters = "abcdefghijklmnopqrstuvwxyz";
const projectTitle = document.querySelector('.projectTitle');
let interval = null;

// Function to handle the text effect
function startTextEffect(title) {
    console.log('test');
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        title.innerText = title.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return title.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= title.dataset.value.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 20);
}

// Create an Intersection Observer to trigger the text effect when the "projects" container enters the viewport
const projectsContainer = document.querySelector('.projects');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startTextEffect(projectTitle);
        observer.unobserve(projectsContainer); // Stop observing once the effect starts
    }
}, {
    threshold: 0.5, // You can adjust this threshold value as needed
});

// Start observing the "projects" container
observer.observe(projectsContainer);