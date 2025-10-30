"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Chioma A.",
    quote: "Mauve glosses are absolutely stunning! The shine lasts all day and the colors are so beautiful.",
    rating: 5,
    image: "/woman-portrait-beauty.jpg",
  },
  {
    id: 2,
    name: "Zainab M.",
    quote: "Finally found a lip gloss that works for my skin tone. The quality is unmatched and worth every naira!",
    rating: 5,
    image: "/woman-portrait-beauty.jpg",
  },
  {
    id: 3,
    name: "Amara O.",
    quote: "I love how the glosses feel on my lips. No stickiness, just pure luxury and shine. Highly recommend!",
    rating: 5,
    image: "/woman-portrait-beauty.jpg",
  },
]

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Loved by Our Customers</h2>
          <p className="text-lg text-text-muted">See what our happy customers have to say about Mauve</p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-stagger" : "opacity-0"}`}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-muted mb-6 leading-relaxed italic">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
