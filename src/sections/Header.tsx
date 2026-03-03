import { useState, useEffect } from 'react';
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems)();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '#products' },
    { name: 'Collections', href: '#latest-collection' },
    { name: 'Sale', href: '#sale' },
    { name: 'Lookbook', href: '#styling-ideas' },
    { name: 'Journal', href: '#blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F6F2EE]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left - Hamburger + Logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
            <a href="#" className="font-serif text-xl lg:text-2xl font-semibold tracking-tight">
              Rimora Threads
            </a>
          </div>

          {/* Center - Navigation (desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#111827] hover:text-[#C69B7B] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C69B7B] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right - Icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C69B7B] text-white text-xs rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md bg-[#F6F2EE]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag size={48} strokeWidth={1} className="mx-auto text-[#6B7280] mb-4" />
                      <p className="text-[#6B7280]">Your cart is empty</p>
                      <a href="#products" className="btn-primary inline-block mt-6">
                        Continue Shopping
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                            <p className="text-[#C69B7B] font-medium mt-1">${item.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => useCartStore.getState().updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full border border-[#111827]/20 flex items-center justify-center text-sm hover:bg-[#111827] hover:text-white transition-colors"
                              >
                                -
                              </button>
                              <span className="text-sm w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => useCartStore.getState().updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border border-[#111827]/20 flex items-center justify-center text-sm hover:bg-[#111827] hover:text-white transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => useCartStore.getState().removeFromCart(item.id)}
                            className="text-[#6B7280] hover:text-red-500 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                      <div className="border-t border-[#111827]/10 pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Subtotal</span>
                          <span className="font-serif text-xl">${useCartStore.getState().getTotalPrice().toFixed(2)}</span>
                        </div>
                        <button className="btn-primary w-full">Checkout</button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-[#F6F2EE] z-40 transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif font-medium text-[#111827] hover:text-[#C69B7B] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
