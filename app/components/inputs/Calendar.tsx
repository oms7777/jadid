'use client';

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: Range;
    onChange: (value: Date) => void;
    disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange, disabledDates }) => {
    return (
        <DateRange
            rangeColors={["#262626"]}
            ranges={[value]}
            date={new Date()}
            onChange={(ranges) => {
                console.log("Selected Date:", ranges.selection?.startDate); // Debugging
                if (ranges.selection?.startDate) {
                    onChange(ranges.selection.startDate);
                }
            }}
            
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    );
};

export default Calendar;