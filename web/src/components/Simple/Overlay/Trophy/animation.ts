import gsap from 'gsap';

export const playAnimation = (el: HTMLElement, onEnd: () => void) => {
  gsap
    .timeline()
    .to(el, {opacity: 1, scale: 1, ease: 'back.out', duration: 0.7})
    .to(el, {duration: 0.5, rotate: '-5deg', ease: 'power2.inOut'})
    .to(el, {duration: 0.5, rotate: '5deg', ease: 'power2.inOut'})
    .to(el, {
      opacity: 0,
      scale: 0,
      rotate: '0deg',
      ease: 'back.in',
      duration: 0.7,
    })
    .then(onEnd);
};
