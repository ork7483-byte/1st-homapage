console.log("Project Bong2 initialized.");

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Dot Logic
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursorDot) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Animate the cursor dot to follow the mouse smoothly
            cursorDot.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, {
                duration: 50,
                fill: "forwards"
            });
        });

        // Expand cursor dot on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .logo, .btn, .dropdown, .product-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('expand'));
        });
    }

    // =========================================
    // Logo Click -> Go Home
    // =========================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        });
    }

    // Mobile Accordion Logic (Independent Toggle)
    const mobileMenuTriggers = document.querySelectorAll('.mobile-menu-trigger');
    mobileMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const group = trigger.closest('.mobile-menu-item-group');
            const submenu = group.querySelector('.mobile-submenu');
            const icon = trigger.querySelector('.menu-icon');

            const isOpen = !submenu.classList.contains('hidden');

            if (!isOpen) {
                // Open current
                submenu.classList.remove('hidden');
                trigger.classList.add('active');
                group.classList.add('is-open');
                if (icon) icon.textContent = '−';
            } else {
                // Close current
                submenu.classList.add('hidden');
                trigger.classList.remove('active');
                group.classList.remove('is-open');
                if (icon) icon.textContent = '+';
            }
        });
    });

    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
            }
        });
    }

    // =========================================
    // Testimonial Slider Logic
    // =========================================
    const testimonials = [
        {
            msg: "급하게 요청드렸음에도 지속적으로 잘 대응해주셔서 감사합니다. 가격을 생각하면 탁월한 선택이었던 것 같습니다. 감사합니다!",
            name: "김**",
            role: "팀네더 CEO",
            stars: "★★★★★"
        },
        {
            msg: "친절하게 잘 설명해주시고 추가 작업건에 대한 상담도 원활하게 진행해주셔서 다음에도 또 이용하겠습니다~^^ 감사해요! 추후에 회사가 더 성장하면 더 멋있는 홈페이지 부탁드리러 오겠습니다.",
            name: "이**",
            role: "쇼핑몰 CEO",
            stars: "★★★★★"
        },
        {
            msg: "관리자 화면에 접속해서 소스를 몰라도 이미지를 바로 수정할 수 있더라구요. 저희같은 비전문가에게 딱입니다. 그리고 다들 너무 친절하게 응해 주셔서 좋았습니다.",
            name: "박**",
            role: "커피 프랜차이즈 사장",
            stars: "★★★★★"
        },
        {
            msg: "디자인이 정말 마음에 듭니다. 모바일에서도 완벽하게 작동하고, 고객 반응도 너무 좋아요. 강력 추천합니다!",
            name: "최**",
            role: "스타트업 대표",
            stars: "★★★★★"
        },
        {
            msg: "기존 홈페이지 리뉴얼을 맡겼는데, 기대 이상의 퀄리티가 나왔습니다. 유지보수도 편하고 속도도 빠르네요.",
            name: "정**",
            role: "마케팅 이사",
            stars: "★★★★★"
        }
    ];

    // =========================================
    // Testimonial Carousel (Continuously Infinite Loop)
    // =========================================
    // We use 3 sets of data: [A, B, C]. We mostly stay in set B (Center).
    // If we move into C, we snap back to B. If we move into A, we snap forward to B.
    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
    const originalCount = testimonials.length; // 5

    // Start in the middle set
    // Set A: 0-4, Set B: 5-9, Set C: 10-14
    let currentIndex = originalCount + 2; // Start at index 7 (middle of B)

    const track = document.querySelector('.slider-track');
    // Clear existing HTML cards to render from JS data
    if (track) track.innerHTML = '';

    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');
    let autoSlideInterval;

    function createCard(data) {
        const card = document.createElement('div');
        card.className = 't-card';
        card.innerHTML = `
            <p class="t-msg">"${data.msg}"</p>
            <div class="t-info">
                <strong class="t-name">${data.name}</strong>
                <span class="t-role">${data.role}</span>
                <div class="t-stars">${data.stars}</div>
            </div>
        `;
        return card;
    }

    function renderTestimonials() {
        if (!track) return;
        extendedTestimonials.forEach(data => {
            track.appendChild(createCard(data));
        });
    }

    function updateSlider(withTransition = true) {
        if (!track) return;
        const cards = Array.from(track.children);
        if (cards.length === 0) return;

        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Toggle CSS Transition
        if (withTransition) {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        } else {
            track.style.transition = 'none';
        }

        // Center the Active Card
        const containerWidth = track.parentElement.offsetWidth;
        const activeCard = cards[currentIndex];
        // Ensure calculations are safe
        if (!activeCard) return;

        const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
        const shift = (containerWidth / 2) - cardCenter;

        track.style.transform = `translateX(${shift}px)`;

        // If we disabled transition, force a reflow so the 'none' takes effect immediately
        if (!withTransition) {
            void track.offsetWidth;
        }
    }

    function nextSlide() {
        if (!track) return;

        // Boundaries: Set A (0-4), Set B (5-9), Set C (10-14)
        // If we are currently in Set C (>= 10), snap back to Set B (minus 5)
        if (currentIndex >= (originalCount * 2)) {
            currentIndex -= originalCount;
            updateSlider(false); // Instant Snap
        }

        // Use requestAnimationFrame to ensure the snap (no-transition) renders 
        // before we re-enable transition and move.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                currentIndex++;
                updateSlider(true);
            });
        });

        resetAutoSlide();
    }

    function prevSlide() {
        if (!track) return;

        // If we are currently in Set A (<= 4), snap forward to Set B (plus 5)
        if (currentIndex < originalCount) {
            currentIndex += originalCount;
            updateSlider(false); // Instant Snap
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                currentIndex--;
                updateSlider(true);
            });
        });

        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // 3 Seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn && nextBtn && track) {
        renderTestimonials(); // Initial Render
        // Need to wait for layout to correctly center
        setTimeout(() => {
            updateSlider(false); // Initial Position (No animation)
        }, 100);

        startAutoSlide();

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        window.addEventListener('resize', () => updateSlider(false));
    }

    // =========================================
    // Pricing Toggle Logic
    // =========================================
    const pricingToggle = document.getElementById('pricingToggle');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const planTitles = document.querySelectorAll('.plan-title');

    if (pricingToggle) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Remove active from all
                toggleBtns.forEach(b => b.classList.remove('active'));
                // 2. Add active to clicked
                btn.classList.add('active');

                // 3. Get plan type (A or B)
                const planType = btn.getAttribute('data-plan'); // 'A' or 'B'

                // 4. Update Sliding Background with Jelly Animation
                if (planType === 'B') {
                    // Start Morph to Right
                    pricingToggle.classList.remove('animate-left');
                    pricingToggle.classList.add('animate-right');
                    pricingToggle.classList.add('active-b');
                } else {
                    // Start Morph to Left
                    pricingToggle.classList.remove('animate-right');
                    pricingToggle.classList.add('animate-left');
                    pricingToggle.classList.remove('active-b');
                }

                // 5. Update Titles (Transition Effect)
                const titles = {
                    'A': ['베이직 상품 A', '스탠다드 상품 A', '프리미엄 상품 A'],
                    'B': ['베이직 상품 B', '스탠다드 상품 B', '프리미엄 상품 B']
                };

                // Trigger Card Pop-in Animation
                const cards = document.querySelectorAll('.pricing-card');
                cards.forEach((card, index) => {
                    card.classList.remove('card-animate', 'card-delay-1', 'card-delay-2', 'card-delay-3');
                    void card.offsetWidth; // Force Reflow
                    card.classList.add('card-animate', `card-delay-${index + 1}`);
                });

                if (planTitles.length > 0 && titles[planType]) {
                    planTitles.forEach((el, index) => {
                        // Text update logic is sync with animation start
                        if (titles[planType][index]) {
                            el.textContent = titles[planType][index];
                        }
                    });
                }
            });
        });
    }

    // =========================================
    // Scroll Animation for Feature Items & Generic Scroll Animate
    // =========================================
    const scrollItems = document.querySelectorAll('.feature-item, .scroll-animate');

    if (scrollItems.length > 0) {
        const observerOptions = {
            root: null, // viewport
            threshold: 0.2 // Trigger when 20% visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, observerOptions);

        scrollItems.forEach(item => {
            observer.observe(item);
        });
    }

    // =========================================
    // FAQ Accordion Logic
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq-answer');

            // 1. Close ALL items first (Accordion behavior)
            faqItems.forEach(others => {
                others.classList.remove('active');
                const otherAnswer = others.querySelector('.faq-answer');
                const otherIcon = others.querySelector('.faq-icon');

                if (otherAnswer) otherAnswer.style.maxHeight = null; // Collapse
                if (otherIcon) otherIcon.textContent = '+';
            });

            // 2. Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                if (answer) {
                    // 패딩까지 고려하여 충분한 높이 할당 (scrollHeight + 여유분)
                    answer.style.maxHeight = (answer.scrollHeight + 50) + "px";
                }
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.textContent = '−';
            }
        });
    });

    // =========================================
    // Image Scroll-Linked Animation (Smooth Scale)
    // =========================================
    const largeImageContainer = document.querySelector('.large-media');
    const largeImage = document.querySelector('.large-media img');

    if (largeImageContainer && largeImage) {
        function animateImageOnScroll() {
            const rect = largeImageContainer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Definition:
            // Start: When image top just enters the viewport (rect.top < viewportHeight)
            // End: When image center reaches center of viewport (approx) 
            // Let's define it simpler: Full size when image top is at 15% from top of screen.

            // Calculate progress 0.0 to 1.0
            // distance from entering bottom: (viewportHeight - rect.top)
            // total distance to target: (viewportHeight - (viewportHeight * 0.15))

            let startPoint = viewportHeight; // Enters from bottom
            let endPoint = viewportHeight * 0.2; // Target point (near top)

            let progress = (startPoint - rect.top) / (startPoint - endPoint);

            // Clamp progress between 0 and 1
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            // Interpolate values
            // Scale: 0.4 -> 1.0
            const scale = 0.4 + (0.6 * progress);

            // Border Radius: 40px -> 0px
            const borderRadius = 40 - (40 * progress);

            // Apply Styles
            largeImage.style.transform = `scale(${scale})`;
            largeImage.style.borderRadius = `${borderRadius}px`;
        }

        // Add Listeners
        window.addEventListener('scroll', animateImageOnScroll);
        window.addEventListener('resize', animateImageOnScroll);

        // Initial Call
        animateImageOnScroll();
    }

    // =========================================
    // Highlight Underline on Scroll
    // =========================================
    const highlightElement = document.querySelector('.highlight-underline');
    if (highlightElement) {
        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Play once
                    highlightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // 50% visible

        highlightObserver.observe(highlightElement);
    }



    // =========================================
    // Parallax Sphere Logic (Feature 1 Section)
    // =========================================
    const sphere = document.querySelector('.parallax-sphere');
    if (sphere) {
        // Initial style to ensure it starts localized
        sphere.style.transition = 'none';

        const handleParallax = () => {
            const rect = sphere.parentElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Only animate if the section is close to or inside the viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate how far the section has progressed through the viewport
                // (viewportHeight - rect.top) starts at 0 when the top enters the bottom of screen
                const speed = 0.1;
                const movement = (viewportHeight - rect.top) * speed;

                sphere.style.transform = `translateY(${-movement}px)`;
            }
        };

        window.addEventListener('scroll', handleParallax);
        window.addEventListener('resize', handleParallax);
        handleParallax(); // Initial call
    }

    // Global Load Handlers
    window.addEventListener('load', () => {
        if (typeof updateSlider === 'function') updateSlider();
    });

    // =========================================
    // Dropdown Hover Fix (Fail-safe)
    // =========================================
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dd => {
        const menu = dd.querySelector('.dropdown-menu');
        if (menu) {
            dd.addEventListener('mouseenter', () => {
                menu.style.display = 'block';
            });
            dd.addEventListener('mouseleave', () => {
                menu.style.display = 'none';
            });
        }
    });

    // =========================================
    // Intro Circle Parallax (New)
    // =========================================
    const introCircle = document.querySelector('.intro-bg-circle');
    // .intro 섹션을 찾아서 기준점으로 삼습니다. (없으면 body fallback)
    const introSection = document.querySelector('.intro') || document.body;

    if (introCircle) {
        const handleIntroParallax = () => {
            const rect = introSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 섹션이 화면에 보일 때만 (혹은 화면 근처일 때) 계산
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // 화면 하단에서부터 얼마나 올라왔는지 계산
                const distFromBottom = viewportHeight - rect.top;

                // 스크롤 내릴 때(distFromBottom 증가) -> 원은 위로(minus)
                // 중앙에 왔을 때(offset=0) 정확히 텍스트와 겹치도록 계산
                // 화면 중앙 - 섹션 중앙 거리
                const sectionCenterY = rect.top + (rect.height / 2);
                const viewportCenterY = viewportHeight / 2;

                // 섹션이 화면 중앙보다 아래에 있으면(entering), diff > 0
                // 섹션이 화면 중앙보다 위에 있으면(leaving), diff < 0
                const diff = sectionCenterY - viewportCenterY;

                // diff가 양수(아래)일 때 -> 원을 아래로 내려야 함(translateY +) -> 나중에 올라오도록
                // 그러나 기존 parallax는 '스크롤 내릴 때 위로' 였음.
                // 스크롤 내림 -> sectionCenterY 감소 -> diff 감소.
                // diff가 클 때(아래 있을 때) -> 원을 아래로(positive) 두었다가
                // 0이 될 때(중앙) -> 원도 0(중앙)
                // 음수가 될 때(위로 감) -> 원도 음수(위로)

                const speed = 0.3;
                const offset = diff * speed;

                introCircle.style.transform = `translateY(calc(-50% + ${offset}px))`;
            }
        };

        window.addEventListener('scroll', handleIntroParallax);
        // 초기 로드 시 위치 계산을 위해 즉시 실행
        handleIntroParallax();
    }
    // =========================================
    // Header Scroll Effect (New)
    // =========================================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) { // Approx 2 scrolls
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
