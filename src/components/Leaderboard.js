import { useNavigate } from "react-router-dom";
import Button from './Button'

const Leaderboard = ({ leaderboard, user }) => {
    const navigate = useNavigate();

    const Click = (id) => {
        navigate(`/view-leaderboard/${id}`)
    }

    return (
        <div className={`leaderboard`}>
            <h3>
                {leaderboard.title} {user.map(user => {return user.userType})[0] === "Admin" ? 
                <Button color="#ED6630" text="View" onClick={() => Click(leaderboard.id)}/> : 
                <Button color="#ED6630" text="View" onClick={() => Click(leaderboard.id)}/>} 
            </h3>
            <p style={{color:"#ED6630"}}>{leaderboard.endDate}</p>
        </div>
    )
}

export default Leaderboard