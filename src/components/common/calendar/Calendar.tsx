import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFormatDate } from "src/utils/common";
const CalendarComp = ({ eventHandler, defaultValue }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    useEffect(() => {
        console.log("default", defaultValue);
        if (defaultValue != null) {
            setStartDate(defaultValue);
        }
    }, [])
    return (
        <DatePicker selected={startDate}
            showPopperArrow={false}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-end"
            onChange={(value) => { eventHandler(getFormatDate(value)); setStartDate(value); }}
        />
    );
}
export default CalendarComp