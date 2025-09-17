 // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Gallery interactions
        function animateRocket(element) {
            const icon = element.querySelector('.gallery-icon');
            icon.style.transform = 'translateY(-20px) rotate(45deg) scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            }, 600);
        }

        function generateShape(element) {
            const shapes = ['◆', '●', '▲', '■', '★', '♦', '⬟', '◉', '◈', '◇'];
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            const shapeEl = element.querySelector('#shape');
            shapeEl.textContent = randomShape;
            shapeEl.style.transform = 'rotate(360deg) scale(1.3)';
            shapeEl.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            setTimeout(() => {
                shapeEl.style.transform = 'rotate(0deg) scale(1)';
            }, 400);
        }

        function startAnimation(element) {
            const spinner = element.querySelector('#spinner');
            spinner.style.animation = 'spin 1.5s ease-in-out infinite';
            setTimeout(() => {
                spinner.style.animation = 'none';
            }, 3000);
        }

        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
                100% { transform: rotate(360deg) scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! 🚀';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    this.reset();
                }, 2000);
            }, 1200);
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.borderBottom = '1px solid rgba(79, 70, 229, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.8)';
                header.style.borderBottom = '1px solid var(--border)';
            }
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.bg-glow');
            const speed = scrolled * 0.5;
            parallax.style.transform = `rotate(${speed * 0.01}deg)`;
        });

        // Add floating elements
        function createFloatingElement() {
            const element = document.createElement('div');
            element.style.position = 'fixed';
            element.style.width = '6px';
            element.style.height = '6px';
            element.style.background = 'linear-gradient(45deg, #4F46E5, #06B6D4)';
            element.style.borderRadius = '50%';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = window.innerHeight + 'px';
            element.style.opacity = '0.6';
            
            document.body.appendChild(element);
            
            const animation = element.animate([
                { transform: 'translateY(0px)', opacity: 0.6 },
                { transform: `translateY(-${window.innerHeight + 200}px)`, opacity: 0 }
            ], {
                duration: 8000 + Math.random() * 4000,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                element.remove();
            };
        }

        // Create floating elements periodically
        setInterval(createFloatingElement, 3000);

        // Add typing effect to hero subtitle
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const subtitle = document.querySelector('.hero-subtitle');
            const originalText = subtitle.textContent;
            setTimeout(() => {
                typeWriter(subtitle, originalText, 80);
            }, 1000);
        });