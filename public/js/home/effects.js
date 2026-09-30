function initReveal(){
    const elements=document.querySelectorAll(".reveal");

    if(!elements.length)return;

    if(!("IntersectionObserver" in window)){
        elements.forEach(element=>element.classList.add("visible"));
        return;
    }

    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting)return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },{
        threshold:.15
    });

    elements.forEach(element=>observer.observe(element));
}

function animateCounter(element){
    const target=Number(element.dataset.counter);

    if(!Number.isFinite(target))return;

    const duration=1200;
    const start=performance.now();

    const update=now=>{
        const progress=Math.min((now-start)/duration,1);
        const value=Math.floor(target*progress);

        element.textContent=value.toLocaleString("pt-BR");

        if(progress<1){
            requestAnimationFrame(update);
            return;
        }

        element.textContent=target.toLocaleString("pt-BR");
    };

    requestAnimationFrame(update);
}

function initCounters(){
    const counters=document.querySelectorAll("[data-counter]");

    if(!counters.length)return;

    if(!("IntersectionObserver" in window)){
        counters.forEach(animateCounter);
        return;
    }

    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting)return;

            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    },{
        threshold:.5
    });

    counters.forEach(counter=>observer.observe(counter));
}

export function initEffects(){
    initReveal();
    initCounters();
}