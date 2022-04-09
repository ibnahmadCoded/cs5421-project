import Leaderboard from "./Leaderboard"

const Leaderboards = ({ leaderboards, user }) => {
    
    return (
        <>
            <center><h2>List of Contests</h2></center>
            {leaderboards.map((leaderboard) => (
                <Leaderboard key={leaderboard.id} user={user} leaderboard={leaderboard}/>
            ))}
        </>
    )
}

export default Leaderboards