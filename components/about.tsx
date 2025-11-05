"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <img
              src="/logo1.jpg"
              alt="Mauve Beauty"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full rounded-2xl shadow-lg ${
                loaded ? "loaded" : ""
              }`}
            />
          </div>

          <div className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              About Mauve
            </h2>
            <p className="text-lg text-text-muted mb-6 leading-relaxed">
              Mauve is a Nigerian beauty brand focused on creating soft,
              high-shine lip glosses made with care, quality, and confidence.
              Every gloss is crafted to enhance your natural beauty and make you
              feel effortlessly luxurious. No individual should feel insecure or
              left out because of the way they look.
            </p>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              We believe that beauty should be accessible, sustainable, and
              empowering. Our products are made with natural ingredients and
              designed for every skin tone and personal style.
            </p>
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-2">100%</h3>
                <p className="text-sm text-text-muted">Good Ingredients</p>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-2">3+</h3>
                <p className="text-sm text-text-muted">Luxe Shades</p>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-2">A lot+</h3>
                <p className="text-sm text-text-muted">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
