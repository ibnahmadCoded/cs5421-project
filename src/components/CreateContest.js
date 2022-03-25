const CreateContest = () => {
  return (
      <>
        <center>
            <h2>Create New Contest</h2> 
            <p style={{fontSize:"small", color: "#ED6630"}}>NOTE: Save Query Button is only to create shecma and tables.</p>
        </center>
        <div style={{display:"flex"}}>
                <form className="add-form">
                    <div className="form-control">
                        <label>Title</label>
                        <input style={{height:"40px", width: "90%"}} type="text" placeholder="Add Contest" />
                    </div>
                    <div className="form-control">
                        <label>Start Date</label>
                        <input style={{height:"40px", width: "81.5%"}} type="text" placeholder="Add Start Date" />
                    </div>
                    <div className="form-control">
                        <label>End Date</label>
                        <input style={{height:"40px", width: "83%"}} type="text" placeholder="Add End Date" />
                    </div>
                    <div className="form-control">
                        <label>Maximum Number of Tries</label>
                        <input style={{height:"40px", width: "58%"}} type="text" placeholder="Add Maximum Number of Tries" />
                    </div>
                    <div className="form-control">
                        <label>Maximum Execution Time</label>
                        <input style={{height:"40px", width: "59%"}} type="text" placeholder="Add Maximum Execution Time" />
                    </div>
                    <div className="form-control">
                        <label>Expected Query Result</label>
                        <textarea style={{border:"solid 1px #ED6630", height:"45px", width: "64%"}}></textarea>
                        {/* <input style={{height:"50px", width: "64%"}} type="textarea" placeholder="Add The Expected Query result" /> */}
                    </div>
                    <input type="submit" value="Save Contest" className="btn btn-block" />
                </form>
                <form className="add-form">
                        <div className="form-control">
                            <label>Discription</label>
                            <textarea style={{border:"solid 1px #ED6630", height:"197.1px", width: "80.7%"}}></textarea>
                            {/* <input style={{height:"210.1px", width: "80.7%"}} type="text" placeholder="Add Description" /> */}
                        </div>
                        <div className="form-control">
                            <label>Tables</label>
                            <textarea style={{border:"solid 1px #ED6630", height:"100px", width: "86.5%"}}></textarea>
                            {/* <input style={{height:"100px", width: "86.5%"}} type="text" placeholder="Add Tables. Paste Queries and Run" /> */}
                        </div>
                        <input type="submit" value="Run Query" className="btn btn-block" />
                </form>
        </div>
      </>
  )
}

export default CreateContest