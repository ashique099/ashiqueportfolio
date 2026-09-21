/* ==========================================================================
   Md Ashique - Modern Digital Marketing Portfolio Logic (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Navigation
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('open');
            });
        });
    }

    // 3. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function highlightActiveNav() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightActiveNav, { passive: true });

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Skills Category Filtering
    const filterTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab states
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedCategory = tab.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCat === selectedCategory) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 6. Interactive ROI & ROAS Simulator
    const spendRange = document.getElementById('spend-range');
    const cvrRange = document.getElementById('cvr-range');
    const dealRange = document.getElementById('deal-range');

    const spendVal = document.getElementById('spend-val');
    const cvrVal = document.getElementById('cvr-val');
    const dealVal = document.getElementById('deal-val');

    const projectedRevenue = document.getElementById('projected-revenue');
    const projectedRoas = document.getElementById('projected-roas');
    const projectedLeads = document.getElementById('projected-leads');
    const projectedCpa = document.getElementById('projected-cpa');

    function formatINR(number) {
        return '₹' + Math.round(number).toLocaleString('en-IN');
    }

    function calculateGrowth() {
        if (!spendRange || !cvrRange || !dealRange) return;

        const spend = parseFloat(spendRange.value);
        const cvr = parseFloat(cvrRange.value); // In percent (e.g. 3.5)
        const deal = parseFloat(dealRange.value);

        // Update Label badges
        spendVal.textContent = formatINR(spend);
        cvrVal.textContent = cvr.toFixed(1) + '%';
        dealVal.textContent = formatINR(deal);

        // Market-grounded formula:
        // Average CPC in local health/education is approx ₹42 with optimized quality score
        const averageCpc = 42;
        const totalClicks = spend / averageCpc;
        
        // Leads/Inquiries generated
        const estimatedInquiries = Math.max(1, Math.round(totalClicks * (cvr / 100)));
        
        // Conversions to closed patient/student enrollments (typically ~35% of qualified inquiries)
        const closedCustomers = Math.max(1, Math.round(estimatedInquiries * 0.35));
        
        // Gross revenue generated
        const grossRevenue = closedCustomers * deal;
        
        // ROAS (Gross Revenue / Ad Spend)
        const roas = (grossRevenue / spend).toFixed(2);
        
        // Effective CPA (Spend / Qualified Inquiries)
        const effectiveCpa = Math.round(spend / estimatedInquiries);

        // Update DOM
        projectedRevenue.textContent = formatINR(grossRevenue);
        projectedRoas.textContent = `${roas}x`;
        projectedLeads.textContent = `${estimatedInquiries}`;
        projectedCpa.textContent = formatINR(effectiveCpa);
    }

    if (spendRange && cvrRange && dealRange) {
        [spendRange, cvrRange, dealRange].forEach(input => {
            input.addEventListener('input', calculateGrowth);
        });
        calculateGrowth(); // Initial calculation
    }

    // 7. Resume Modal Controls
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const bannerResumeBtn = document.getElementById('banner-resume-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalPrintBtn = document.getElementById('modal-print-btn');

    function openModal() {
        if (resumeModal) {
            resumeModal.classList.add('open');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
    if (bannerResumeBtn) bannerResumeBtn.addEventListener('click', openModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    if (modalPrintBtn) {
        modalPrintBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Close on outer backdrop click
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
            closeModal();
        }
    });

    // 8. Copy to Clipboard Toast
    const toast = document.getElementById('toast');
    const copyBtns = [
        document.getElementById('copy-email-btn'),
        document.getElementById('copy-email-btn-2')
    ];

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    copyBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = btn.getAttribute('data-email') || 'ashiquektr099@gmail.com';
                navigator.clipboard.writeText(email).then(() => {
                    showToast('✓ Email copied to clipboard: ' + email);
                }).catch(() => {
                    // Fallback
                    showToast('Email: ' + email);
                });
            });
        }
    });

    // 9. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending Inquiry...</span>';
            submitBtn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;

            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry regarding <em>${service}</em> has been received. Md Ashique will connect with you at <strong>${email}</strong> shortly.`;
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback';
                }, 8000);
            }, 900);
        });
    }

    // 10. Stat Counter Animation on Scroll
    const kpiNumbers = document.querySelectorAll('.kpi-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                // Animate bars
                document.querySelectorAll('.trend-bars .bar').forEach((bar, idx) => {
                    setTimeout(() => {
                        bar.style.transition = 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, idx * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    const heroMetricsCard = document.querySelector('.hero-metrics-card');
    if (heroMetricsCard) {
        statsObserver.observe(heroMetricsCard);
    }

    // 11. Interactive Mouse-Responsive Points Canvas
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const mouse = {
            x: null,
            y: null,
            radius: 140
        };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1.2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 5;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.isEmerald = Math.random() > 0.6;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.isEmerald ? 'rgba(16, 185, 129, 0.75)' : 'rgba(6, 182, 212, 0.75)';
                ctx.fill();
            }

            update() {
                // Check canvas edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * this.density * 0.4;
                        const directionY = forceDirectionY * force * this.density * 0.4;

                        // Repel points smoothly away from cursor
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                // Normal drift
                this.x += this.vx;
                this.y += this.vy;

                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            // Scale number of particles based on screen width
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
            const count = Math.min(Math.max(numberOfParticles, 45), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            const connectDistance = 115;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectDistance) {
                        const opacity = (1 - (distance / connectDistance)) * 0.22;
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                        ctx.lineWidth = 0.75;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Interactive connection line directly to mouse cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const mdx = mouse.x - particles[a].x;
                    const mdy = mouse.y - particles[a].y;
                    const mDistance = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mDistance < mouse.radius) {
                        const mOpacity = (1 - (mDistance / mouse.radius)) * 0.65;
                        ctx.strokeStyle = `rgba(16, 185, 129, ${mOpacity})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        animateParticles();
    }
});
