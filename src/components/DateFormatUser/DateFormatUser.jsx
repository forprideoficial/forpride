import { parseISO, format} from 'date-fns';
import {IoPeopleOutline} from 'react-icons/io5';
import "./dateFormatUser.css"

function DateFormatUser({date, type}) {
    const Newdate = parseISO(date);
    const datePost = format(
        Newdate, 
    "dd'/'MM'/'yyyy' - 'HH:mm'h'"
    );

    return (
        <>
        <p><IoPeopleOutline />{type} | {datePost}</p>
        </>)
    
}

export {DateFormatUser}