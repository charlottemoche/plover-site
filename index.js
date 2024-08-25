document.addEventListener('DOMContentLoaded', () => {

    const thumbnails = document.getElementsByClassName('show-calendar')
    const popup = document.getElementById('popup')
    const closePopupButton = document.getElementById('close-popup')

    if (popup && thumbnails.length > 0) {
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].addEventListener('click', function () {
                popup.classList.remove('hidden')
                setTimeout(() => {
                    popup.classList.remove('opacity-0')
                    popup.classList.add('opacity-100')
                }, 50)
            })
        }

        const closePopup = () => {
            popup.classList.remove('opacity-100')
            popup.classList.add('opacity-0')
            setTimeout(() => {
                popup.classList.add('hidden')
            }, 300)
        }

        if (closePopupButton) {
            closePopupButton.addEventListener('click', closePopup)
        }

        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                closePopup()
            }
        })
    }

    function slowScrollTo(element) {
        const targetPosition = element.offsetTop
        const startPosition = window.scrollY
        const distance = targetPosition - startPosition - 60
        const duration = 1800
        let startTime = null

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const run = ease(timeElapsed, startPosition, distance, duration)
            window.scrollTo(0, run)
            if (timeElapsed < duration) requestAnimationFrame(animation)
        }

        function ease(t, b, c, d) {
            t /= d / 2
            if (t < 1) return c / 2 * t * t + b
            t--
            return -c / 2 * (t * (t - 2) - 1) + b
        }

        requestAnimationFrame(animation)
    }

    const mobileMenuOpen = document.querySelector('#mobile-menu-open')
    const mobileMenuClose = document.querySelector('#mobile-menu-close')
    const navItems = document.querySelector('#nav-items')
    const navMenuOverlay = document.querySelector('#nav-menu-overlay')
    const navLinks = document.querySelectorAll('.nav-link')

    const openMenu = () => {
        navItems.classList.remove('hidden')
        mobileMenuOpen.classList.add('hidden')
        mobileMenuClose.classList.remove('hidden')
        navMenuOverlay.classList.remove('hidden')
    }

    const closeMenu = () => {
        navItems.classList.add('hidden')
        mobileMenuOpen.classList.remove('hidden')
        mobileMenuClose.classList.add('hidden')
        navMenuOverlay.classList.add('hidden')
    }

    mobileMenuOpen.addEventListener('click', openMenu)
    mobileMenuClose.addEventListener('click', closeMenu)
    navMenuOverlay.addEventListener('click', closeMenu)

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const targetId = event.target.getAttribute('href').replace('#', '')
            const target = document.getElementById(targetId)

            closeMenu()

            slowScrollTo(target)
        })
    })

    const sections = document.querySelectorAll('.section')

    sections.forEach(section => {
        const isAboutSection = section.id === 'about'
        const appearOnScrollOptions = {
            threshold: isAboutSection ? 0.1 : 0.2
        }

        const appearOnScrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear')
                    observer.unobserve(entry.target)
                }
            })
        }, appearOnScrollOptions)

        appearOnScrollObserver.observe(section)
    })

    const slides = document.querySelectorAll('.slide')
    const rightArrow = document.querySelector('#next-button')
    const leftArrow = document.querySelector('#prev-button')
    const carouselText = document.querySelector('#carousel-text')
    const leftArrowSvgPath = leftArrow.querySelector('svg path')
    const rightArrowSvgPath = rightArrow.querySelector('svg path')
    let currentSlide = 0

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('opacity-100')
                slide.classList.remove('opacity-0')
            } else {
                slide.classList.add('opacity-0')
                slide.classList.remove('opacity-100')
            }
        })
    }

    const updateArrowStates = () => {
        if (currentSlide === 0) {
            leftArrowSvgPath.setAttribute('fill', '#D3D3D3')
            leftArrow.disabled = true
        } else {
            leftArrowSvgPath.setAttribute('fill', '#4BC0EB')
            leftArrow.disabled = false
        }

        if (currentSlide === slides.length - 1) {
            rightArrowSvgPath.setAttribute('fill', '#D3D3D3')
            rightArrow.disabled = true
        } else {
            rightArrowSvgPath.setAttribute('fill', '#4BC0EB')
            rightArrow.disabled = false
        }
    }

    const updateCarouselText = () => {
        carouselText.textContent = `${currentSlide + 1} of ${slides.length}`
    }

    rightArrow.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide = (currentSlide + 1) % slides.length
            showSlide(currentSlide)
            updateArrowStates()
            updateCarouselText()
        }
    })

    leftArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length
            showSlide(currentSlide)
            updateArrowStates()
            updateCarouselText()
        }
    })

    showSlide(currentSlide)
    updateArrowStates()
})
