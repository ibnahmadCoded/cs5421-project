import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import validator from 'validator'


const Signup = ({ onAdd, users }) => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [NUSid, setId] = useState("")
    const [pwd, setPwd] = useState("")
    const [cPwd, setCPwd] = useState("")


    const onSubmit = (e) => {
        e.preventDefault()

        // check for correctness
        if (!userType) {
            alert("Please select your user type")
            return 
        }

        if (!name) {
            alert("Please add your name")
            return 
        }

        if (!email) {
            alert("Please add your email")
            return 
        }

        if (!NUSid) {
            alert("Please add your id")
            return 
        }

        if (!pwd) {
            alert("Please add your password")
            return 
        }

        if(validator.isEmail(email)){
            if (email.slice(-7) !== "nus.edu" ){
                alert("Please use a valid NUS email")
                return 
            }
        } else {
            alert("Please use a valid email")
                return
        }

        if(pwd !== cPwd){
            alert("Your passwords dont match")
            return
        }

        let reg = RegExp(/A[0-9]{7,7}[A-Z]/i);
        if(!reg.test(NUSid)){
            alert("Please enter a valid NUS ID")
            return
        }

        if (users.filter((use) => use.email === email).length > 0){
            alert("email already exists")
            return
        }

        if (users.filter((use) => use.NUSid === NUSid).length > 0){
            alert("NUS ID already exists")
            return
        }

        // add user to db
        onAdd({ userType, name, email, NUSid, pwd })

        // clear form
        setName("")
        setUserType("")
        setEmail("")
        setId("")
        setPwd("")
        setCPwd("")
        
        navigate(`/login`)
    }


    return (
        <>
            <center>
            <div style={{display:"flex"}}>
            
            <div className="signup-form">
                    <div className="form-control">
                        <label>User Type</label>
                        <select id='contestform' style={{width: "60%"}} value={userType}
                        onChange={(e) => setUserType(e.target.value)}>
                            <option value="Admin">Admin</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Name</label>
                        <input id='contestform' style={{width: "60%"}} type="text" placeholder="Add Contest Title" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Email</label>
                        <input id='contestform' style={{width: "60%"}} type="text" placeholder="Add Contest Title" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>ID</label>
                        <input id='contestform' style={{width: "60%"}} type="text" placeholder="Add Start Date"
                        value={NUSid}
                        onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input id='contestform' style={{width: "60%"}} type="text" placeholder="****" 
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Confirm </label>
                        <input id='contestform' style={{width: "60%"}} type="text" 
                        placeholder="****" 
                        value={cPwd}
                        onChange={(e) => setCPwd(e.target.value)}
                        />
                    </div>
                    <form id='contestform' onSubmit={onSubmit}>
                        <input type="submit" value="Signup" className="btn btn-sub" />
                        
                    </form>
            </div>   
                
        </div>
            </center>
        </>
    )
}

export default Signup