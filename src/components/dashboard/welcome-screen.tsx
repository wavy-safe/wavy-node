"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function WelcomeScreen({ login }: { login: () => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image src="/wavyNode.svg" alt="WavyNode Logo" width={80} height={80} />
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold tracking-tight text-primary text-center">Welcome to WavyNode</h1>
        <p className="text-lg text-muted-foreground text-center">
          Sign in to access your dashboard and manage your API keys and webhooks.
        </p>

        {/* Sign In Button */}
        <div className="pt-4 w-full flex justify-center">
          <Button onClick={login} size="lg" className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground">
            Sign in with Privy
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-muted-foreground pt-4 text-center">
          By continuing, you agree to our {" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and {" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
