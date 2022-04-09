import { useState } from 'react'
import { useMatch} from 'react-router-dom'

const SubmitQuery = ({ onAdd, contests,  user}) => {
    const [text, setText] = useState("")

    const {
        params: { id },
      } = useMatch('/submit-query/:id');
    
    // get contest by ID
    const contest = contests.filter((contest) => contest.id === id)

    // get data for onSubmit
    const userId = user?.useremail
    // const contestId = contest.map(cont => {return cont.id})[0]
    const contestTitle = contest.map(cont => {return cont.title})[0]
    const query = text

    // get data for query validation
    // does query end with a semi-colon(;)
    const semiEnd = text.slice(-1) === ";"

    // get tables in contest
    // const tables = contest.map(cont => {return cont.tables})[0]

    // check if the query is trying to access a table that exists
    // const inTables = tables.filter(element => text.slice(0, -1).split(" ").includes(element)).length > 0

    // check wrong query keywords to prevent SQL injection, for security
    const sqlInjectKeys = "CREATE UPDATE DELETE ALTER DROP POST GET MODIFY INSERT ADD CONSTRAINT BACKUP DATABASE COLUMN INDEX TABLE PROCEDURE DEFAULT INTO PRIMARY SET TRUNCATE VALUES"
    const injectionQ = sqlInjectKeys.split(" ").filter(element => text.toUpperCase().split(" ").includes(element)).length > 0

    // check if query is correct 
    const sqlCorrQKeys = "SELECT * FROM AND WHERE COUNT ORDER BY MAX MIN ALL ANY AS ASC BETWEEN CASE CHECK UNIQUE DISTINCT DESC EXEC EXISTS GROUP HAVING IN IS INNER JOIN NOT NULL OR OUTER RIGHT LEFT LIKE LIMIT ROWNUM TOP UNION = == > < <> ; + - * /"
    const corrQ = sqlCorrQKeys.split(" ").filter(element => text.toUpperCase().split(" ").includes(element)).length > 0 

    const onSubmit = (e) => {
        e.preventDefault()

        // check for correctness
        if (!text) {
            alert("Please add a query")
            return 
        }

        if (!semiEnd) {
            alert("Your query must end with a semi-colon (;)")
            return 
        }

        // if (!inTables) {
        //     alert("Please query a table that exists in the contest. NOTE: Table name is case sensitive")
        //     return 
        // }

        if (injectionQ) {
            alert("Please submit a query that does not alter the table(s)")
            return 
        }

        if (!corrQ) {
            alert("Please submit a query with the right keywords")
            return 
        }


        // add query to db
        onAdd({userId, query, contestTitle})
        // clear form
        setText("")
    }
      
    return (
        <>
        <center>
            <h2 style={{paddingBottom: "5px"}}>Submit Query</h2> 
        </center>
        <p style={{fontSize:"20px", marginLeft: "230px"}}>Description</p>
        <div style={{display:"flex"}}>
                <div style={{ overflowY: 'scroll'}} className="add-form-submitQuery">
                    <p style={{fontSize:"10px", lineHeight:"15px", padding:"5px"}}>
                        {contest.map(contest => {return contest.description})[0]}
                    </p>
                </div>
                <form className="add-form-submitQuery" onSubmit={onSubmit}>
                        <div className="form-control">
                            <textarea 
                            style={{border:"solid 1px #ED6630", marginLeft: "30px", height:"315px", width: "90%"}}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <input type="submit" value="Run Query" className="btn btn-block" />
                </form>
        </div>
      </>
    )
}

export default SubmitQuery