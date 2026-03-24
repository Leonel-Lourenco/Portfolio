import { useState, useRef, useEffect } from 'react';

interface StoreExample {
  id: string;
  name: string;
  description: string;
  annotations: Array<{ text: string; side: 'after' }>;
}

const examples: StoreExample[] = [
  {
    id: 'ember-wick-home',
    name: 'Ember Wick - Homepage',
    description: 'Handcrafted soy candles',
    annotations: [
      { text: 'AI-generated warm amber color palette', side: 'after' },
      { text: 'Lifestyle hero with cozy ambiance', side: 'after' },
      { text: 'Scent collection showcase', side: 'after' },
    ],
  },
  {
    id: 'ember-wick-products',
    name: 'Ember Wick - Products',
    description: 'Product catalog page',
    annotations: [
      { text: 'Auto-categorized by scent family', side: 'after' },
      { text: 'Size/burn time variant system', side: 'after' },
      { text: 'Customer review integration', side: 'after' },
    ],
  },
  {
    id: 'ember-wick-about',
    name: 'Ember Wick - About',
    description: 'Brand story page',
    annotations: [
      { text: 'Founder story section', side: 'after' },
      { text: 'Sustainability messaging', side: 'after' },
      { text: 'Process showcase gallery', side: 'after' },
    ],
  },
];

