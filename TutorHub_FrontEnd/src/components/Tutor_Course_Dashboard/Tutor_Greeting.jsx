import { starIcon, calendarIcon } from '../../assets/assets';

function Greeting({program}){
    const programName = program.title;
    const enrolled = program.seatsRemaining;
    const rating = program.rate;
    const tutorName = program.tutorName;

    return(
        <div className="course-page-main-content">
            <h1>Hello, {tutorName}</h1>
            <div className="greeting-program-info">
            <div className='greeting-text'>
                <h2>{programName}</h2>
                <h3>Enrolled: {enrolled} Students</h3>
                <div className="greeting-program-rating">
                    <span><img src={starIcon}/>{rating}</span>
                </div>
            </div>
            <div className="greeting-next-session">
                <div className='calendar-icon-container'>
                    <img src={calendarIcon}/>
                </div>
                <div>
                    <h2>Next Session</h2>
                    <p>Lecture</p>
                    <p>July 23, 2024</p>
                    <p>9:00AM - 10:00AM</p>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Greeting;