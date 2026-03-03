import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  {
    id: 1,
    name: 'A-Line Satin Long Sleeve Wedding Dress With Lace',
    price: 32,
    originalPrice: 36,
    rating: 5,
    image: '/product_01.jpg',
    category: 'Wedding Dress',
  },
  {
    id: 2,
    name: 'Mermaid Beach Sweetheart Neck Wedding Dress',
    price: 65,
    rating: 5,
    image: '/product_02.jpg',
    category: 'Wedding Dress',
  },
  {
    id: 3,
    name: 'Beading Sweetheart Wedding Dress Long Chiffon Dresses',
    price: 55,
    originalPrice: 60,
    rating: 4,
    image: '/product_03.jpg',
    category: 'Wedding Dress',
  },
  {
    id: 4,
    name: 'Dymaisei Women\'s V Neck Boho Wedding Dress For Bride',
    price: 78,
    originalPrice: 85,
    rating: 5,
    image: '/product_04.jpg',
    category: 'Wedding Dress',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-[#C69B7B] text-[#C69B7B]' : 'text-[#D1D5DB]'}
        />
      ))}
      <span className="text-xs text-[#6B7280] ml-1">{rating}.00 out of 5</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden rounded-lg mb-4 bg-[#F0EBE6]">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm py-3 rounded-full text-sm font-medium 
                     opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
                     transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#C69B7B] hover:text-white"
        >
          <ShoppingBag size={16} />
          Quick Add
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-[#111827] line-clamp-2 group-hover:text-[#C69B7B] transition-colors">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#C69B7B]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-[#9CA3AF] line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PopularProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.products-header',
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
      gsap.fromTo('.product-card',
        { y: '8vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#F6F2EE] py-16 lg:py-24 z-40"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="products-header mb-12">
          <p className="text-micro text-[#6B7280] mb-3">POPULAR PRODUCTS</p>
          <h2 className="heading-lg font-serif text-[#111827]">Featured Products</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
