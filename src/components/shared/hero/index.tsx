import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components";

export const Hero = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Soft blue-indigo blobs for special sections */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light mode blobs */}
        <div className="block dark:hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Dark mode blobs */}
        <div className="hidden dark:block">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">
                New Collection
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Perfect Style
                </span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-lg">
                Explore our curated collection of premium fashion pieces that
                blend comfort, style, and sustainability.
              </p>
              <Button
                size="lg"
                className="w-80 h-12 space-x-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                <span>Shop Collection</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  10K+
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  500+
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  Products
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  4.9
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  Rating
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Fashion model 1"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                  style={{ border: "2px solid #E5E7EB" }}
                />
                <img
                  src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Fashion model 2"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                  style={{ border: "2px solid #E5E7EB" }}
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Fashion model 3"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                  style={{ border: "2px solid #E5E7EB" }}
                />
                <img
                  src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Fashion model 4"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                  style={{ border: "2px solid #E5E7EB" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
