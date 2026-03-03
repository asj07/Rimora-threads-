import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Alexander Adams',
    role: 'Event Manager',
    content: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour or randomised words which don\'t look even slightly believable.',
  },
  {
    id: 2,
    name: 'Jecob N. Goeckno',
    role: 'Manager',
    content: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour or randomised words which don\'t look even slightly believable.',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.testimonials-header',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.3,
          }
        }
      );

      // Cards animation
      gsap.fromTo('.testimonial-card:first-child',
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 45%',
            scrub: 0.3,
          }
        }
      );

      gsap.fromTo('.testimonial-card:last-child',
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 45%',
            scrub: 0.3,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-[#F6F2EE] py-16 lg:py-24 z-90"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="testimonials-header text-center mb-12">
          <p className="text-micro text-[#6B7280] mb-3">OUR TESTIMONIAL</p>
          <h2 className="heading-lg font-serif text-[#111827]">Customer Reviews</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white rounded-xl p-6 lg:p-8 shadow-sm"
            >
              <Quote size={32} className="text-[#C69B7B] mb-4" strokeWidth={1.5} />
              <p className="text-[#6B7280] leading-relaxed mb-6">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F0EBE6] flex items-center justify-center">
                  <span className="font-serif font-semibold text-[#C69B7B]">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-[#111827]">{testimonial.name}</h4>
                  <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
