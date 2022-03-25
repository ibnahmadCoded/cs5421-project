import Submission from "./Submission"

const Submissions = ({ dbqueries, contests, user }) => {

  // get user ID
  const user_id = user.map(use => {return use.id})[0]

  // get dbquries whose user ID is same as user_id
  const queries = dbqueries.filter((dbquery) => dbquery.userId === user_id) 

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