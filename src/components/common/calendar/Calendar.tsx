import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFormatDate } from "src/utils/common";
const CalendarComp = ({ eventHandler }) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker selected={startDate}
            dateFormat="yyyy.MM.dd"
            onChange={(value, event) => { eventHandler(getFormatDate(value)); setStartDate(value); }}
        />
    );
}
export default CalendarComp