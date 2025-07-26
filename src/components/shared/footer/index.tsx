import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-t border-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-200 via-sky-200 to-blue-300 shadow-lg flex items-center justify-center">
                <span className="text-2xl font-extrabold text-gray-500">L</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight font-serif">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-gray-500/80 text-sm italic">{APP_DESCRIPTION}</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:scale-110 transition-transform">
                <Facebook className="h-5 w-5 text-blue-400 hover:text-blue-600" />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <Instagram className="h-5 w-5 text-pink-400 hover:text-pink-600" />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <Twitter className="h-5 w-5 text-sky-400 hover:text-sky-600" />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <Youtube className="h-5 w-5 text-red-400 hover:text-red-600" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-3 tracking-wide">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/productos"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/vestidos"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Vestidos
                </Link>
              </li>
              <li>
                <Link
                  href="/blusas"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Blusas
                </Link>
              </li>
              <li>
                <Link
                  href="/pantalones"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Pantalones
                </Link>
              </li>
              <li>
                <Link
                  href="/accesorios"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3 tracking-wide">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Envíos y Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/guia-tallas"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/cuidado"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Cuidado de Prendas
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 tracking-wide">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/carreras"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  href="/sostenibilidad"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Sostenibilidad
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-100 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {currentYear} {APP_NAME}. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacidad"
                className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
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
