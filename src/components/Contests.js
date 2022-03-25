import Contest from "./Contest"

const Contests = ({ contests, onDelete, onToggle, user }) => {
    return (
        <>
            <center><h2>List of Contests</h2></center>
            {contests.map((contest) => (
                <Contest key={contest.id} user={user} contest={contest} 
                onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Contests