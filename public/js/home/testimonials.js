export function initTestimonials(){
    const testimonials=[...document.querySelectorAll(".testimonial")];
    const previous=document.querySelector(".slider-arrow.prev");
    const next=document.querySelector(".slider-arrow.next");
    const dotsContainer=document.querySelector(".slider-dots");

    if(!testimonials.length||!dotsContainer)return;

    let current=0;
    let interval;

    const dots=testimonials.map((_,index)=>{
        const button=document.createElement("button");

        button.type="button";
        button.setAttribute("aria-label",`Mostrar depoimento ${index+1}`);

        button.addEventListener("click",()=>{
            show(index);
            restart();
        });

        dotsContainer.append(button);

        return button;
    });

    const show=index=>{
        current=(index+testimonials.length)%testimonials.length;

        testimonials.forEach((testimonial,itemIndex)=>{
            testimonial.classList.toggle("active",itemIndex===current);
        });

        dots.forEach((dot,itemIndex)=>{
            dot.classList.toggle("active",itemIndex===current);
        });
    };

    const restart=()=>{
        clearInterval(interval);

        interval=setInterval(()=>{
            show(current+1);
        },6000);
    };

    previous?.addEventListener("click",()=>{
        show(current-1);
        restart();
    });

    next?.addEventListener("click",()=>{
        show(current+1);
        restart();
    });

    show(0);
    restart();
}