"use client";
import { Button } from "@/components";
import { APP_NAME } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-background">
      <div className="flex flex-col items-center bg-white/90 dark:bg-background/80 rounded-xl shadow-2xl px-8 py-10 max-w-md w-full">
        <AlertTriangle className="mb-6 text-primary" size={72} />
        <h1 className="text-4xl font-extrabold text-primary mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
          Page Not Found
        </h2>
        <p className="text-center text-base text-muted-foreground mb-6">
          Sorry, we couldn't find the page you were looking for.
          <br />
          Would you like to return to the {APP_NAME} homepage?
        </p>
        <Button
          variant="default"
          className="w-full"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
