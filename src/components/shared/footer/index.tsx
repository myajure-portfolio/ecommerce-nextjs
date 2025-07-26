import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-sky-400 to-blue-400" />
              <span className="text-xl font-bold text-foreground">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">{APP_DESCRIPTION}</p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Shop</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/productos"
                className="block text-muted-foreground hover:text-foreground"
              >
                All Products
              </Link>
              <Link
                href="/vestidos"
                className="block text-muted-foreground hover:text-foreground"
              >
                Dresses
              </Link>
              <Link
                href="/blusas"
                className="block text-muted-foreground hover:text-foreground"
              >
                Blouses
              </Link>
              <Link
                href="/pantalones"
                className="block text-muted-foreground hover:text-foreground"
              >
                Pants
              </Link>
              <Link
                href="/accesorios"
                className="block text-muted-foreground hover:text-foreground"
              >
                Accessories
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/contacto"
                className="block text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                href="/envios"
                className="block text-muted-foreground hover:text-foreground"
              >
                Shipping & Returns
              </Link>
              <Link
                href="/guia-tallas"
                className="block text-muted-foreground hover:text-foreground"
              >
                Size Guide
              </Link>
              <Link
                href="/faq"
                className="block text-muted-foreground hover:text-foreground"
              >
                FAQ
              </Link>
              <Link
                href="/cuidado"
                className="block text-muted-foreground hover:text-foreground"
              >
                Garment Care
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/sobre-nosotros"
                className="block text-muted-foreground hover:text-foreground"
              >
                About Us
              </Link>
              <Link
                href="/carreras"
                className="block text-muted-foreground hover:text-foreground"
              >
                Careers
              </Link>
              <Link
                href="/sostenibilidad"
                className="block text-muted-foreground hover:text-foreground"
              >
                Sustainability
              </Link>
              <Link
                href="/privacidad"
                className="block text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terminos"
                className="block text-muted-foreground hover:text-foreground"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacidad"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terminos"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
