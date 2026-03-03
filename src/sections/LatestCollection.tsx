import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LatestCollection() {
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
          { x: '-50vw', opacity: 0, scale: 1.04 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(text,
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo('.latest-title span',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(image,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo('.latest-cta',
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="latest-collection"
      className="relative w-full h-screen overflow-hidden bg-[#F6F2EE] z-30"
    >
      <div className="section-padding h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative h-[50vh] lg:h-[72vh] rounded-xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            <img
              src="/latest_collection_dress.jpg"
              alt="Latest Collection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div
            ref={textRef}
            className="lg:pl-8"
            style={{ opacity: 0 }}
          >
            <p className="text-micro text-[#6B7280] mb-4">LATEST COLLECTION</p>
            <h2 className="latest-title heading-lg font-serif text-[#111827] mb-6">
              <span className="block">Spring Summer</span>
              <span className="block">Effortless Chic</span>
              <span className="block">Lifestyle</span>
            </h2>
            <p className="text-[#6B7280] text-base lg:text-lg mb-8 max-w-md leading-relaxed">
              A curated drop of breathable silhouettes and modern romance—designed for real celebrations and the moments in between.
            </p>
            <a
              href="#"
              className="latest-cta inline-flex items-center gap-2 text-[#111827] font-medium hover:text-[#C69B7B] transition-colors group"
            >
              Read more
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
