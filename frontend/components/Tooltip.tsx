import React from "react";

export function Tooltip({ children, tooltipText }: {
    children: React.ReactNode;
    tooltipText: string;
}) {
    const tipRef = React.createRef();
    function handleMouseEnter()
    {
        // @ts-ignore
        tipRef.current.style.opacity = 1;
        // @ts-ignore
        tipRef.current.style.marginLeft = "20px";
    }
    function handleMouseLeave()
    {
        // @ts-ignore
        tipRef.current.style.opacity = 0;
        // @ts-ignore
        tipRef.current.style.marginLeft = "10px";
    }
    return (
        <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="
                    absolute whitespace-no-wrap bg-gradient-to-r 
                    from-green-300 to-green-500 text-white px-4 py-2
                    rounded flex items-center transition-all duration-150
                "
                style={{ left: "100%", opacity: 0 }}
                // @ts-ignore
                ref={tipRef}
            >
                <div
                    className="bg-green-300 h-3 w-3 absolute"
                    style={{ left: "-6px", transform: "rotate(45deg)" }}
                />
                {tooltipText}
            </div>
            {children}
        </div>
    );
}