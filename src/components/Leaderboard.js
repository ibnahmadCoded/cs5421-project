import Button from './Button'

const Leaderboard = ({ leaderboard, user }) => {
    const onClick = () => {
        console.log("Click")
    }

    return (
        <div className={`leaderboard`}>
            <h3>
                {leaderboard.title} {user.map(user => {return user.userType})[0] === "Admin" ? 
                <Button color="#ED6630" text="View" onClick={onClick}/> : 
                <Button color="#ED6630" text="View" onClick={onClick}/>} 
            </h3>
            <p style={{color:"#ED6630"}}>{leaderboard.endDate}</p>
        </div>
    )
}

export default Leaderboard