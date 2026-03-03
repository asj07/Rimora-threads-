import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const badge = badgeRef.current;
    const bg = bgRef.current;
    if (!section || !content || !badge || !bg) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo('.hero-label', { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
        .fromTo('.hero-title span', { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7 }, 0.3)
        .fromTo('.hero-subtitle', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.6)
        .fromTo('.hero-cta', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.7)
        .fromTo(badge, { x: '8vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.5);

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set('.hero-title, .hero-label, .hero-subtitle, .hero-cta', { x: 0, y: 0, opacity: 1 });
            gsap.set(badge, { x: 0, y: 0, opacity: 1 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold position (already animated on load)
      // SETTLE (30-70%): Hold position
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo('.hero-title', 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo('.hero-label', 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo('.hero-subtitle', 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo('.hero-cta', 
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        )
        .fromTo(badge, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        )
        .fromTo(bg, 
          { scale: 1, y: 0 }, 
          { scale: 1.06, y: '-6vh', ease: 'none' }, 
          0.70
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_bridesmaids.jpg"
          alt="Bridesmaid Collection"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(246,242,238,0.92) 0%, rgba(246,242,238,0.55) 42%, rgba(246,242,238,0) 65%)'
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center section-padding"
      >
        <div className="max-w-xl">
          <p className="hero-label text-micro text-[#6B7280] mb-4">
            BRIDESMAID COLLECTIONS
          </p>
          <h1 className="hero-title heading-xl font-serif text-[#111827] mb-6">
            <span className="block">We invite you</span>
            <span className="block">to join our</span>
            <span className="block">wedding</span>
          </h1>
          <p className="hero-subtitle text-[#6B7280] text-base lg:text-lg mb-8 max-w-sm">
            All ready-to-ship sales are final. No returns or exchanges.
          </p>
          <a href="#categories" className="hero-cta btn-primary inline-block">
            DISCOVER NOW
          </a>
        </div>
      </div>

      {/* Floating Badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-6 right-4 lg:right-[4vw] z-20 max-w-xs"
        style={{ opacity: 0 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg">
          <p className="text-sm text-[#111827]">
            Join our newsletter and get <span className="text-[#C69B7B] font-medium">20% off</span> your first order
          </p>
        </div>
      </div>
    </section>
  );
}
