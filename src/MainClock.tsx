import { Dayjs } from "dayjs";

import { ClockSize } from "./config";

type MainClockProps = {
    time: Dayjs;
    size?: ClockSize;
};

// Size variant classes for main clock
const getMainClockSizeClasses = (size: ClockSize) => {
    switch (size) {
        case ClockSize.SM:
            return {
                timeContainer: "text-4xl md:text-5xl",
                colonSize: "text-3xl md:text-4xl",
                secondSize: "text-2xl md:text-3xl",
                dateSize: "text-lg md:text-xl",
                weekdaySize: "text-sm md:text-base"
            };
        case ClockSize.MD:
            return {
                timeContainer: "text-6xl md:text-7xl",
                colonSize: "text-4xl md:text-5xl",
                secondSize: "text-3xl md:text-4xl",
                dateSize: "text-xl md:text-2xl",
                weekdaySize: "text-base md:text-lg"
            };
        case ClockSize.LG:
            return {
                timeContainer: "text-8xl",
                colonSize: "text-6xl md:text-7xl",
                secondSize: "text-4xl md:text-5xl",
                dateSize: "text-2xl md:text-3xl",
                weekdaySize: "text-lg md:text-xl"
            };
        case ClockSize.XL:
            return {
                timeContainer: "text-9xl",
                colonSize: "text-7xl md:text-8xl",
                secondSize: "text-5xl md:text-6xl",
                dateSize: "text-3xl md:text-4xl",
                weekdaySize: "text-xl md:text-2xl"
            };
        default:
            return {
                timeContainer: "text-8xl",
                colonSize: "text-6xl md:text-7xl",
                secondSize: "text-4xl md:text-5xl",
                dateSize: "text-2xl md:text-3xl",
                weekdaySize: "text-lg md:text-xl"
            };
    }
};

const MainClock = ({ time, size = ClockSize.LG }: MainClockProps) => {
    const hour = time.hour();
    const minute = time.minute();
    const second = time.second();

    const years = time.year();
    const month = time.month() + 1;
    const date = time.date();

    const weekday = time.format("dddd");
    
    const sizeClasses = getMainClockSizeClasses(size);

    return (
        <div className="flex flex-col items-start self-start">
            {/** TIME */}
            <div className={`flex items-baseline gap-1 ${sizeClasses.timeContainer} font-extralight tracking-tight`}>
                <span className="text-white">{hour.toString().padStart(2, "0")}</span>
                <span className={`${sizeClasses.colonSize} text-gray-400`}>:</span>
                <span className="text-white">{minute.toString().padStart(2, "0")}</span>
                <span className={`${sizeClasses.secondSize} text-gray-500 ml-2`}>
                    {second.toString().padStart(2, "0")}
                </span>
            </div>

            {/** DATE + WEEKDAY (inline) */}
            <div className="flex items-baseline gap-4">
                <div className={`${sizeClasses.dateSize} font-light text-gray-300 tracking-wide tabular-nums`}>
                    {years}.{month.toString().padStart(2, "0")}.
                    {date.toString().padStart(2, "0")}
                </div>
                <div className={`${sizeClasses.weekdaySize} font-medium text-gray-400 uppercase tracking-widest`}>
                    {weekday}
                </div>
            </div>
        </div>
    );
};

export default MainClock;
