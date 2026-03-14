import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, size = "md", onClick }) => {
    const sizeMap = {
        sm: "h-8",
        md: "h-10",
        lg: "h-16",
        xl: "h-24",
    };

    return (
        <div
            className={cn("flex items-center gap-3", onClick && "cursor-pointer select-none", className)}
            onClick={onClick}
        >
            <div className={cn("relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-900 border border-white/10 shadow-lg transition-transform hover:scale-105 duration-300", sizeMap[size], "aspect-square flex items-center justify-center")}>
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            </div>
            {showText && (
                <div className="flex flex-col text-left">
                    <span className={cn("font-black tracking-tight text-slate-800 leading-none",
                        size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg")}>
                        DP2<span className="text-primary">Guard</span>
                    </span>
                    <span className={cn("font-bold text-slate-400 uppercase tracking-widest mt-0.5",
                        size === "sm" ? "text-[8px]" : "text-[10px]")}>
                        Company Portal
                    </span>
                </div>
            )}
        </div>
    );
};
