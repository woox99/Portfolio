
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

// ########## SECTION TITLE TEXT EFFECT #########
const letters = "abcdefghijklmnopqrstuvwxyz";

const titles = {
    'intro': document.querySelector('.introTitle'),
    'projects': document.querySelector('.projectTitle'),
    'toolbox': document.querySelector('.toolboxTitle'),
    'contact': document.querySelector('.contactTitle'),
};

const tabs = {
    'projects': document.getElementById('projects-tab'),
    'toolbox': document.getElementById('toolbox-tab'),
    'contact': document.getElementById('contact-tab'),
}

let interval = null;

// Function to handle the text effect
function startTextEffect(title) {
    
    // Make section title visibile again (starts at 0 when page is loaded)
    if(title.dataset.value == 'projects'){
        title.style.opacity = '.3';
    }
    for (const key in titles) {
        if (titles.hasOwnProperty(key)) {
            titles[key].style.display = 'none';
        }
        if(titles[key].dataset.value != 'intro'){
            // Unhighlight all tabs
            tabs[titles[key].dataset.value].style.color = '#d6e2e7';
        }
    }

    // Highlight the section tab
    const highlightedTab = title.dataset.value;
    tabs[highlightedTab].style.color = '#ffffff';

    // Display the section title
    title.style.display = 'block';
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

// Create a single Intersection Observer to trigger the text effect for different sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section");
            const title = titles[section];
            startTextEffect(title);
            // Fade in section on intersection
            setTimeout(() => {
                entry.target.style.opacity = '1';
            }, 0)
        }
        else {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                titles['projects'].style.opacity = '0';
            }, 0)
        }
    });
}, {
    threshold: .5, // Observer will trigger when threshold is reached
});

// Observe multiple sections
const sectionsToObserve = document.querySelectorAll('[data-section]');
sectionsToObserve.forEach((section) => {
    observer.observe(section);
});

// Make projects title fade out when last name is observed
const intro = document.querySelector('.title');
const introObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        setTimeout(() => {
            //Fade in intro section
            intro.style.opacity = '1';
        }, 0)
        // Unhighlight tab
        tabs['projects'].style.color = '#d6e2e7'
    }
    else{
        setTimeout(() => {
            intro.style.opacity = '0';
        }, 0)
    }
}, {
    threshold: .9, 
});

// Start observing the intro section
introObserver.observe(intro);
