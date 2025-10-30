"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Mauve</h3>
            <p className="text-gray-300 leading-relaxed">
              Subtle, sophisticated, you — made for every shade of beauty.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mauvegloss1@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>mail</span> mauvegloss1@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@mauvegloss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>Tiktok</span> @mauvegloss
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349165386138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>Whatsapp</span> 09165386138
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Mauve. All Rights Reserved. | Crafted with for gloss
            lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
