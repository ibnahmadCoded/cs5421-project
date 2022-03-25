import { FaTimes } from "react-icons/fa"
import Button from './Button'

const Contest = ({ contest, onDelete, onToggle, user }) => {
    const onClick = () => {
        console.log("Click")
    }

    return (
        <>
        {user.map(user => {return user.userType})[0] === "Admin" ? 
            <div className={`contest`}>
                <h3>
                    {contest.title}<FaTimes style={{ color: "#ED6630", cursor: "pointer" }} 
                    onClick={() => onDelete(contest.id)}/> 
                </h3>
                <p style={{color:"#ED6630"}}>{contest.endDate}</p>
            </div>
            : 
            <div className={`contest ${contest.reminder ? "reminder" : ""}`} onDoubleClick={() => onToggle(contest.id)}>
                <h3>
                    {contest.title} 
                    <Button color="#ED6630" text="submit" onClick={onClick}/> 
                </h3>
                <p style={{color:"#ED6630"}}>{contest.endDate}</p>
            </div>
        }
        </>
  )
}

export default Contest