import "../../styles/Search_Courses/Course_Search_Head.css";
import "../../styles/Search_Courses/Course_Card.css";


function Course_Search_Head(){
    return(
        <div className="header-banner">
            <div className="header-content">
                <h1>All Courses</h1>
                <nav className="breadcrumb">
                <a href="/">Home</a> &gt; <a href="/courses">Courses</a>
                </nav>
            </div>
        </div>

    );
}

export default Course_Search_Head;