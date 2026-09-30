export function initNavigation(){
    const header=document.querySelector(".site-header");
    const toggle=document.querySelector(".menu-toggle");
    const nav=document.querySelector(".main-nav");

    if(!header)return;

    const updateHeader=()=>{
        header.classList.toggle("scrolled",window.scrollY>20);
    };

    const closeMenu=()=>{
        if(!toggle||!nav)return;
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded","false");
    };

    toggle?.addEventListener("click",()=>{
        const open=nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded",String(open));
    });

    nav?.querySelectorAll("a").forEach(link=>{
        link.addEventListener("click",closeMenu);
    });

    window.addEventListener("scroll",updateHeader,{passive:true});
    window.addEventListener("resize",()=>{
        if(window.innerWidth>760)closeMenu();
    });

    updateHeader();
}