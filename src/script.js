document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

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

                    // Reset styles (remove active styling classes)
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
