import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonWithIconDemoProps {
  href?: string;
  label?: string;
  className?: string;
}

const ButtonWithIconDemo = ({
  href = "#booking",
  label = "Let's Collaborate",
  className,
}: ButtonWithIconDemoProps) => {
  return (
    <Button
      asChild
      className={cn(
        "group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full bg-[var(--orange-dark)] p-1 ps-6 pe-14 text-sm font-medium text-black transition-all duration-500 hover:bg-[var(--orange-dark)] hover:ps-14 hover:pe-6 hover:text-black",
        className,
      )}
    >
      <a href={href}>
        <span className="relative z-10 transition-all duration-500">
          {label}
        </span>
        <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </div>
      </a>
    </Button>
  );
};

export default ButtonWithIconDemo;
