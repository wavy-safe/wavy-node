import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#011422] text-[#F9F9F9] py-16">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex gap-6 mb-8">
          <a
            href="https://twitter.com/wavynode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 text-[#F9F9F9] hover:text-[#D6D6ED]" />
          </a>
          <a
            href="https://github.com/WavyNode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-[#F9F9F9] hover:text-[#D6D6ED]" />
          </a>
          <a
            href="https://www.linkedin.com/company/wavy-node"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 text-[#F9F9F9] hover:text-[#D6D6ED]" />
          </a>
        </div>

        <div className="w-full max-w-md mb-8">
          <Button className="w-full bg-[#2D2E89] hover:bg-[#394754] text-[#F9F9F9] h-12">
            Feedback
          </Button>
        </div>

        <p className="text-[#7A888C] text-sm">
          © 2023 Wavy Node. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
