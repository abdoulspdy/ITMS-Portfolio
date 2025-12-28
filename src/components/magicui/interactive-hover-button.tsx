import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
                // We set specific padding (pl-12) to make space for the dot on the left
                // This ensures the text looks centered relative to the visual weight
                "pl-12 pr-6",
                className
            )}
            {...props}
        >
            {/* -----------------------------------------------------------------
          THE DOT (background + icon combined)
          1. Position: Absolute on the left (left-4).
          2. Size: Starts small (h-2 w-2).
          3. Transition: On hover, it grows width/height and moves to top-0/left-0 to fill the container.
         ------------------------------------------------------------------ */}
            <div
                className="absolute left-4 top-1/2 z-0 -translate-y-1/2 h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:left-0 group-hover:top-0 group-hover:translate-y-0"
            />

            {/* -----------------------------------------------------------------
          CONTENT LAYER (Text)
          Fades OUT and moves RIGHT on hover.
          z-10 to stay above the dot initially (though dot is small so it doesn't matter).
         ------------------------------------------------------------------ */}
            <span className="relative z-10 block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {children}
      </span>

            {/* -----------------------------------------------------------------
          HOVER LAYER (Text + Arrow)
          Fades IN and slides from LEFT.
          z-20 to ensure it sits ON TOP of the expanded black background.
         ------------------------------------------------------------------ */}
            <div className="absolute top-0 left-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
                <span>{children}</span>
                <ArrowRight className="h-4 w-4" />
            </div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";