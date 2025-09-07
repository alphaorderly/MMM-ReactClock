import React from "react";

import { ensureConfig, getClockSize, ClockSize } from "./config";
import useTime from "./hooks/useTime";
import MainClock from "./MainClock";
import WorldClocks from "./WorldClocks";

// Size variant classes for different clock sizes
const getSizeClasses = (size: ClockSize) => {
    switch (size) {
        case ClockSize.SM:
            return {
                container: "flex flex-col items-start p-2 scale-75 origin-top-left",
                spacing: "gap-1"
            };
        case ClockSize.MD:
            return {
                container: "flex flex-col items-start p-3 scale-90 origin-top-left",
                spacing: "gap-2"
            };
        case ClockSize.LG:
            return {
                container: "flex flex-col items-start p-4",
                spacing: "gap-3"
            };
        case ClockSize.XL:
            return {
                container: "flex flex-col items-start p-6 scale-125 origin-top-left",
                spacing: "gap-4"
            };
        default:
            return {
                container: "flex flex-col items-start p-4",
                spacing: "gap-3"
            };
    }
};

export default function App(): JSX.Element {
    const config = ensureConfig();
    const size = getClockSize();
    const sizeClasses = getSizeClasses(size);

    const { currentTime, otherTimes } = useTime({
        primaryTz: config?.primary ?? "UTC",
        otherTzs: config?.others ?? [],
    });

    return (
        <div className={`${sizeClasses.container} ${sizeClasses.spacing}`}>
            <MainClock time={currentTime} size={size} />
            <WorldClocks
                times={otherTimes}
                tzNames={config?.others ?? []}
                primaryTime={currentTime}
                size={size}
            />
        </div>
    );
}
