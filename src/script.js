document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mainHeader = document.getElementById('main-header');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenuOverlay.classList.remove('hidden');
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
            if (mainIntroImg) mainIntroImg.src = newSrc;
            if (mainIntroTitle) mainIntroTitle.innerText = newTitle;

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
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // --- Navigation (URL Hash Based) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const syncNavWithHash = () => {
        const currentHash = window.location.hash || '#summary';
        navLinks.forEach(link => {
            const indicator = link.querySelector('.nav-indicator');
            const text = link.querySelector('.nav-text');
            const isActive = link.getAttribute('href') === currentHash;

            if (isActive) {
                link.classList.add('active');
                if (indicator) {
                    indicator.classList.remove('w-8', 'bg-slate-600');
                    indicator.classList.add('w-16', 'bg-slate-200');
                }
                if (text) {
                    text.classList.remove('text-slate-500');
                    text.classList.add('text-slate-200');
                }
            } else {
                link.classList.remove('active');
                if (indicator) {
                    indicator.classList.remove('w-16', 'bg-slate-200');
                    indicator.classList.add('w-8', 'bg-slate-600');
                }
                if (text) {
                    text.classList.remove('text-slate-200');
                    text.classList.add('text-slate-500');
                }
            }
        });
    };

    // Observer to update URL hash silently while scrolling
    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -70% 0px', // Detects section in the top-middle area
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                // Update URL without jumping/adding to history
                history.replaceState(null, null, `#${id}`);
                syncNavWithHash();
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Listen for hash changes (clicks or manual URL change)
    window.addEventListener('hashchange', syncNavWithHash);

    // Initial sync
    syncNavWithHash();

    // Close mobile menu on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) toggleMenu(false);
        });
    });

    // Special bottom-of-page detection
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
            const lastId = sections[sections.length - 1].id;
            if (window.location.hash !== `#${lastId}`) {
                history.replaceState(null, null, `#${lastId}`);
                syncNavWithHash();
            }
        }
    });

    // --- Scroll to Top Button Logic ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('translate-y-24', 'opacity-0');
            } else {
                scrollToTopBtn.classList.add('translate-y-24', 'opacity-0');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
