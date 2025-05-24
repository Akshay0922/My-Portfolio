// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    
    // Remove preloader from DOM after animation
    preloader.addEventListener('transitionend', () => {
        preloader.remove();
    });

    // Show all sections initially if JavaScript is disabled
    document.body.classList.add('js-enabled');
});

// Section visibility
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Section visibility handler
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    // Add no-js class to body
    document.body.classList.remove('no-js');
    
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Only observe once to maintain scroll position on refresh
                    sectionObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px'
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Section visibility with better performance
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger child animations
                const animatedElements = entry.target.querySelectorAll('.scroll-scale, .scroll-bottom, .scroll-top');
                animatedElements.forEach(el => {
                    el.classList.add('show-items');
                });
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-50px'
    });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
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

// Enhanced active menu tracking
const menuLi = document.querySelectorAll('header ul li a');
const sections = document.querySelectorAll('section');

function activeMenu() {
    let currentSection = sections.length - 1;
    const scrollPosition = window.scrollY + window.innerHeight * 0.3;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            menuLi.forEach(item => item.classList.remove("active"));
            menuLi[index].classList.add("active");
        }
    });
}

activeMenu();
window.addEventListener("scroll", activeMenu);


// STICKY NAVBAR
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
})

//TOGGLE ICON NAVBAR
// Use existing menuIcon and navlist variables from the mobile menu handling section
if (!window.menuIconInitialized) {
    window.menuIconInitialized = true;
    window.onscroll = () => {
        if (menuIcon && navlist) {
            menuIcon.classList.remove("bx-x");
            navlist.classList.remove("open");
            document.body.classList.remove('menu-open');
        }
    };
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
        contactForm.addEventListener('submit', function(e) {
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

// Scroll animations
const scrollAnimationElements = document.querySelectorAll(
    '.scroll-scale, .scroll-bottom, .scroll-top'
);

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-items');
            scrollObserver.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

scrollAnimationElements.forEach(element => {
    scrollObserver.observe(element);
});

// Enhanced Mobile Menu with touch support and better performance
const menuIcon = document.querySelector('#menu-icon');
const navlist = document.querySelector('.navlist');
let touchStartY = 0;
let touchEndY = 0;

if (menuIcon && navlist) {
    // Touch events for mobile menu
    navlist.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    navlist.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const diffY = touchStartY - touchEndY;

        // Close menu on swipe up
        if (diffY > 50) {
            menuIcon.classList.remove('bx-x');
            navlist.classList.remove('open');
            document.body.classList.remove('menu-open');
        }
    }, { passive: true });

    // Prevent menu from closing when touching menu items
    navlist.querySelectorAll('a').forEach(link => {
        link.addEventListener('touchend', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    menuIcon.classList.remove('bx-x');
                    navlist.classList.remove('open');
                    document.body.classList.remove('menu-open');
                    
                    // Smooth scroll with touch feedback
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add active state feedback
                    link.classList.add('active');
                    setTimeout(() => link.classList.remove('active'), 300);
                }
            } else {
                window.location.href = href;
            }
        });
    });
}

// Optimize images for mobile
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSlowConnection = connection && (connection.saveData || connection.effectiveType.includes('2g'));

        images.forEach(img => {
            if (isSlowConnection && img.dataset.lowres) {
                img.src = img.dataset.lowres;
            }
            
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                if (img.parentElement.classList.contains('img-box')) {
                    img.parentElement.classList.add('loaded');
                }
            });
        });
    }
}

// Enhance scroll performance
const scrollHandler = debounce(() => {
    // Update header
    if (header) {
        const shouldBeSticky = window.scrollY > 50;
        if (shouldBeSticky !== header.classList.contains('sticky')) {
            header.classList.toggle('sticky', shouldBeSticky);
        }
    }

    // Update scroll to top button
    if (scrollTopBtn) {
        const shouldBeVisible = window.scrollY > 300;
        if (shouldBeVisible !== scrollTopBtn.classList.contains('active')) {
            scrollTopBtn.classList.toggle('active', shouldBeVisible);
        }
    }

    // Update active menu items
    if (!navlist.classList.contains('open')) {
        activeMenu();
    }
}, 10);

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    optimizeImages();
    
    // Add touch feedback to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = '';
        }, { passive: true });
    });
    
    // Initialize scroll position
    scrollHandler();
});

// Attach optimized scroll handler
window.addEventListener('scroll', scrollHandler, { passive: true });

// Initialize elements on load
document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    }
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    }
    activeMenu();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
