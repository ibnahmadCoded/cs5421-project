import { useNavigate } from "react-router-dom";
import Button from './Button'

const Submission = ({ query }) => {
    const navigate = useNavigate();

    const Click = (id) => {
        navigate(`/view-eval-result/${id}`)
    }

    return (
        <div className={`leaderboard`}>
            <h3>
                {query.content}  
                <Button color="#ED6630" text="View" onClick={() => Click(query.id)}/> 
            </h3>
            <p style={{fontSize:"15px", color:"#ED6630"}}>Submitted on {query.submissionDate}</p>
        </div>
    )
}

export default Submission