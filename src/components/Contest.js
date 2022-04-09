import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import Button from './Button'
import Moment from "moment"

const Contest = ({ contest, onDelete, onToggle, user}) => {
    const navigate = useNavigate();

    const onClick = (id) => {
        navigate(`/submit-query/${id}`)
    }

    return (
        <>
        {user?.usertype === "admin" ? 
            <div className={`contest`}>
                <h3 style={{color:"#104880"}}>
                    {contest.title}<FaTimes style={{ color: "#ED6630", cursor: "pointer" }} 
                    onClick={() => onDelete(contest.id)}/> 
                </h3>
                <p style={{fontSize:"15px", color:"#ED6630"}}>{Moment(contest.endDate).format("MMM Do YYYY, h:mm:ss a")}</p>
            </div>
            : 
            <div className={`contest ${contest.reminder ? "reminder" : ""}`} onDoubleClick={() => onToggle(contest.id)}>
                <h3 style={{color:"#104880"}}>
                    {contest.title} 
                    <Button color="#ED6630" text="submit" onClick={() => onClick(contest.id)}/>
                </h3>
                <p style={{fontSize:"15px", color:"#ED6630"}}>Deadline: {Moment(contest.endDate).format("MMM Do YYYY, h:mm:ss a")}</p>
            </div>
        }
        </>
  )
}

export default Contest