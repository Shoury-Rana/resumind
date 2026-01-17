import { createContext, useContext, useState } from "react";
import { cn } from "../lib/utils";

const AccordionContext = createContext(undefined);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion provider");
    }
    return context;
};

export const Accordion = ({ children, defaultOpen, allowMultiple = false, className = "" }) => {
    const [activeItems, setActiveItems] = useState(defaultOpen ? [defaultOpen] : []);

    const toggleItem = (id) => {
        setActiveItems((prev) => {
            if (allowMultiple) {
                return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };

    const isItemActive = (id) => activeItems.includes(id);

    return (
        <AccordionContext.Provider value={{ activeItems, toggleItem, isItemActive }}>
            <div className={`space-y-2 ${className}`}>{children}</div>
        </AccordionContext.Provider>
    );
};

export const AccordionItem = ({ children, className = "" }) => {
    return <div className={`overflow-hidden border-b border-gray-200 ${className}`}>{children}</div>;
};

export const AccordionHeader = ({ itemId, children, className = "", iconPosition = "right" }) => {
    const { toggleItem, isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    const defaultIcon = (
        <svg
            className={cn("w-5 h-5 transition-transform duration-200", { "rotate-180": isActive })}
            fill="none" stroke="#98A2B3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    const handleClick = () => toggleItem(itemId);

    return (
        <button
            onClick={handleClick}
            className={`w-full px-4 py-3 text-left focus:outline-none transition-colors duration-200 flex items-center justify-between cursor-pointer ${className}`}
        >
            <div className="flex items-center space-x-3">
                {iconPosition === "left" && defaultIcon}
                <div className="flex-1">{children}</div>
            </div>
            {iconPosition === "right" && defaultIcon}
        </button>
    );
};

export const AccordionContent = ({ itemId, children, className = "" }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} grid ${className}`}
        >
            <div className="overflow-hidden">
                <div className="px-4 py-3">{children}</div>
            </div>
        </div>
    );
};