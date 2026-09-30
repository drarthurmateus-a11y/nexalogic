import {initNavigation} from "./navigation.js";
import {initEffects} from "./effects.js";
import {initGallery} from "./gallery.js";
import {initPlans} from "./plans.js";
import {initCalculators} from "./calculators.js";
import {initTestimonials} from "./testimonials.js";
import {initContact} from "./contact.js";

function init(){
    initNavigation();
    initEffects();
    initGallery();
    initPlans();
    initCalculators();
    initTestimonials();
    initContact();
}

init();