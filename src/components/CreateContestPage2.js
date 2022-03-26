import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const CreateContestPage2 = ({onAdd}) => {
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(`/create-contest-p3`)
    }

    const [text, setText] = useState("")
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert("Please add a query")
            return 
        }

        onAdd({text})

        setText("")
    }
    return (
        <>
          <center>
              <h2>Create New Contest Page 2</h2>
          </center>
          <div style={{display:"flex"}}>
                <div style={{marginTop:"150px"}}>
                    <p style={{fontSize:"10px", lineHeight:"15px", padding:"5px"}}>
                        Paste all your Queries and click Run Query.
                        Once you are done, click Submit Contest Button Below!!!
                    </p>
                    <form onSubmit={onClick}>
                          <input type="submit" value="Submit Contest" className="btn btn-block" />
                    </form>
                </div>
                  <form className="add-form" onSubmit={onSubmit}>
                          <div className="form-control">
                              <label>Query</label>
                              <textarea style={{border:"solid 1px #ED6630", height:"313px", width: "80.7%"}}
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

export default CreateContestPage2