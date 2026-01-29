import { RefreshCw, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Free Shipping",
    description: "Free shipping on orders over $100",
  },
  {
    icon: <RefreshCw className="h-8 w-8" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure Payment",
    description: "SSL encrypted checkout",
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
