// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');

    // Remove preloader from DOM after animation
    preloader.addEventListener('transitionend', () => {
        preloader.remove();
    });
});


// Existing animation code
let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
const textInterval = setInterval(changeText, 3000);



// Services Read More functionality
document.addEventListener('DOMContentLoaded', function () {
    // About section read more functionality
    const aboutReadMoreBtn = document.querySelector('#about .read-more-btn');
    const aboutReadMoreText = document.querySelector('#about .read-more-text');
    const aboutSection = document.querySelector('#about');

    if (aboutReadMoreBtn && aboutReadMoreText) {
        aboutReadMoreText.style.display = 'none'; // Initially hide the text

        // Reset function for about section
        const resetAboutSection = () => {
            aboutReadMoreText.style.display = 'none';
            aboutReadMoreText.style.opacity = '0';
            aboutReadMoreBtn.textContent = 'Read More';
        };

        // Create intersection observer for about section
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    resetAboutSection();
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

        // Start observing about section
        if (aboutSection) {
            aboutObserver.observe(aboutSection);
        }

        aboutReadMoreBtn.addEventListener('click', function () {
            const isExpanded = aboutReadMoreText.style.display === 'block';
            aboutReadMoreText.style.display = isExpanded ? 'none' : 'block';
            aboutReadMoreText.style.opacity = isExpanded ? '0' : '1';
            this.textContent = isExpanded ? 'Read More' : 'Read Less';

            // Smooth transition
            if (!isExpanded) {
                aboutReadMoreText.style.animation = 'fadeIn 0.5s ease-in-out';
            }
        });
    }


    // Services read more functionality
    const servicesSection = document.querySelector('#services');
    const readMoreBtns = document.querySelectorAll('.service-box .read-more-btn');


    // Reset function for all service boxes
    const resetServiceBoxes = () => {
        document.querySelectorAll('.service-box').forEach(box => {
            box.classList.remove('expanded');
            const txt = box.querySelector('.read-more-text');
            const btn = box.querySelector('.read-more-btn');
            if (txt) txt.classList.remove('show');
            if (btn) btn.textContent = 'Read More';
        });
    };


    // Create intersection observer for services section
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                resetServiceBoxes();
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible


    // Start observing services section
    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const serviceBox = this.closest('.service-box');
            const readMoreText = serviceBox.querySelector('.read-more-text');
            const isExpanded = readMoreText.classList.contains('show');

            // First collapse all other boxes
            document.querySelectorAll('.service-box').forEach(box => {
                if (box !== serviceBox) {
                    box.classList.remove('expanded');
                    const txt = box.querySelector('.read-more-text');
                    const btn = box.querySelector('.read-more-btn');
                    if (txt) txt.classList.remove('show');
                    if (btn) btn.textContent = 'Read More';
                }
            });

            // Toggle current box
            serviceBox.classList.toggle('expanded');
            readMoreText.classList.toggle('show');
            this.textContent = isExpanded ? 'Read More' : 'Read Less';
        });
    });
});



// SKILLS CIRCLE //

const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked')
    }
})



// PORTFOLIO MixItUp
document.addEventListener('DOMContentLoaded', function () {
    try {
        const portfolioGallery = document.querySelector('.portfolio-gallery');
        const filterButtons = document.querySelectorAll('.fillter-buttons .button');

        // Initialize MixItUp
        var mixer = mixitup(portfolioGallery, {
            selectors: {
                target: '.port-box',
                control: '.button'
            },
            animation: {
                duration: 500,
                nudge: false,
                reverseOut: true,
                effects: 'fade scale(0.85)',
                easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
            },
            callbacks: {
                onMixStart: function () {
                    // Add initial show class to all items
                    document.querySelectorAll('.port-box').forEach(box => {
                        box.classList.add('show');
                    });
                },
                onMixClick: function (state, originalEvent) {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    originalEvent.target.classList.add('active');
                }
            }
        });

        // Add click handler for filter buttons with smooth transitions
        const filterBtns = document.querySelectorAll('.fillter-buttons .button');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Add scale effect
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });

        // Initialize with 'all' filter and trigger animation
        mixer.filter('all');

        // Add hover effect for portfolio items
        const portBoxes = document.querySelectorAll('.port-box');
        portBoxes.forEach(box => {
            box.addEventListener('mouseenter', function () {
                this.style.transform = 'perspective(1000px) rotateY(10deg) translateY(-5px) translateZ(20px)';
            });

            box.addEventListener('mouseleave', function () {
                this.style.transform = 'perspective(1000px) rotateY(0) translateY(0) translateZ(0)';
            });
        });

    } catch (error) {
        console.warn('Error initializing mixitup:', error);
    }
});

// ACTIVE MENU

let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu() {
    let currentSection = section.length - 1;
    for (let i = 0; i < section.length; i++) {
        if (window.scrollY + 97 < section[i].offsetTop) {
            currentSection = i - 1;
            break;
        }
    }
    menuLi.forEach(item => item.classList.remove("active"));
    if (currentSection >= 0) {
        menuLi[currentSection].classList.add("active");
    }
}

activeMenu();
window.addEventListener("scroll", activeMenu);


// STICKY NAVBAR
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
})

//TOGGLE ICON NAVABAR
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

//PARALLAX
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => {
    observer.observe(el);
});

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => {
    observer.observe(el);
});

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => {
    observer.observe(el);
});

// Scroll to top functionality
const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Removed parallax effect to allow scroll scale animations to work properly

// Form label animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Skills animation trigger
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-bar .bar span');
const circleBoxes = document.querySelectorAll('.circle');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reset and restart skill bar animations
            skillBars.forEach(bar => {
                bar.style.animation = 'none';
                bar.offsetHeight; // Trigger reflow
                bar.style.animation = null;
            });

            // Reset and restart circle animations
            circleBoxes.forEach(circle => {
                const dots = circle.querySelectorAll('.points');
                dots.forEach(dot => {
                    dot.style.animation = 'none';
                    dot.offsetHeight; // Trigger reflow
                    dot.style.animation = null;
                });
            });
        }
    });
}, {
    threshold: 0.3
});

skillsSection && skillsObserver.observe(skillsSection);

// Section reveal observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.formBtn .btn');
        const inputs = contactForm.querySelectorAll('input, textarea');

        // Form validation and feedback
        inputs.forEach(input => {
            // Create error message element
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            input.parentElement.appendChild(errorMsg);

            input.addEventListener('invalid', function (e) {
                e.preventDefault();
                input.classList.add('invalid');

                // Set custom error message based on validation type
                if (input.validity.valueMissing) {
                    errorMsg.textContent = `${input.getAttribute('name')} is required`;
                } else if (input.validity.typeMismatch) {
                    errorMsg.textContent = `Please enter a valid ${input.getAttribute('name')}`;
                }
                errorMsg.style.display = 'block';

                // Shake animation
                input.style.animation = 'none';
                input.offsetHeight;
                input.style.animation = 'shake 0.5s ease-in-out';
            });

            input.addEventListener('input', function () {
                if (input.validity.valid) {
                    input.classList.remove('invalid');
                    errorMsg.style.display = 'none';
                }
            });
        });

        // Handle form submission
        contactForm.addEventListener('submit', function (e) {
            if (contactForm.checkValidity()) {
                submitBtn.textContent = 'Sending...';
                submitBtn.classList.add('sending');
                submitBtn.disabled = true;
            }
        });
    }
});

// Image loading animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});