export default function OttoSlider() {
  const [activeExample, setActiveExample] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('mousemove', handleGlobalMouseMove);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  const currentExample = examples[activeExample];
  
  // Scroll handlers for page preview
  const handleScrollUp = () => setScrollPosition(Math.max(0, scrollPosition - 100));
  const handleScrollDown = () => setScrollPosition(Math.min(300, scrollPosition + 100));

  return (
    <div className="flex flex-col">
      {/* Example Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {examples.map((example, index) => (
          <button
            key={example.id}
            onClick={() => {
              setActiveExample(index);
              setSliderPosition(50);
            }}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeExample === index
                ? 'bg-white text-primary border-b-2 border-accent'
                : 'text-gray-500 hover:text-primary hover:bg-gray-100'
            }`}
          >
            {example.name}
          </button>
        ))}
      </div>

      {/* Scroll Controls */}
      <div className="flex items-center justify-center gap-2 py-2 bg-gray-100 border-b border-gray-200">
        <button 
          onClick={handleScrollUp}
          disabled={scrollPosition === 0}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <span className="text-xs text-gray-500">Scroll to see full page</span>
        <button 
          onClick={handleScrollDown}
          disabled={scrollPosition >= 300}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative h-[400px] overflow-hidden cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Before Image (Uglified Template) */}
        <div className="absolute inset-0 bg-gray-100">
          <div 
            className="w-full transition-transform duration-300"
            style={{ transform: `translateY(-${scrollPosition}px)` }}
          >
            {/* Ugly Header - clashing colors, bad spacing */}
            <div className="bg-lime-400 p-2 flex items-center justify-between border-b-4 border-red-500">
              <div className="text-purple-800 font-bold text-xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                🕯️ ember wick candles 🕯️
              </div>
              <div className="flex gap-1">
                <span className="text-xs bg-yellow-300 px-2 py-1 text-red-600 underline">HOME</span>
                <span className="text-xs bg-yellow-300 px-2 py-1 text-red-600 underline">SHOP</span>
                <span className="text-xs bg-yellow-300 px-2 py-1 text-red-600 underline">ABOUT</span>
              </div>
            </div>
            
            {/* Ugly Hero - stretched image placeholder, bad text */}
            <div className="bg-gradient-to-r from-pink-300 via-orange-200 to-cyan-300 p-4">
              <div className="bg-gray-400 w-full h-28 flex items-center justify-center text-white text-xs">
                [low-res-image.jpg - 72dpi]
              </div>
              <div className="mt-2 text-center">
                <div className="text-2xl text-red-600 font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>
                  WELCOME TO OUR STORE!!!
                </div>
                <div className="text-xs text-blue-800 mt-1">click here to shop now &gt;&gt;&gt;</div>
              </div>
            </div>
            
            {/* Ugly Products - inconsistent cards */}
            <div className="bg-white p-3">
              <div className="text-lg text-center mb-2 text-green-700 underline">Our Products:</div>
              <div className="flex gap-2 justify-center flex-wrap">
                <div className="w-24 border-2 border-dashed border-gray-400 p-2 bg-gray-50">
                  <div className="w-full h-16 bg-gray-300 mb-1"></div>
                  <div className="text-xs">candle 1</div>
                  <div className="text-red-600 text-xs">$15.00</div>
                </div>
                <div className="w-28 border border-black p-1 bg-yellow-50">
                  <div className="w-full h-20 bg-gray-300 mb-1"></div>
                  <div className="text-xs font-bold">CANDLE #2</div>
                  <div className="text-green-800 text-sm">$12</div>
                </div>
                <div className="w-20 border-4 border-purple-500 p-2">
                  <div className="w-full h-14 bg-gray-300 mb-1"></div>
                  <div className="text-xs italic">candle three</div>
                  <div className="text-xs">15 dollars</div>
                </div>
              </div>
            </div>
            
            {/* Ugly Footer */}
            <div className="bg-blue-900 p-3 text-center">
              <div className="text-yellow-400 text-xs">© 2024 ember wick | email: info@emberwick.com</div>
              <div className="text-white text-xs mt-1">made with website builder</div>
            </div>
            
            {/* More scrollable content */}
            <div className="bg-gray-200 p-4 text-center">
              <div className="text-gray-600 text-sm">Additional page content...</div>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-20 h-20 bg-gray-400"></div>
                <div className="w-20 h-20 bg-gray-400"></div>
                <div className="w-20 h-20 bg-gray-400"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium shadow-lg z-20">
            BEFORE: Raw Template
          </div>
        </div>

        {/* After Image (Otto Generated Store) - revealed by slider */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div 
            className="w-full bg-gradient-to-b from-amber-50 to-orange-50 transition-transform duration-300"
            style={{ transform: `translateY(-${scrollPosition}px)` }}
          >
            {/* Beautiful Header */}
            <div className="bg-stone-900 px-6 py-4 flex items-center justify-between">
              <div className="text-amber-100 font-semibold text-lg tracking-wide">
                Ember Wick
              </div>
              <div className="flex gap-6">
                <span className="text-amber-100/80 text-sm hover:text-amber-100 cursor-pointer transition-colors">Shop</span>
                <span className="text-amber-100/80 text-sm hover:text-amber-100 cursor-pointer transition-colors">Collections</span>
                <span className="text-amber-100/80 text-sm hover:text-amber-100 cursor-pointer transition-colors">Our Story</span>
              </div>
            </div>
            
            {/* Beautiful Hero */}
            <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 p-8">
              <div className="bg-gradient-to-br from-amber-200 to-orange-200 w-full h-32 rounded-lg flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="text-amber-800/60 text-4xl mb-2">🕯️</div>
                  <span className="text-amber-900/50 text-sm">Hero Image</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h1 className="text-3xl font-light text-stone-800 tracking-wide">Handcrafted Soy Candles</h1>
                <p className="text-stone-600 mt-2 text-sm">Thoughtfully made with natural ingredients</p>
                <button className="mt-4 px-6 py-2 bg-stone-900 text-amber-100 rounded-full text-sm hover:bg-stone-800 transition-colors">
                  Shop Collection
                </button>
              </div>
            </div>
            
            {/* Beautiful Products */}
            <div className="bg-white px-6 py-8">
              <h2 className="text-center text-stone-800 text-lg mb-6 font-light tracking-wide">Featured Scents</h2>
              <div className="flex gap-4 justify-center">
                <div className="w-28 group cursor-pointer">
                  <div className="w-full h-28 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-3 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-2xl">🕯️</span>
                  </div>
                  <div className="text-sm text-stone-800 font-medium">Warm Vanilla</div>
                  <div className="text-amber-700 text-sm">$28.00</div>
                </div>
                <div className="w-28 group cursor-pointer">
                  <div className="w-full h-28 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-3 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-2xl">🕯️</span>
                  </div>
                  <div className="text-sm text-stone-800 font-medium">Cedar & Sage</div>
                  <div className="text-amber-700 text-sm">$32.00</div>
                </div>
                <div className="w-28 group cursor-pointer">
                  <div className="w-full h-28 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg mb-3 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-2xl">🕯️</span>
                  </div>
                  <div className="text-sm text-stone-800 font-medium">Rose Garden</div>
                  <div className="text-amber-700 text-sm">$28.00</div>
                </div>
              </div>
            </div>
            
            {/* Beautiful Footer */}
            <div className="bg-stone-900 px-6 py-6">
              <div className="flex justify-between items-center">
                <div className="text-amber-100/60 text-xs">© 2024 Ember Wick Candles</div>
                <div className="flex gap-4">
                  <span className="text-amber-100/60 text-xs hover:text-amber-100 cursor-pointer">Instagram</span>
                  <span className="text-amber-100/60 text-xs hover:text-amber-100 cursor-pointer">Pinterest</span>
                </div>
              </div>
            </div>
            
            {/* More scrollable content */}
            <div className="bg-amber-50 p-6 text-center">
              <h3 className="text-stone-800 font-light mb-4">Why Choose Ember Wick?</h3>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-2 flex items-center justify-center">🌿</div>
                  <div className="text-xs text-stone-600">Natural Soy</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-2 flex items-center justify-center">✨</div>
                  <div className="text-xs text-stone-600">Hand-poured</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-2 flex items-center justify-center">♻️</div>
                  <div className="text-xs text-stone-600">Eco-friendly</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded text-sm font-medium shadow-lg z-20">
            AFTER: Otto Generated ✨
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '-8px' }}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Annotations */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-600 mb-3">AI-Generated Improvements:</div>
        <div className="flex flex-wrap gap-2">
          {currentExample.annotations.map((annotation, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {annotation.text}
            </span>
          ))}
        </div>
      </div>

      {/* Testimonials Section - Before/After */}
      <div className="border-t border-gray-200">
        <div className="p-4 bg-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Customer Testimonials</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Uglified Testimonial (Before) */}
            <div className="relative">
              <div className="absolute -top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded z-10">
                BEFORE
              </div>
              <div 
                className="bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 p-4 border-4 border-dashed border-purple-500"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-10 h-10 bg-gray-400 rounded-sm flex items-center justify-center text-white text-xs">
                    ???
                  </div>
                  <div>
                    <div className="text-red-600 font-bold text-sm underline">HAPPY CUSTOMER!!!</div>
                    <div className="text-blue-800 text-xs">⭐⭐⭐⭐⭐ 5 STARS!!!</div>
                  </div>
                </div>
                <p className="text-green-700 text-sm" style={{ textShadow: '1px 1px yellow' }}>
                  "OMG this store is SOOO good!!! I love it so much you guys should totally buy from here!!!! 
                  Best candles EVER made in the whole world!!!!! 🕯️🕯️🕯️🔥🔥🔥"
                </p>
                <div className="text-right text-purple-600 text-xs mt-2 italic">
                  - anonymous user 2024
                </div>
              </div>
            </div>

            {/* Prettified Testimonial (After) */}
            <div className="relative">
              <div className="absolute -top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded z-10">
                AFTER
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-amber-800 font-semibold text-lg">SM</span>
                  </div>
                  <div>
                    <div className="text-stone-800 font-medium">Sarah Mitchell</div>
                    <div className="flex gap-0.5 text-amber-500">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i} className="text-sm">{star}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  "The attention to detail in this store is remarkable. From the elegant product displays 
                  to the seamless checkout experience — everything feels premium. My go-to for gifts."
                </p>
                <div className="text-stone-400 text-xs mt-3">
                  Verified Purchase • December 2024
                </div>
              </div>
            </div>
          </div>

          {/* Second Row of Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Uglified Testimonial 2 */}
            <div className="relative">
              <div className="absolute -top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded z-10">
                BEFORE
              </div>
              <div className="bg-lime-300 p-3 border-2 border-black">
                <div className="text-center mb-2">
                  <span className="text-2xl">👍👍👍</span>
                </div>
                <p className="text-center text-black text-sm font-bold" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  GREAT PRODUCT A+++++ WOULD BUY AGAIN FAST SHIPPING RECOMMENDED SELLER
                </p>
                <div className="text-center text-red-600 text-xs mt-2 animate-pulse">
                  *** CLICK HERE FOR MORE REVIEWS ***
                </div>
              </div>
            </div>

            {/* Prettified Testimonial 2 */}
            <div className="relative">
              <div className="absolute -top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded z-10">
                AFTER
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-stone-200 to-stone-300 rounded-full flex items-center justify-center">
                    <span className="text-stone-700 font-semibold text-lg">JR</span>
                  </div>
                  <div>
                    <div className="text-stone-800 font-medium">James Rodriguez</div>
                    <div className="flex gap-0.5 text-amber-500">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i} className="text-sm">{star}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  "Impressed by the cohesive brand experience. The packaging, website design, and 
                  product quality all align perfectly. This is how e-commerce should be done."
                </p>
                <div className="text-stone-400 text-xs mt-3">
                  Verified Purchase • January 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
