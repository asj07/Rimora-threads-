import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SaleBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(image,
          { x: '-55vw', opacity: 0, scale: 1.05 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(text,
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo('.sale-badge',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(image,
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.70
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sale"
      className="relative w-full h-screen overflow-hidden bg-[#0B0F1C] z-50"
    >
      <div className="section-padding h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative h-[45vh] lg:h-[68vh] rounded-xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            <img
              src="/sale_banner_dress.jpg"
              alt="Sale Collection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div
            ref={textRef}
            className="lg:pl-8"
            style={{ opacity: 0 }}
          >
            <span className="sale-badge inline-block bg-[#C69B7B] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Sale 25% Off
            </span>
            <h2 className="heading-lg font-serif text-white mb-6">
              <span className="block">Luxe satin & luxe chiffon</span>
              <span className="block">made to order</span>
              <span className="block">bridesmaids dress</span>
            </h2>
            <p className="text-white/70 text-base lg:text-lg mb-8 max-w-md leading-relaxed">
              Through the month of May, take 25% off made-to-order bridesmaids dresses. Book a fitting or order online—ships in 4–6 weeks.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#C69B7B] font-medium hover:text-white transition-colors group"
            >
              discover now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
