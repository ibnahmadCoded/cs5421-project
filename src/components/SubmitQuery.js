import { useMatch} from 'react-router-dom';

const SubmitQuery = ({ contests,  user, dbqueries }) => {
    const {
        params: { id },
      } = useMatch('/submit-query/:id');
    
    // get contest by ID
    const contest = contests.filter((contest) => contest.id === parseInt(id))
      
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
                <form className="add-form-submitQuery">
                        <div className="form-control">
                            <textarea style={{border:"solid 1px #ED6630", marginLeft: "30px", height:"315px", width: "90%"}}></textarea>
                            {/* <input style={{ marginLeft: "30px", height:"315px", width: "90%"}} type="text" placeholder="Paste Query and Run" /> */}
                        </div>
                        <input type="submit" value="Run Query" className="btn btn-block" />
                </form>
        </div>
      </>
    )
}

export default SubmitQuery