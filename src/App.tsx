import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';

import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import Categories from '@/sections/Categories';
import LatestCollection from '@/sections/LatestCollection';
import PopularProducts from '@/sections/PopularProducts';
import SaleBanner from '@/sections/SaleBanner';
import Features from '@/sections/Features';
import NewArrivals from '@/sections/NewArrivals';
import StylingIdeas from '@/sections/StylingIdeas';
import Testimonials from '@/sections/Testimonials';
import Blog from '@/sections/Blog';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';
import LiveNotification from '@/components/LiveNotification';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets from actual ScrollTrigger positions
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            // If not in a pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Categories />
        <LatestCollection />
        <PopularProducts />
        <SaleBanner />
        <Features />
        <NewArrivals />
        <StylingIdeas />
        <Testimonials />
        <Blog />
        <Newsletter />
        <Footer />
      </main>
      
      {/* Live Purchase Notification */}
      <LiveNotification />
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#F6F2EE',
            border: '1px solid rgba(17, 24, 39, 0.1)',
          },
        }}
      />
    </div>
  );
}

export default App;
