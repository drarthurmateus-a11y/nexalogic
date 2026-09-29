/* =========================================================
   FORÇA PRIME
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. MENU MOBILE
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("open");

    });

}


/* =========================================================
   2. FECHAR MENU AO CLICAR EM UM LINK
   ========================================================= */

const menuLinks = document.querySelectorAll(".main-nav a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (mainNav) {
            mainNav.classList.remove("open");
        }

    });

});


/* =========================================================
   3. HEADER MUDANDO AO ROLAR A PÁGINA
   ========================================================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   4. ANIMAÇÃO DOS ELEMENTOS AO APARECEREM
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   5. CONTADORES
   ========================================================= */

const counters = document.querySelectorAll("[data-counter]");

function animateCounter(element) {

    const target = Number(element.dataset.counter);

    let current = 0;

    const duration = 1500;

    const steps = 60;

    const increment = target / steps;

    const interval = duration / steps;

    const counterAnimation = setInterval(function () {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(counterAnimation);

        }

        element.textContent = Math.floor(current);

    }, interval);

}

const counterObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            const counter = entry.target;

            if (!counter.dataset.started) {

                counter.dataset.started = "true";

                animateCounter(counter);

            }

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(function (counter) {

    counterObserver.observe(counter);

});


/* =========================================================
   6. GALERIA
   ========================================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const imageModal = document.querySelector("#image-modal");

const modalImage = document.querySelector("#modal-image");

const modalClose = document.querySelector(".modal-close");


galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image = item.querySelector("img");

        if (!image || !imageModal || !modalImage) {
            return;
        }

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        imageModal.classList.add("show");

        document.body.classList.add("modal-open");

    });

});


if (modalClose && imageModal) {

    modalClose.addEventListener("click", function () {

        imageModal.classList.remove("show");

        document.body.classList.remove("modal-open");

    });

}


/* =========================================================
   7. FECHAR GALERIA CLICANDO FORA DA IMAGEM
   ========================================================= */

if (imageModal) {

    imageModal.addEventListener("click", function (event) {

        if (event.target === imageModal) {

            imageModal.classList.remove("show");

            document.body.classList.remove("modal-open");

        }

    });

}


/* =========================================================
   8. FECHAR MODAIS COM A TECLA ESC
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (imageModal) {

            imageModal.classList.remove("show");

        }

        if (planModal) {

            planModal.classList.remove("show");

        }

        document.body.classList.remove("modal-open");

    }

});


/* =========================================================
   9. MODAL DOS PLANOS
   ========================================================= */

const planButtons = document.querySelectorAll(".plan-select");

const planModal = document.querySelector("#plan-modal");

const selectedPlan = document.querySelector("#selected-plan");

const planWhatsapp = document.querySelector("#plan-whatsapp");

const planClose = document.querySelector(".plan-close");


planButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const planName = button.dataset.plan;

        if (!planModal) {
            return;
        }

        if (selectedPlan) {

            selectedPlan.textContent = planName;

        }

        if (planWhatsapp) {

            const message =
                "Olá! Tenho interesse em me matricular no plano " +
                planName +
                " da Força Prime.";

            planWhatsapp.href =
                "https://wa.me/5521999990000?text=" +
                encodeURIComponent(message);

        }

        planModal.classList.add("show");

        document.body.classList.add("modal-open");

    });

});


if (planClose && planModal) {

    planClose.addEventListener("click", function () {

        planModal.classList.remove("show");

        document.body.classList.remove("modal-open");

    });

}


/* =========================================================
   10. FECHAR MODAL DO PLANO CLICANDO FORA
   ========================================================= */

if (planModal) {

    planModal.addEventListener("click", function (event) {

        if (event.target === planModal) {

            planModal.classList.remove("show");

            document.body.classList.remove("modal-open");

        }

    });

}


/* =========================================================
   11. CALCULADORA DE IMC
   ========================================================= */

const calculateImc = document.querySelector("#calculate-imc");

const imcPeso = document.querySelector("#imc-peso");

const imcAltura = document.querySelector("#imc-altura");

const imcResult = document.querySelector("#imc-result");


if (calculateImc) {

    calculateImc.addEventListener("click", function () {

        const peso = Number(imcPeso.value);

        const altura = Number(imcAltura.value);


        if (peso <= 0 || altura <= 0) {

            imcResult.textContent =
                "Digite seu peso e sua altura corretamente.";

            return;

        }


        const imc = peso / (altura * altura);


        let classification = "";


        if (imc < 18.5) {

            classification = "Abaixo do peso";

        } else if (imc < 25) {

            classification = "Peso normal";

        } else if (imc < 30) {

            classification = "Sobrepeso";

        } else if (imc < 35) {

            classification = "Obesidade grau I";

        } else if (imc < 40) {

            classification = "Obesidade grau II";

        } else {

            classification = "Obesidade grau III";

        }


        imcResult.innerHTML =
            "Seu IMC é <strong>" +
            imc.toFixed(1) +
            "</strong><br>" +
            classification;

    });

}


