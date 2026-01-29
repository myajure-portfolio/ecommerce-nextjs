import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-t border-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-pink-200 via-sky-200 to-blue-300 shadow-lg flex items-center justify-center">
                <span className="text-2xl font-extrabold text-gray-500">L</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight font-serif">
                Loom Store
              </span>
            </Link>
            <p className="text-gray-500/80 text-sm italic">
              Descubre la moda más elegante y sofisticada.
              <br />
              Calidad premium y estilo único para cada ocasión.
            </p>
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
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Vestidos
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Blusas
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Pantalones
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
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
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Envíos y Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
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
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Sostenibilidad
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
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
              © 2024 Loom Store. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/#"
                className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/#"
                className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/#"
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
