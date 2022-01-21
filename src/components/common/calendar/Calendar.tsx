import { useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { getFormatDate } from 'src/utils/common';
const CalendarComp = ({ eventHandler }) => {
    return (
        <div>
            <Calendar
                onChange={(value, event) => eventHandler(getFormatDate(value))}
            />
        </div>
    );
}
export default CalendarComp