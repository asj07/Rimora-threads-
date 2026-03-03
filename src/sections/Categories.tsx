import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 1, name: 'Wedding Dress', image: '/cat_wedding_dress.jpg', size: 'large' },
  { id: 2, name: 'Wedding Ring', image: '/cat_wedding_ring.jpg', size: 'small' },
  { id: 3, name: 'Accessories', image: '/cat_accessories.jpg', size: 'small' },
  { id: 4, name: 'Bouquet', image: '/cat_bouquet.jpg', size: 'small' },
  { id: 5, name: 'Special Occasion', image: '/cat_special_occasion.jpg', size: 'small' },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.cat-title',
        { y: 24, opacity: 0 },
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

      // Large card animation
      gsap.fromTo('.cat-card-large',
        { x: '-10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.3,
          }
        }
      );

      // Small cards animation
      gsap.fromTo('.cat-card-small',
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
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

      // Label pills animation
      gsap.fromTo('.cat-label',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 40%',
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
      id="categories"
      className="relative bg-[#F6F2EE] py-16 lg:py-24 z-20"
    >
      <div className="section-padding">
        {/* Title */}
        <div className="cat-title text-center mb-12">
          <p className="text-micro text-[#6B7280] mb-3">SHOP BY CATEGORY</p>
          <h2 className="heading-lg font-serif text-[#111827]">Our Collection</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {/* Large Card - Wedding Dress */}
          <div className="cat-card-large col-span-2 row-span-2 relative group cursor-pointer">
            <div className="relative h-full min-h-[400px] lg:min-h-[520px] rounded-xl overflow-hidden">
              <img
                src={categories[0].image}
                alt={categories[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="cat-label absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#111827]">
                  {categories[0].name}
                </span>
              </div>
            </div>
          </div>

          {/* Small Cards */}
          {categories.slice(1).map((category) => (
            <div
              key={category.id}
              className="cat-card-small relative group cursor-pointer"
            >
              <div className="relative h-[180px] lg:h-[240px] rounded-xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="cat-label absolute bottom-3 left-3 right-3">
                  <span className="inline-block bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#111827]">
                    {category.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
