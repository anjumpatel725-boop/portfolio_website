/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");


/* =========================================
   UPDATE THEME ICON
========================================= */

function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";


    /* LIGHT MODE */

    if (currentTheme === "light") {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Dark mode"
        );

    }


    /* DARK MODE */

    else {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Light mode"
        );

    }

}


/* =========================================
   LOAD SAVED THEME
========================================= */

const currentSavedTheme =
    localStorage.getItem("theme") || "dark";


if (currentSavedTheme === "light") {

    document.documentElement.setAttribute(
        "data-theme",
        "light"
    );

} else {

    document.documentElement.removeAttribute(
        "data-theme"
    );

}


updateThemeIcon();


/* =========================================
   TOGGLE THEME
========================================= */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );

        const newTheme =
            currentTheme === "light"
                ? "dark"
                : "light";


        if (newTheme === "light") {

            document.documentElement.setAttribute(
                "data-theme",
                "light"
            );

        } else {

            document.documentElement.removeAttribute(
                "data-theme"
            );

        }


        localStorage.setItem(
            "theme",
            newTheme
        );


        updateThemeIcon();

    });

}


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");


        const icon =
            menuToggle.querySelector("i");


        if (!icon) return;


        /* MENU OPEN */

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

            menuToggle.setAttribute(
                "title",
                "Close menu"
            );

        }


        /* MENU CLOSED */

        else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuToggle.setAttribute(
                "title",
                "Open menu"
            );

        }

    });

}


/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

const navigationItems =
    document.querySelectorAll(".nav-links a");


navigationItems.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navLinks || !menuToggle) return;


        navLinks.classList.remove("active");


        const icon =
            menuToggle.querySelector("i");


        if (!icon) return;


        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");


        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

        menuToggle.setAttribute(
            "title",
            "Open menu"
        );

    });

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


/* =========================================
   FALLBACK FOR OLD BROWSERS
========================================= */

else {

    revealElements.forEach((element) => {

        element.classList.add("active");

    });

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    /* SHOW / HIDE BUTTON */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    /* SCROLL TO TOP */

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


if (
    sections.length > 0 &&
    navItems.length > 0
) {

    window.addEventListener("scroll", () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach((link) => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION STYLE
========================================= */

const activeNavStyle =
    document.createElement("style");


activeNavStyle.textContent = `

    .nav-links a.active {
        color: var(--primary);
    }

    .nav-links a.active::after {
        width: 100%;
    }

    @media (max-width: 768px) {

        .nav-links a.active::after {
            display: none;
        }

        .nav-links a.active {
            background: rgba(0, 229, 255, 0.05);
            color: var(--primary);
        }

    }

`;


document.head.appendChild(activeNavStyle);


/* =========================================
   KEYBOARD ACCESSIBILITY
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (
            navLinks &&
            menuToggle &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove("active");


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }


            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuToggle.setAttribute(
                "title",
                "Open menu"
            );

        }

    }

});


/* =========================================
   PAGE LOADED
========================================= */

document.documentElement.classList.add(
    "js-loaded"
);