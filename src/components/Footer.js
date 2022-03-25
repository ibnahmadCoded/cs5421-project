const Footer = ({user}) => {
  return (
    <footer>
        {user.map(user => {return user.userType})[0] === "Admin" ? (
            <>
            <p>Copyright &copy; 2022</p>
            <a href="/" style={{padding:"10px"}}>Home</a>
            <a href="/about" style={{padding:"10px"}}>About</a>
            <a href="/create-contest" style={{padding:"10px"}}>Create Contest</a>
            <a href="/leaderboards" style={{padding:"10px"}}>Leaderboards</a>
            </>
        ) : 
        <>
        <p>Copyright &copy; 2022</p>
        <a href="/" style={{padding:"10px"}}>Home</a>
        <a href="/about" style={{padding:"10px"}}>About</a>
        <a href="/leaderboards" style={{padding:"10px"}}>Leaderboards</a>
        <a href="/submissions" style={{padding:"10px"}}>Submissions History</a>
        </>
        }
        
    </footer>
  )
}

export default Footer