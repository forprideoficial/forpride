import { parseISO, format} from 'date-fns';
import "./dateFormatChat.css"
function DateFormatChat({date}) {
    const Newdate = parseISO(date);
    const datePost = format(
        Newdate, 
    "dd'/'MM'/'yyyy' às 'HH:mm'h'"
    );

    return (
        <div className="date">
            <p>{datePost}</p>
        </div>
        )
    
}

export {DateFormatChat}