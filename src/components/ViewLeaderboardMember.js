import { useNavigate } from "react-router-dom";
import Button from './Button'

const ViewLeaderboardMember = ({ corr_query, user  }) => {
    const navigate = useNavigate();

    const onClick = (id) => {
        navigate(`/view-eval-result/${id}`)
    }

    // Get User by ID from the query`s userId
    // const user_ = users.filter((use) => use.id === corr_query.userId)

    // save the query in local storage to use in view evaluation page
    localStorage.setItem('leaderboardQ', JSON.stringify(corr_query));

    return (
        <div className={`leaderboard`}>
            <>
                {user?.usertype === "admin" ? 
                    <p>
                        <span>{corr_query.creatorId}</span>
                        <span className="leaderboardP">{corr_query.executionTime}</span> 
                        <span className="leaderboardP">{corr_query.planningTime}</span> 
                        <span className="leaderboardP">
                            <Button color="#ED6630" text="View" onClick={() => onClick(corr_query.id)}/>
                        </span>
                    </p>
                    : 
                    <p>
                        <span>{corr_query.creatorId}</span> 
                        <span className="leaderboardP1">{corr_query.executionTime}</span> 
                        <span className="leaderboardP1">{corr_query.planningTime}</span>
                        {user?.useremail === 
                        corr_query.creatorId ? 
                        <span className="leaderboardP1">
                            <Button color="#ED6630" text="View" onClick={() => onClick(corr_query.id)}/>
                        </span>
                        : ""}
                    </p>
                }
                <p style={{color:"#ED6630", fontSize:"10px"}}>Submitted on {corr_query.createTime}</p>
            </>
        </div>
    )
}

export default ViewLeaderboardMember