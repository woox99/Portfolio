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

// ##### NAV BAR STICK SCROLL EFFECT #####
const stickNavBar = () => {
    const navBar = document.querySelector('.nav')
    const mainContent = document.querySelector('.main-content')
    const navBarY = navBar.getBoundingClientRect().top;
    const mainContentY = mainContent.getBoundingClientRect().top;

    console.log(navBarY)
    if(navBarY <= 0){
        navBar.style.position = 'fixed';
        navBar.style.top = '0';
        navBar.style.bottom = 'unset';
        navBar.style.background = 'linear-gradient(180deg, #030014 40%, #03001400)';
    }
    console.log(mainContentY - navBarY )
    if(mainContentY - navBarY > 71){
        navBar.style.position = 'absolute';
        navBar.style.top = 'unset';
        navBar.style.bottom = '0';
        navBar.style.background = 'none';
    }

    // const navBar = document.querySelector('.nav')
    // const navBarY = navBar.getBoundingClientRect().top;
    // const navBarYVW = navBarY / window.innerWidth * 100;
    // const mainContent = document.querySelector('.main-content')
    // const mainContentY = mainContent.getBoundingClientRect().top;
    // const mainContentYVW = mainContentY / window.innerWidth * 100;
    // if(navBarYVW <= 0){
    //     navBar.style.position = 'fixed';
    //     navBar.style.top = '0';
    //     navBar.style.background = 'linear-gradient(180deg, #030014 40%, #03001400)';
    // }
    // if(mainContentYVW - navBarYVW >= 7.1){
    //     navBar.style.position = 'absolute';
    //     navBar.style.top = 'unset';
    //     navBar.style.bottom = '0';
    //     navBar.style.background = 'none';
    // }
}


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
    // Calculates the new height of scroll bar
    calculateSlider(document.documentElement.scrollHeight, window.innerWidth, window.innerHeight);
    stickNavBar();
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
            tabs[titles[key].dataset.value].style.color = '#ffffff';
            tabs[titles[key].dataset.value].style.transform = 'scale(1.0)';
        }
    }

    // Highlight the section tab
    // const highlightedTab = title.dataset.value;
    // tabs[highlightedTab].style.color = '#32f5a9';
    // tabs[highlightedTab].style.transform = 'scale(1.1)';

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
            // satellite1.style.opacity = '1';
            // satellite2.style.opacity = '1';


        }, 0)
        // Unhighlight tab
        tabs['projects'].style.color = '#ffffff'
        // tabs['projects'].style.transform = 'scale(1.0)'
    }
    else {
        setTimeout(() => {
            //Fade out intro section
            intro.style.opacity = '0';
            // satellite1.style.opacity = '0';
            // satellite2.style.opacity = '0';
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

        // Change tab color
        tabs['projects'].style.color = '#32f5a9'
    }
    else {
        setTimeout(() => {
            entry.target.style.opacity = '0';
        }, 0)
    }
}, {
    // threshold = percent of section within the screen to trigger execution
    threshold: .13,
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

        // Change tab color
        tabs['toolbox'].style.color = '#00a4ed'
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

        // Change tab color
        tabs['contact'].style.color = '#00a4ed'
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









