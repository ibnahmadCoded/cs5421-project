import { useMatch} from 'react-router-dom';

const ViewEvaluationResult = ({user, contests, dbqueries}) => {
    const {
        params: { id },
      } = useMatch('/view-eval-result/:id');

    // Get Query by ID from the query`s Id
    const query_ = dbqueries.filter((dbq) => dbq.id === parseInt(id))

    // get contest by using query_
    const contest = contests.filter((cont) => cont.id === 
    query_.map(query_ => {return query_.contestId})[0])

    // Is the evaluation result pass or fail??
    const eval_result = contest.map(contest => {return contest.expectedResult})[0] === 
    query_.map(query_ => {return query_.result})[0]

    // get contest title
    const title = contest.map(contest => {return contest.title})[0]

    // get query submission date
    const sub_date = query_.map(query_ => {return query_.submissionDate})[0]

    // get execution time
    const exec_time = query_.map(query_ => {return query_.executionTime})[0]

    // get planning time
    const plan_time = query_.map(query_ => {return query_.planningTime})[0]

    // get query
    const query = query_.map(query_ => {return query_.query})[0]

    return (
        <div>
            <center>
                <h3>Evaluation Result</h3>
                <p style={{fontSize:"15px", color: "#ED6630"}}>Contest Title: {title}</p>
            </center>
            <h3 style={{fontSize:"25px", color: "#104880"}}>Query</h3>
            <p style={{fontSize:"15px", color: "#ED6630", paddingBottom:"15px"}}>{query}</p>

            <h3 style={{fontSize:"25px", color: "#104880"}}>Submission Date</h3>
            <p style={{fontSize:"15px", color: "#ED6630",  paddingBottom:"15px"}}>{sub_date}</p>

            <h3 style={{fontSize:"25px", color: "#104880"}}>Evaluation Result</h3>
            <>
                {eval_result === true ? 
                    <p style={{fontSize:"15px", color: "green",  paddingBottom:"15px"}}>Pass</p>
                :
                    <p style={{fontSize:"15px", color: "red",  paddingBottom:"15px"}}>Fail</p>
                }
            </>

            <h3 style={{fontSize:"25px", color: "#104880"}}>Execution Time</h3>
            <p style={{fontSize:"15px", color: "#ED6630",  paddingBottom:"15px"}}>{exec_time}</p>

            <h3 style={{fontSize:"25px", color: "#104880"}}>Planning Time</h3>
            <p style={{fontSize:"15px", color: "#ED6630",  paddingBottom:"15px"}}>{plan_time}</p>
        </div>
    )
}

export default ViewEvaluationResult