const CreateContest = () => {
  return (
    <form className="add-form">
        <div className="form-control">
            <label>Title</label>
            <input type="text" placeholder="Add Contest" />
        </div>
        <div className="form-control">
            <label>Discription</label>
            <input type="text" placeholder="Add Description" />
        </div>
        <div className="form-control">
            <label>Start Date</label>
            <input type="text" placeholder="Add Start Date" />
        </div>
        <div className="form-control">
            <label>End Date</label>
            <input type="text" placeholder="Add End Date" />
        </div>
        <div className="form-control">
            <label>Maximum Number of Tries</label>
            <input type="text" placeholder="Add Maximum Number of Tries" />
        </div>
        <div className="form-control">
            <label>Maximum Execution Time</label>
            <input type="text" placeholder="Add Maximum Execution Time" />
        </div>
        <div className="form-control">
            <label>Expected Query Result</label>
            <input type="text" placeholder="Add The Expected Query result" />
        </div>
        <div className="form-control">
            <label>Tables</label>
            <input type="text" placeholder="Add Tables. Paste Queries and Run" />
        </div>

        <input type="submit" value="Run Query" className="btn btn-block" />
        <input type="submit" value="Save Contest" className="btn btn-block" />
    </form>
  )
}

export default CreateContest