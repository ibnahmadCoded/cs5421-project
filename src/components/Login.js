import { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import Button from './Button';

const Login = ({ onAdd, users }) => {
    const navigate = useNavigate();

    const [loginId, setId] = useState("")
    const [pwd, setPwd] = useState("")


    const onSubmit = (e) => {
        e.preventDefault()

        // check for correctness
        if (!loginId){
            alert("Please enter NUSID login")
            return
        }

        if (!pwd){
            alert("Please enter password to login")
            return
        }

        // only 1 user is returned
        if (users.filter((use) => use.NUSid === loginId).length === 1){
            // check if password is correct
            if (users.filter((use) => use.NUSid === loginId).map(p => {return p.pwd})[0] === pwd){
                // add query to db
                onAdd({ loginId, pwd})
                console.log("Success")
            } else {
                alert("Username and Password dont match")
                return
            }
            
        } else {
            alert("Username and Password dont match")
            return
        }
        
        onAdd({loginId, pwd})

        // clear form
        setId("")
        setPwd("")

        // navigate(`/`)
    }

    return (
        <>
            <center>
                <div style={{display:"flex"}}>
            
                    <div className="signin-form">
                        <div className="form-control">
                            <label>NUS ID</label>
                            <input id='contestform' style={{width: "70%"}}  type="text" placeholder="AXXXXXXXC" 
                            value={loginId}
                            onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <input id='contestform' style={{width: "70%"}}  type="text" placeholder="*****" 
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            />
                        </div>
                        <form id='contestform' onSubmit={onSubmit}>
                        <input type="submit" value="Login" className="btn btn-sub" />
                        <p>Not registered? <a href='/signup' style={{color: "#ED6630"}}>Signup</a></p>
                        </form>
                    
                    </div>
            
                </div>
            </center>
        </>
    )
}

export default Login