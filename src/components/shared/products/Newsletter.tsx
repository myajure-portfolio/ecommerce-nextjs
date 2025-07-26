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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay up to date with fashion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Subscribe to our newsletter and receive the latest trends,
              exclusive offers, and style tips directly to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 text-white shadow-lg"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By subscribing, you agree to receive promotional emails. You can
            unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
