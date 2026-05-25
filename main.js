'use strict';

//Opening or closing side bar

const elementToggleFunc = (elem) => elem.classList.toggle("active");

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

testimonialsItem.forEach(item => {
    item.addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
        testimonialsModalFunc();
    });
});

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        formBtn.disabled = !form.checkValidity();
    });
});

// Contact Form Submission using EmailJS
const contactForm = document.getElementById('contact-form');

// FIX: Wrapped in null check to prevent crash if EmailJS fails to load
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Change button text to indicate sending
        const originalBtnContent = formBtn.innerHTML;
        formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
        formBtn.setAttribute('disabled', '');
        // Send email using EmailJS
        emailjs.sendForm('Mojapelo_Work_Email', 'template_i9kh0g4', this)
            .then(function() {
                alert('Message sent successfully!');
                contactForm.reset();
                formBtn.innerHTML = originalBtnContent;
                formBtn.disabled = true;
            }, function(error) {
                alert('Failed to send message. Please try again.');
                console.log('FAILED...', error);
                formBtn.innerHTML = originalBtnContent;
                formBtn.removeAttribute('disabled');
            });
    });
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(navLink => {
    navLink.addEventListener('click', function() {
        const clickedPage = this.innerHTML.toLowerCase().trim();

        pages.forEach(page => {
            const isActive = clickedPage === page.dataset.page;
            page.classList.toggle('active', isActive);
            if(isActive) window.scrollTo(0, 0);
        });

        navigationLinks.forEach(link => {
            link.classList.toggle('active', link === this);
        });
    });
});