import { Dayjs } from "dayjs";
import React from "react";

import { ClockSize } from "./config";

type WorldClocksProps = {
    times: Dayjs[];
    tzNames: string[];
    primaryTime: Dayjs;
    size?: ClockSize;
};

// Size variant classes for world clocks
const getWorldClockSizeClasses = (size: ClockSize) => {
    switch (size) {
        case ClockSize.SM:
            return {
                container: "mt-1 max-w-xs",
                labelSize: "text-xs",
                offsetSize: "text-xs",
                timeSize: "text-xl",
                dateSize: "text-xs"
            };
        case ClockSize.MD:
            return {
                container: "mt-2 max-w-sm",
                labelSize: "text-sm",
                offsetSize: "text-xs",
                timeSize: "text-2xl",
                dateSize: "text-xs"
            };
        case ClockSize.LG:
            return {
                container: "mt-2 max-w-md",
                labelSize: "text-sm",
                offsetSize: "text-xs",
                timeSize: "text-3xl",
                dateSize: "text-xs"
            };
        case ClockSize.XL:
            return {
                container: "mt-3 max-w-lg",
                labelSize: "text-base",
                offsetSize: "text-sm",
                timeSize: "text-4xl",
                dateSize: "text-sm"
            };
        default:
            return {
                container: "mt-2 max-w-md",
                labelSize: "text-sm",
                offsetSize: "text-xs",
                timeSize: "text-3xl",
                dateSize: "text-xs"
            };
    }
};

// A single secondary timezone row
const WorldClockRow: React.FC<{
    time: Dayjs;
    label: string;
    primaryTime: Dayjs;
    sizeClasses: ReturnType<typeof getWorldClockSizeClasses>;
}> = ({ time, label, primaryTime, sizeClasses }) => {
    const offsetHours = time.utcOffset() / 60; // minutes -> hours
    const sign = offsetHours >= 0 ? "+" : "-";
    const offsetDisplay = `UTC${sign}${Math.abs(offsetHours).toString().padStart(2, "0")}`;

    const dayDiff = time.startOf("day").diff(primaryTime.startOf("day"), "day");
    const dayDiffDisplay =
        dayDiff === 0 ? "" : dayDiff > 0 ? `(+${dayDiff}d)` : `(${dayDiff}d)`;

    return (
        <div className="flex items-baseline justify-between py-1">
            <div className="flex flex-col">
                <span className={`${sizeClasses.labelSize} font-medium tracking-wide text-gray-400 uppercase`}>
                    {label}
                </span>
                <span className={`${sizeClasses.offsetSize} text-gray-500 tabular-nums`}>
                    {offsetDisplay} {dayDiffDisplay}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className={`${sizeClasses.timeSize} font-light tabular-nums text-white`}>
                    {time.format("HH:mm")}
                </span>
                <span className={`${sizeClasses.dateSize} text-gray-500 tabular-nums`}>
                    {time.format("YYYY.MM.DD")}
                </span>
            </div>
        </div>
    );
};

const WorldClocks: React.FC<WorldClocksProps> = ({ times, tzNames, primaryTime, size = ClockSize.LG }) => {
    if (!times.length) return null;

    const sizeClasses = getWorldClockSizeClasses(size);

    return (
        <div className={`${sizeClasses.container} flex flex-col gap-2 w-full`}>
            <div className="divide-y divide-gray-800/60">
                {times.map((t, i) => {
                    const originalLabel = tzNames[i] ?? "UNKNOWN";
                    const processedLabel = originalLabel.includes("/")
                        ? originalLabel.split("/").filter(Boolean).pop() || originalLabel
                        : originalLabel;
                    return (
                        <WorldClockRow
                            key={originalLabel || i}
                            time={t}
                            label={processedLabel}
                            primaryTime={primaryTime}
                            sizeClasses={sizeClasses}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default WorldClocks;
