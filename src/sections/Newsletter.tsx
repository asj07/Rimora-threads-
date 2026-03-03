import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.newsletter-left',
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
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

      gsap.fromTo('.newsletter-right',
        { x: '4vw', opacity: 0 },
        {
          x: 0,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F2EE] py-16 lg:py-20 z-110"
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Newsletter */}
          <div className="newsletter-left">
            <h3 className="heading-md font-serif text-[#111827] mb-4">
              Our Newsletter
            </h3>
            <p className="text-[#6B7280] mb-6">
              Subscribe to our latest newsletter to get news about special discounts.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-[#111827]/20 bg-white focus:outline-none focus:border-[#C69B7B] transition-colors"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>

          {/* Store Information */}
          <div className="newsletter-right">
            <h3 className="heading-md font-serif text-[#111827] mb-4">
              Store Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#C69B7B] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[#6B7280] text-sm">
                  60 29th Street San Francisco, 507-Union Trade Center, United States America - 94110
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#C69B7B] flex-shrink-0" strokeWidth={1.5} />
                <div className="text-sm text-[#6B7280]">
                  <p>(+91)-0123-456-789</p>
                  <p>(+91) 9876-543-210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#C69B7B] flex-shrink-0" strokeWidth={1.5} />
                <p className="text-[#6B7280] text-sm">demo@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
