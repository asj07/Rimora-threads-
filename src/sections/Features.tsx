import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, Shield, Tag, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    description: 'Lorem Ipsum is simply dummy text of printing typesetting industry.',
  },
  {
    icon: Shield,
    title: 'Money Back Guarantee',
    description: 'Lorem Ipsum is simply dummy text of printing typesetting industry.',
  },
  {
    icon: Tag,
    title: 'Offers And Discounts',
    description: 'Lorem Ipsum is simply dummy text of printing typesetting industry.',
  },
  {
    icon: Headphones,
    title: '24/7 Support Services',
    description: 'Lorem Ipsum is simply dummy text of printing typesetting industry.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F2EE] py-16 lg:py-20 z-60"
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item text-center lg:text-left"
            >
              <feature.icon
                size={32}
                strokeWidth={1.5}
                className="mx-auto lg:mx-0 text-[#C69B7B] mb-4"
              />
              <h3 className="font-serif text-lg font-semibold text-[#111827] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
