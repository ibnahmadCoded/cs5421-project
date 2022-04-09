import { useNavigate } from "react-router-dom";
import Button from './Button'
import Moment from "moment"

const Leaderboard = ({ leaderboard, user }) => {
    const navigate = useNavigate();
    
    const Click = (id) => {
        navigate(`/view-leaderboard/${id}`)
    }

    return (
        <div className={`leaderboard`}>
            <h3 style={{color:"#104880"}}>
                {leaderboard.title} {user?.usertype === "admin" ? 
                <Button color="#ED6630" text="View" onClick={() => Click(leaderboard.id)}/> : 
                <Button color="#ED6630" text="View" onClick={() => Click(leaderboard.id)}/>} 
            </h3>
            <p style={{fontSize:"15px", color:"#ED6630"}}>Submitted on {Moment(leaderboard.endDate).format("MMM Do YYYY, h:mm:ss a")}</p>
        </div>
    )
}

export default Leaderboard