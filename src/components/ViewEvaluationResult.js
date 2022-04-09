const ViewEvaluationResult = () => {
    
    const leaderboardQ = JSON.parse(localStorage.getItem('leaderboardQ'))

    const query_ = leaderboardQ

    // Is the evaluation result pass or fail??
    const eval_result = query_.queryResult === "correct"

    // get contest title
    const title = query_.competitionName

    // get query submission date
    const sub_date = query_.createTime

    // get execution time
    const exec_time = query_.executionTime

    // get planning time
    const plan_time = query_.planningTime

    // get query
    const query = query_.content

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