import { useNavigate } from "react-router-dom";
import Button from './Button'
import Moment from "moment"

const Submission = ({ query }) => {
    const navigate = useNavigate();

    const Click = (id) => {
        navigate(`/view-submission-result/${id}`)
    }

    
    localStorage.setItem('submissionQ', JSON.stringify(query));

    return (
        <div className={`leaderboard`}>
            <h3 style={{color:"#104880"}}>
                {query.content}  
                <Button color="#ED6630" text="View" onClick={() => Click(query.id)}/> 
            </h3>
            <p style={{fontSize:"15px", color:"#ED6630"}}>Submitted on {Moment(query.createTime).format("MMM Do YYYY, h:mm:ss a")}</p>
        </div>
    )
}

export default Submission