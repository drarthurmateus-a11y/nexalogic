import {initNavigation} from "./navigation.js";
import {initEffects} from "./effects.js";
import {initGallery} from "./gallery.js";
import {initPlans} from "./plans.js";
import {initCalculators} from "./calculators.js";
import {initTestimonials} from "./testimonials.js";
import {initContact} from "./contact.js";
import {initEnrollments} from "./enrollments.js";
import {initContent} from "./content.js";
import {
    initSettings
} from "./settings.js";

function init(){
    initNavigation();
    initEffects();
    initSettings();
    initContent();
    initGallery();
    initEnrollments();
    initPlans();
    initCalculators();
    initTestimonials();
    initContact();
}

init();