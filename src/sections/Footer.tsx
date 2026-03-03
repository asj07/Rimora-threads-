import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    title: 'Find Product',
    links: ['Return Policy', 'Terms Of Use', 'Privacy', 'Sitemap'],
  },
  {
    title: 'Product Support',
    links: ['Redeem Voucher', 'Services', 'Checkout', 'About Us'],
  },
  {
    title: 'Services',
    links: ['Careers', 'Our Stories', 'Report Abuse', 'Payment'],
  },
  {
    title: 'About Us',
    links: ['Help', 'Checkout', 'My Account', 'Locality'],
  },
  {
    title: 'Payment',
    links: ['Privacy Policy', 'Contact Us', 'Order Status'],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-column',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.3,
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0B0F1C] py-12 lg:py-16 z-120"
    >
      <div className="section-padding">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerLinks.map((column, index) => (
            <div key={index} className="footer-column">
              <h4 className="font-medium text-white mb-4 text-sm">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-[#C69B7B] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2026 Rimora Threads - WordPress Theme by{' '}
              <a href="#" className="text-[#C69B7B] hover:underline">
                Avanam
              </a>
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/60 hover:text-[#C69B7B] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-[#C69B7B] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
