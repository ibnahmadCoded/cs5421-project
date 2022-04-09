import Submission from "./Submission"

const Submissions = ({ dbqueries, contests, user }) => {

  // get user ID
  // const user_id = user?.useremail

  // get submissions
  const queries = dbqueries

  return (
    <>
      <center><h2>List of Submissions</h2></center>
      {queries.map((query) => (
      <Submission key={query.id} user={user} query={query}/>
      ))}
    </>
  )
}

export default Submissions