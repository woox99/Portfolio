// ########## CLEAR MESSAGE FORM #########
window.onbeforeunload = () => {
    const form = document.getElementById('form');
    if (form) {
        form.reset();
    }
}



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
    if (title.dataset.value == 'projects') {
        title.style.opacity = '.3';
    }
    for (const key in titles) {
        if (titles.hasOwnProperty(key)) {
            titles[key].style.display = 'none';
        }
        if (titles[key].dataset.value != 'intro') {
            // Unhighlight all tabs
            tabs[titles[key].dataset.value].style.color = '#d6e2e7';
            tabs[titles[key].dataset.value].style.transform = 'scale(1.0)';
        }
    }

    // Highlight the section tab
    const highlightedTab = title.dataset.value;
    tabs[highlightedTab].style.color = '#ffffff';
    tabs[highlightedTab].style.transform = 'scale(1.1)';

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


// ########## INTRO OBSERVER #########
const introTags = document.getElementById('introTags');
const introObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        setTimeout(() => {
            //Fade in intro section
            intro.style.opacity = '1';
            introTags.style.opacity = '0.5';
            titles['projects'].style.opacity = '0';

        }, 0)
        // Unhighlight tab
        tabs['projects'].style.color = '#d6e2e7'
        tabs['projects'].style.transform = 'scale(1.0)'
    }
    else {
        setTimeout(() => {
            //Fade out intro section
            intro.style.opacity = '0';
            introTags.style.opacity = '0';
        }, 0)
    }
}, {
    threshold: .9,
});

// Start observing the intro section
const intro = document.querySelector('.title');
introObserver.observe(intro);


// ########## PROJECTS OBSERVER #########
const projectsObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        const section = entry.target.getAttribute('data-section');
        const title = titles[section];
        startTextEffect(title);

        setTimeout(() => {
            entry.target.style.opacity = '1';
        }, 0)
    }
    else {
        setTimeout(() => {
            entry.target.style.opacity = '0';
        }, 0)
    }
}, {
    threshold: .17,
});

// Start observing projects section
const projects = document.querySelector('.projects');
projectsObserver.observe(projects)



// ########## TOOLBOX OBSERVER #########
const toolboxObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        const section = entry.target.getAttribute('data-section');
        const title = titles[section];
        startTextEffect(title);

        setTimeout(() => {
            entry.target.style.opacity = '1';
        }, 0)
    }
    else {
        setTimeout(() => {
            entry.target.style.opacity = '0';
        }, 0)
    }
}, {
    threshold: 0.51,
});

// Start observing toolbox section
const toolbox = document.querySelector('.toolbox');
toolboxObserver.observe(toolbox)



// ########## CONTACT OBSERVER #########
const contactObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        const section = entry.target.getAttribute('data-section');
        const title = titles[section];
        startTextEffect(title);
        entry.target.style.opacity = '1';

        setTimeout(() => {
            createHexagon();
        }, 200)
    }
    else {
        setTimeout(() => {
            entry.target.style.opacity = '0';
            //Reset hexagons to non-visible
            hexagons = document.querySelectorAll('.hexa1');
            hexagons.forEach(hexagon => {
                hexagon.style.opacity = '0';
            })
        }, 0)
    }
}, {
    threshold: 0.51,
});

// Start observing contact section
const contact = document.querySelector('.contact');
contactObserver.observe(contact)



// ########## MAKE HEXAGONS RANDOMLY APPEAR #########
const createHexagon = () => {
    hexagons = document.querySelectorAll('.hexa1');

    //Create an array with random numbers between 0 and hexagons length
    const randomArr = [];
    while (randomArr.length < hexagons.length) {
        const randomNum = Math.floor(Math.random() * hexagons.length);
        if (!randomArr.includes(randomNum)) {
            randomArr.push(randomNum);
        }
    }

    let i = 0;
    //Make hexagons appear in the order of randomArr
    const interval = setInterval(() => {
        if (i < randomArr.length) {
            const randomIndex = randomArr[i];
            console.log(randomArr[i]); //debug
            hexagons[randomIndex].style.opacity = '1';
            i++;
        }
        else {
            clearInterval(interval);
        }
    }, 35)
}






