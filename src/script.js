document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mainHeader = document.getElementById('main-header');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenuOverlay.classList.remove('hidden');
            // Small delay to trigger transition
            setTimeout(() => {
                mobileMenuOverlay.classList.add('opacity-100');
                mainHeader.classList.remove('-translate-x-full');
            }, 10);
            document.body.classList.add('overflow-hidden');
        } else {
            mobileMenuOverlay.classList.remove('opacity-100');
            mainHeader.classList.add('-translate-x-full');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300);
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', () => toggleMenu(true));
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', () => toggleMenu(false));
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', () => toggleMenu(false));

    // --- Introduction Video Switcher ---
    const mainIntroImg = document.getElementById('intro-main-img');
    const mainIntroTitle = document.getElementById('intro-main-title');
    const introThumbs = document.querySelectorAll('.intro-thumb');

    introThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.getAttribute('data-src');
            const newTitle = thumb.getAttribute('data-title');

            // Update main preview
            if (mainIntroImg) mainIntroImg.src = newSrc;
            if (mainIntroTitle) mainIntroTitle.innerText = newTitle;

            // Update thumbnail styles
            introThumbs.forEach(t => {
                const innerDiv = t.querySelector('div');
                const img = t.querySelector('img');
                innerDiv.classList.remove('border-teal-400', 'shadow-lg');
                innerDiv.classList.add('border-slate-700');
                if (img) img.classList.add('opacity-60');
            });

            const activeDiv = thumb.querySelector('div');
            const activeImg = thumb.querySelector('img');
            activeDiv.classList.remove('border-slate-700');
            activeDiv.classList.add('border-teal-400', 'shadow-lg');
            if (activeImg) activeImg.classList.remove('opacity-60');

            // Scroll the thumbnail to the center of the container
            thumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        });
    });

    // --- Navigation & Scrollspy Logic ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Close menu when clicking a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                toggleMenu(false);
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const indicator = link.querySelector('.nav-indicator');
                    const text = link.querySelector('.nav-text');

                    // Reset styles
                    if (indicator) {
                        indicator.classList.remove('w-16', 'bg-slate-200');
                        indicator.classList.add('w-8', 'bg-slate-600');
                    }
                    if (text) {
                        text.classList.remove('text-slate-200');
                        text.classList.add('text-slate-500');
                    }
                });

                // Add active class to the current section's link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);

                if (activeLink) {
                    activeLink.classList.add('active');
                    const indicator = activeLink.querySelector('.nav-indicator');
                    const text = activeLink.querySelector('.nav-text');

                    // Apply active styling
                    if (indicator) {
                        indicator.classList.remove('w-8', 'bg-slate-600');
                        indicator.classList.add('w-16', 'bg-slate-200');
                    }
                    if (text) {
                        text.classList.remove('text-slate-500');
                        text.classList.add('text-slate-200');
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