/* =========================================================
   12. CALCULADORA DE CALORIAS
   ========================================================= */

const calculateCalories =
    document.querySelector("#calculate-calories");

const calAge =
    document.querySelector("#cal-age");

const calWeight =
    document.querySelector("#cal-weight");

const calHeight =
    document.querySelector("#cal-height");

const calSex =
    document.querySelector("#cal-sex");

const calActivity =
    document.querySelector("#cal-activity");

const calResult =
    document.querySelector("#cal-result");


if (calculateCalories) {

    calculateCalories.addEventListener("click", function () {

        const age = Number(calAge.value);

        const weight = Number(calWeight.value);

        const height = Number(calHeight.value);

        const sex = calSex.value;

        const activity = Number(calActivity.value);


        if (
            age <= 0 ||
            weight <= 0 ||
            height <= 0 ||
            !sex ||
            !activity
        ) {

            calResult.textContent =
                "Preencha todos os campos corretamente.";

            return;

        }


        let basal;


        /*
         * Fórmula de Mifflin-St Jeor
         */

        if (sex === "male") {

            basal =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) +
                5;

        } else {

            basal =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) -
                161;

        }


        const calories = basal * activity;


        calResult.innerHTML =
            "Estimativa de gasto diário: " +
            "<strong>" +
            Math.round(calories) +
            " kcal</strong>";

    });

}


/* =========================================================
   13. SLIDER DE DEPOIMENTOS
   ========================================================= */

const testimonials =
    document.querySelectorAll(".testimonial");

const previousButton =
    document.querySelector(".slider-arrow.prev");

const nextButton =
    document.querySelector(".slider-arrow.next");

const sliderDots =
    document.querySelector(".slider-dots");


let currentTestimonial = 0;


function showTestimonial(index) {

    if (testimonials.length === 0) {
        return;
    }


    if (index >= testimonials.length) {

        currentTestimonial = 0;

    } else if (index < 0) {

        currentTestimonial = testimonials.length - 1;

    } else {

        currentTestimonial = index;

    }


    testimonials.forEach(function (testimonial, i) {

        testimonial.classList.remove("active");

        if (i === currentTestimonial) {

            testimonial.classList.add("active");

        }

    });


    if (sliderDots) {

        const dots =
            sliderDots.querySelectorAll("button");


        dots.forEach(function (dot, i) {

            dot.classList.remove("active");

            if (i === currentTestimonial) {

                dot.classList.add("active");

            }

        });

    }

}


if (previousButton) {

    previousButton.addEventListener("click", function () {

        showTestimonial(currentTestimonial - 1);

    });

}


if (nextButton) {

    nextButton.addEventListener("click", function () {

        showTestimonial(currentTestimonial + 1);

    });

}


/* =========================================================
   14. CRIAR BOLINHAS DO SLIDER
   ========================================================= */

if (sliderDots && testimonials.length > 0) {

    testimonials.forEach(function (_, index) {

        const dot = document.createElement("button");

        dot.type = "button";

        if (index === 0) {

            dot.classList.add("active");

        }

        dot.addEventListener("click", function () {

            showTestimonial(index);

        });

        sliderDots.appendChild(dot);

    });

}


/* =========================================================
   15. FORMULÁRIO DE CONTATO
   ========================================================= */

const contactForm =
    document.querySelector("#contact-form");

const formSuccess =
    document.querySelector(".form-success");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.querySelector("#name").value.trim();

        const phone =
            document.querySelector("#phone").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const goal =
            document.querySelector("#goal").value;

        const message =
            document.querySelector("#message").value.trim();


        if (
            name === "" ||
            phone === "" ||
            email === "" ||
            goal === "" ||
            message === ""
        ) {

            alert("Preencha todos os campos.");

            return;

        }


        if (formSuccess) {

            formSuccess.textContent =
                "Mensagem enviada com sucesso! Em breve entraremos em contato.";

            formSuccess.classList.add("show");

        }


        contactForm.reset();

    });

}


/* =========================================================
   16. MÁSCARA DE TELEFONE
   ========================================================= */

const phoneInput =
    document.querySelector("#phone");


if (phoneInput) {

    phoneInput.addEventListener("input", function () {

        let value = phoneInput.value;

        value = value.replace(/\D/g, "");

        value = value.substring(0, 11);


        if (value.length >= 11) {

            value =
                "(" +
                value.substring(0, 2) +
                ") " +
                value.substring(2, 7) +
                "-" +
                value.substring(7, 11);

        } else if (value.length >= 7) {

            value =
                "(" +
                value.substring(0, 2) +
                ") " +
                value.substring(2, 6) +
                "-" +
                value.substring(6);

        } else if (value.length >= 3) {

            value =
                "(" +
                value.substring(0, 2) +
                ") " +
                value.substring(2);

        }


        phoneInput.value = value;

    });

}


/* =========================================================
   17. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */

const currentYear =
    document.querySelector("#current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   18. INICIAR SLIDER
   ========================================================= */

showTestimonial(0);


/* =========================================================
   FIM DO JAVASCRIPT
   ========================================================= */