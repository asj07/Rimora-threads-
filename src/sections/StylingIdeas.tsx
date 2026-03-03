import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StylingIdeas() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const overlay = overlayRef.current;
    if (!section || !leftPanel || !rightPanel || !overlay) return;

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
        .fromTo(leftPanel,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(rightPanel,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(overlay,
          { scale: 0.92, opacity: 0, y: '6vh' },
          { scale: 1, opacity: 1, y: 0, ease: 'none' },
          0.1
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo([leftPanel, rightPanel],
          { scale: 1, opacity: 1 },
          { scale: 1.04, opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(overlay,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.70
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="styling-ideas"
      className="relative w-full h-screen overflow-hidden bg-[#F6F2EE] z-80"
    >
      <div className="section-padding h-full flex items-center justify-center">
        <div className="relative w-full h-[75vh] flex gap-4 lg:gap-8">
          {/* Left Panel */}
          <div
            ref={leftPanelRef}
            className="flex-1 h-full rounded-xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            <img
              src="/styling_ideas_left.jpg"
              alt="Traditional Wedding Style"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Panel */}
          <div
            ref={rightPanelRef}
            className="flex-1 h-full rounded-xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            <img
              src="/styling_ideas_right.jpg"
              alt="Wedding Cake Ceremony"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="bg-[#F6F2EE]/85 backdrop-blur-md rounded-xl px-8 py-6 lg:px-12 lg:py-8 text-center max-w-md pointer-events-auto">
              <h2 className="heading-md font-serif text-[#111827] mb-2">
                Creative Styling Ideas
              </h2>
              <p className="text-micro text-[#6B7280] mb-6">
                THE TREND IS MOST INTERESTED
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#111827] font-medium hover:text-[#C69B7B] transition-colors group"
              >
                discover now
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
