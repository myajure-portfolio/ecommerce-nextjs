"use client";

import type React from "react";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button, Input } from "@/components";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 mb-6 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mantente al día con la moda
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Suscríbete a nuestro newsletter y recibe las últimas tendencias,
              ofertas exclusivas y consejos de estilo directamente en tu bandeja
              de entrada.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
            <Button
              type="submit"
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 text-white shadow-lg"
            >
              Suscribirse
            </Button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Al suscribirte, aceptas recibir emails promocionales. Puedes darte
            de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};
