import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const CreateContestPage2 = ({onAdd, onAddQuestion, competitionName}) => {
    
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(`/create-contest-p3`)
    }

    // get data for onSubmit
    // const userId = user.map(user => {return user.id})[0]

    const [queries, setQuery] = useState("")
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (!queries) {
            alert("Please add a query")
            return 
        }

        onAdd({competitionName: competitionName, query:queries})

        setQuery("")
    }

    const onSetQuestion = (e) => {
        e.preventDefault()

        if (!answer) {
            alert("Please add answer")
            return 
        }

        if (!question) {
            alert("Please add a question")
            return 
        }

        onAddQuestion({
            questions: question,
            query: answer,
            competitionName: competitionName
        
        })

        setQuestion("")
        setAnswer("")
        navigate(`/create-contest-p3`)
    }

    return (
        <>
          <center>
              <h2>Create New Contest Page 2</h2>
          </center>
          <div style={{display:"flex"}}>
                <form className="add-form" onSubmit={onSubmit}>
                          <div className="form-control">
                              <label>Query</label>
                              <textarea style={{border:"solid 1px #ED6630", height:"313px", width: "80.7%"}}
                              value={queries}
                              onChange={(e) => setQuery(e.target.value)}
                              >
                              </textarea>
                          </div>
                          <input type="submit" value="Run Query" className="btn btn-block" />
                </form>
                <form className="add-form" onSubmit={onSetQuestion}>
                            <div className="form-control">
                                <label>Question</label>
                                <input id='contestform' style={{height:"40px", width: "83%"}} type="text" placeholder="Add Question" 
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                />
                          </div>
                          <div className="form-control">
                              <label>Answer</label>
                              <textarea style={{border:"solid 1px #ED6630", height:"113px", width: "80.7%"}}
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              >
                              </textarea>
                          </div>
                          <input type="submit" value="Submit Contest" className="btn btn-block" />
                    </form>
                {/* <div style={{marginTop:"150px"}}>
                    <p style={{fontSize:"10px", lineHeight:"15px", padding:"5px"}}>
                        Paste all your Queries and click Run Query.
                        Once you are done, click Submit Contest Button Below!!!
                    </p>
                    
                </div> */}
          </div>
        </>
    )
}

export default CreateContestPage2