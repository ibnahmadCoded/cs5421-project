import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import Button from './Button'

const Contest = ({ contest, onDelete, onToggle, user}) => {
    const navigate = useNavigate();

    const onClick = (id) => {
        navigate(`/submit-query/${id}`)
    }

    // ** beginning of section to find if user has not submitted more than the accepted tries **

    // get user ID
    // const user_id = user.map(use => {return use.id})[0]

    // get dbquries whose user ID is same as user_id
    // const queries = dbqueries.filter((dbquery) => dbquery.userId === user_id)

    // get query where the contesId is the same as the contest.id. 
    // returning empty means the user has not submitted this contest. 
    // we should only show submit button if the user has not submitted
    // if the length of the query array is the same contest.maxTries
    // it means the user cant submit more. we shouldnt show the button
    // const query = queries.filter((dbquery) => dbquery.contestId === contest.id)

    // ** end of section to find if user has not submitted more than the accepted tries **

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
                    {/* {query.length < contest.maxTries ? */}
                    <Button color="#ED6630" text="submit" onClick={() => onClick(contest.id)}/>
                    {/* //     :
                    //     ""
                    // } */}
                </h3>
                <p style={{color:"#ED6630"}}>{contest.endDate}</p>
            </div>
        }
        </>
  )
}

export default Contest