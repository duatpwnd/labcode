import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFormatDate } from "src/utils/common";
interface ParamsType {
    eventHandler: (e, id?) => void
    defaultValue: string
    id?: number
}
const CalendarComp = ({ eventHandler, defaultValue, id }: ParamsType) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    useEffect(() => {
        if (defaultValue != undefined) {
            setStartDate(new Date(defaultValue));
        }
    }, [defaultValue])
    return (
        <DatePicker selected={startDate}
            showPopperArrow={false}
            input={true}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-end"
            onChange={(value) => { eventHandler(getFormatDate(value), id); setStartDate(value); }}
        />
    );
}
export default CalendarComp