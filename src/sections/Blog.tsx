import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Write a Blog Post Your Readers Will Love in 5 Steps',
    date: 'February 9, 2025',
    author: 'Editor',
    image: '/blog_01.jpg',
  },
  {
    id: 2,
    title: '9 Content Marketing Trends and Ideas to Increase Traffic',
    date: 'February 7, 2025',
    author: 'Editor',
    image: '/blog_02.jpg',
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Marketing Strategies to Improve Sales',
    date: 'February 5, 2025',
    author: 'Editor',
    image: '/blog_03.jpg',
  },
  {
    id: 4,
    title: '50 Best Sales Questions to Determine Your Customer\'s Needs',
    date: 'February 3, 2025',
    author: 'Editor',
    image: '/blog_04.jpg',
  },
  {
    id: 5,
    title: '6 Simple Ways To Boost Your Ecommerce Conversion Rate',
    date: 'February 1, 2025',
    author: 'Editor',
    image: '/blog_05.jpg',
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <span>{post.date}</span>
          <span>•</span>
          <span>by {post.author}</span>
        </div>
        <h3 className="font-medium text-sm text-[#111827] line-clamp-2 group-hover:text-[#C69B7B] transition-colors">
          {post.title}
        </h3>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm text-[#C69B7B] font-medium hover:gap-2 transition-all"
        >
          Read More
          <ArrowRight size={14} />
        </a>
      </div>
    </article>
  );
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.blog-header',
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
      gsap.fromTo('.blog-card',
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative bg-[#F6F2EE] py-16 lg:py-24 z-100"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="blog-header text-center mb-12">
          <p className="text-micro text-[#6B7280] mb-3">FROM THE BLOG</p>
          <h2 className="heading-lg font-serif text-[#111827]">Our Latest Blog</h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
