import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from './Button';

const CreateContest = ({ onAdd }) => {
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(`/create-contest-p2`)
    }

    // Date().toLocaleString()

    const [competitionName, setTitle] = useState("")
    const [competitionStartDate, setStartDate] = useState("")
    const [competitionEndDate, setEndDate] = useState("")
    // const [maxTries, setMaxTries] = useState("")
    // const [maxExecutionTime, setMaxExecutionTime] = useState("")
    
    
    // const [tables, setTables] = useState([])
    const [ competitionDescription, setDescription] = useState("")
    // const [expectedResult, setExepectedResult] = useState("")
    
    const reminder = true

    const onSubmit = (e) => {
        e.preventDefault()

        if (!competitionName) {
            alert("Please a title for the contest")
            return 
        }

        if (!competitionStartDate) {
            alert("Please select the start date for the contest")
            return 
        }

        if (!competitionEndDate) {
            alert("Please select the end date for the contest")
            return 
        }

        // if (!maxTries) {
        //     alert("Please add the maximum number of trials for the contest")
        //     return 
        // }

        // if (!maxExecutionTime) {
        //     alert("Please add the maximum execution time for the contest")
        //     return 
        // }

        // if (tables.length <= 0) {
        //     alert("Please add the list of tables for the contest. The table list must be separated by commas.")
        //     return 
        // }

        if (! competitionDescription) {
            alert("Please add a description for the contest")
            return 
        }

        // if (!expectedResult) {
        //     alert("Please add the expected result for the contest")
        //     return 
        // }
        const maxTries = 1
        const maxExecutionTime = 1000000
        const expectedResult = ""

        onAdd({competitionName, competitionStartDate, competitionEndDate, maxTries, maxExecutionTime, 
            competitionDescription, expectedResult, reminder})

        setTitle("")
        setStartDate("")
        setEndDate("")
        // setMaxTries("")
        // setMaxExecutionTime("")
        // setTables([])
        setDescription("")
        // setExepectedResult("")
    }

    return (
        <>
            <center>
                <h2>Create New Contest</h2>
            </center>
            {/* <div><Button float="right" color="#104880" text="Next" onClick={() => onClick()}/></div> */}
            
            <div style={{display:"flex"}}>
            
                    <div className="add-form1">
                        <div className="form-control">
                            <label>Title</label>
                            <input id='contestform' style={{height:"40px", width: "90%"}} type="text" placeholder="Add Contest Title" 
                            value={competitionName}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Start Date</label>
                            <input id='contestform' style={{height:"40px", width: "81.5%"}} type="date" placeholder="Add Start Date"
                            value={competitionStartDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>End Date</label>
                            <input id='contestform' style={{height:"40px", width: "83%"}} type="date" placeholder="Add End Date" 
                            value={competitionEndDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        {/* <div className="form-control">
                            <label>Maximum Number of Tries</label>
                            <input id='contestform' style={{height:"40px", width: "58%"}} type="text" 
                            placeholder="Add Maximum Number of Tries" 
                            value={maxTries}
                            onChange={(e) => setMaxTries(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="form-control">
                            <label>Maximum Execution Time</label>
                            <input id='contestform' style={{height:"40px", width: "59%"}} type="text" 
                            placeholder="Add Maximum Execution Time" 
                            value={maxExecutionTime}
                            onChange={(e) => setMaxExecutionTime(parseInt(e.target.value))}
                            />
                        </div> */}
                        {/* <div className="form-control">
                            <label>Tables</label>
                            <input id='contestform' style={{height:"40px", width: "80%"}} type="text" 
                            placeholder="Add list of Tables e.g. Table1, Tabel2, Table3" 
                            value={tables}
                            onChange={(e) => setTables(e.target.value.split(","))}
                            />
                        </div> */}
                    </div>
                    <div className="add-form1">
                            <div className="form-control">
                                <label>Discription</label>
                                <textarea id='contestform' style={{border:"solid 1px #ED6630", height:"330px", width: "80.7%"}}
                                value={competitionDescription}
                                onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            {/* <div className="form-control">
                                <label>Expected Result</label>
                                <textarea id='contestform' style={{border:"solid 1px #ED6630", height:"140px", width: "73%"}}
                                value={expectedResult}
                                onChange={(e) => setExepectedResult(e.target.value)}
                                ></textarea>
                            </div> */}
                    </div> 
                    <Button color="#104880" text="Next" onClick={() => onClick()}/>
            </div>
            <div>
                
            </div>
            <form id='contestform' onSubmit={onSubmit}>
                <input type="submit" value="Save" className="btn btn-block" />
            </form>
        </>
    )
}

export default CreateContest