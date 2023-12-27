// Download resume
function downloadResume() {
    fetch('Janulewicz_Garett_Developer_Resume.pdf')
        .then(response => response.blob())
        .then(blob => {
            // Create a temporary anchor element
            var a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);
            
            // Create a URL for the blob
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'Janulewicz_Garett_Developer_Resume.pdf';
            
            // Trigger a click event on the anchor to initiate the download
            a.click();
            
            // Clean up
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
}



// ##### SATELLITE ANIMATION ######
// const satellite1 = document.querySelector(".satellite1");
// const satellite2 = document.querySelector(".satellite2");
// document.addEventListener("DOMContentLoaded", function () {
//     let rotationAngle1 = 0;
//     let rotationAngle2 = 0;
    
//     function rotateImage() {
//         rotationAngle1 += 0.1;
//         rotationAngle2 -= 0.4;
//         satellite1.style.transform = `rotate(${rotationAngle1}deg)`;
//         satellite2.style.transform = `rotate(${rotationAngle2}deg)`;
//     }
    
//     setInterval(rotateImage, 40);
// });


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
// const introTags = document.getElementById('introTags');
const introObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        setTimeout(() => {
            //Fade in intro section
            intro.style.opacity = '1';
            titles['projects'].style.opacity = '0';
            satellite1.style.opacity = '1';
            satellite2.style.opacity = '1';


        }, 0)
        // Unhighlight tab
        tabs['projects'].style.color = '#d6e2e7'
        tabs['projects'].style.transform = 'scale(1.0)'
    }
    else {
        setTimeout(() => {
            //Fade out intro section
            intro.style.opacity = '0';
            satellite1.style.opacity = '0';
            satellite2.style.opacity = '0';
        }, 0)
    }
}, {
    threshold: .51,
});

// Start observing the intro section
const intro = document.querySelector('.intro');
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
    }
    else {
        setTimeout(() => {
            entry.target.style.opacity = '0';
        }, 0)
    }
}, {
    threshold: 0.61,
});

// Start observing contact section
const contact = document.querySelector('.contact');
contactObserver.observe(contact)









