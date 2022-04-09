import { useState, useEffect } from "react"
import { useMatch} from 'react-router-dom';
import ViewLeaderboardMember from "./ViewLeaderboardMember"

const ViewLeaderboard = ({ contests,   user, users }) => {
    const {
        params: { id },
      } = useMatch('/view-leaderboard/:id');

    
    // get contest by ID
    const contest = contests.filter((contest) => contest.id === id)
    const [corr_queries, setCorr_queries] = useState([])
    // get array of all queries for the contest of ID === contest.id. Use the contest 
    // variable to be sure u are getting the queries for the contest.
    // const curr_queries = dbqueries.filter((dbquery) => dbquery.contestId === 
    // contest.map(contest => {return contest.id})[0]) 
    // const curr_queries = submissions


    // filter for correct queries in the current quries for the current contest
    // const corr_queries = contests
    // console.log(id)
    // console.log(contests)
    // console.log(contest.map(use => {return use.title})[0])

      // *FETCH SUBMISSIONS FOR A CONTEST FROM SERVER* //

        // http://localhost:4000/api/getApi/getCompetitionsAll
        // http://localhost:5000/contests
        // Fetch Contests

        useEffect(() => {
            const getCompetitionSubmissions = async () => {
              const submissionsFromServer = await fetchCompetitionSubmissions()
              setCorr_queries(submissionsFromServer) 
            }
        
            getCompetitionSubmissions()
          }, [])

        const fetchCompetitionSubmissions = async () => {
            const comp = contest.map(use => {return use.title})[0]
            const res = await fetch(`http://localhost:4000/api/getApi/competition/${comp}`)
            const data = await res.json()
            // setCorr_queries(data)
            data.sort((a, b) => (a.executionTime < b.executionTime) ? -1 : 1)
            return data
        }
    
    // get contes`s title
    const contest_title = contest.map(contest => {return contest.title})[0]

    return (
        <>
            <center>
                <h2>Leaderboard</h2>
                <p style={{fontSize:"15px", color: "#ED6630"}}>{contest_title}</p>
            </center>
            {user?.usertype === "admin" ?
                <p>
                    <span style={{fontSize:"15px", paddingLeft: "65px", color: "#ED6630"}}>Student`s ID</span> 
                    <span style={{paddingLeft: "297px"}} className="leaderboardP4">Execution Time</span> 
                    <span style={{paddingLeft: "245px"}} className="leaderboardP4">Planning Time</span>
                    <span className="leaderboardP4"></span>
                </p>
                :
                <p>
                    <span style={{fontSize:"15px", paddingLeft: "65px", color: "#ED6630"}}>Student`s ID</span> 
                    <span style={{paddingLeft: "297px"}} className="leaderboardP4">Execution Time</span> 
                    <span style={{paddingLeft: "245px"}} className="leaderboardP4">Planning Time</span>
                    <span className="leaderboardP4"></span>
                </p>
            }
            {corr_queries.map((corr_query) => (
                <ViewLeaderboardMember key={corr_query.id} user={user} users={users} 
                contest={contest} corr_query={corr_query}/>
            ))}
        </>
    )
}

export default ViewLeaderboard