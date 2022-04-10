import { useState, useEffect } from "react"
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Contests from './components/Contests'
import About from "./components/About"
import CreateContest from "./components/CreateContest"
import Leaderboards from "./components/Leaderboards"
import Submissions from "./components/Submissions"
import SideBar from "./components/SideBar"
import Settings from "./components/Settings"
import Logout from "./components/Logout"
import SubmitQuery from "./components/SubmitQuery"
import ViewLeaderboard from "./components/ViewLeaderboard"
import ViewEvaluationResult from "./components/ViewEvaluationResult"
import CreateContestPage2 from "./components/CreateContestPage2"
import CreateContestPage3 from "./components/CreateContestPage3"
import Authentic from "./components/authentic/Authentic"
import ViewSubmissionResult from "./components/ViewSubmissionResult"

function App() {

  // *DEFINE ALL DATA* //
  // Define all data used in the webapp
  // Note, all data must be imported here and then just passed further into the components

  const [users, setUsers] = useState([])

  const [competitionName, setcompetitionName] = useState()

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('profile')))

  const [isAuth, setIsAuth] = useState(userInfo === null ? false : true)

  const [contests, setContests] = useState([])

  const [dbqueries, setDbqueries] = useState([])

  const [tableQueries, setTableQueris] = useState([])

  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  const [competitionSubmissions, setCompetitionSubmissions] = useState([])

  const [userSubmissions, setUserSubmissions] = useState([])

  // GET USER
  const user = userInfo

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  },[])

  useEffect(() => {
    getUserInfo(JSON.parse(localStorage.getItem('profile')))
  }, [])

  useEffect(() => {
    setIsAuth(userInfo === null ? false : true)
  }, [])

  // *FETCH USERS FROM SERVER* //
  // Note: after connecting backend, edit only the backend url (i.e. "http://localhost:5000/users")
  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer) 
    }

    getUsers()
  }, [])

  // Fetch Users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users")
    const data = await res.json()
    
    return data
  }

  // ** //

  // *FETCH CONTESTS FROM SERVER* //
  // Note: after connecting backend, edit only the backend url (i.e. "http://localhost:5000/users")
  useEffect(() => {
    const getContests = async () => {
      const contestsFromServer = await fetchContests()
      setContests(contestsFromServer) 
    }

    getContests()
  }, [])

  // Fetch Contests
  const fetchContests = async () => {
    const res = await fetch("http://localhost:4000/api/getApi/getCompetitionsAll")
    const data = await res.json()
    return data.eventArr
  }

    // *FETCH SUBMISSIONS FOR A USER FROM SERVER* //
    useEffect(() => {
      const getUserSubmissions = async () => {
        const submissionsFromServer = await fetchUserSubmissions()
        setUserSubmissions(submissionsFromServer) 
      }
  
      getUserSubmissions()
    }, [])
  
    // Fetch Contests
    const fetchUserSubmissions = async () => {
      const useremail = user?.useremail
      if(user?.usertype !== "admin"){
        const res = await fetch(`http://localhost:4000/api/getApi/user/${useremail}`)
        const data = await res.json()
        return data
      }
     
    }

// * ALL DB MANIPULATING PROCEDURES AND FUNCTIONS ARE IN THIS BLOCK * //
// Add Submitted Query
 const addQuery = async (submitted_query) => {
  //const competitionName = "real"
  const competitionName = submitted_query.contestTitle
  const query = submitted_query.query
  const useremail = submitted_query.userId
  const res = await fetch(`http://localhost:4000/api/submission/submit`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({q:query, competition:competitionName, id:useremail})
  })

 }

 // Get queries from createContestPage2 for Contest addition
 // save the queries in tableQueries table of DB
 const addTableQ = async (tableQ) => {
    const res = await fetch("http://localhost:4000/api/ce2/runQueries", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(tableQ)
    })
}

// Add question to DB
const addQuestion= async (question) => {
  const res = await fetch("http://localhost:4000/api/ce2/questions", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(question)
  })
}

// Add contest
const addContest = async (contest) => {
  const res = await fetch("http://localhost:4000/api/ce2/ce", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(contest)
  })

  setcompetitionName(contest.competitionName)

}

// Delete Contest
const deleteContest = async (id) => {
  // cascading deletion of tables (backend should complete this. I have fetched all tables for the contest about to be deleted)
  // get tables for the contest  
  const cont = await fetch(`http://localhost:5000/contests/${id}`)
  const contest = await cont.json()
  
  const tables_to_delete_in_db = contest.tables

  //TODO: get every table in the tables_to_delete_in_db array and run DELETE [table] FROM DB for each table
  // YOUR CODE HERE
  
  // delete contest by ID
  await fetch(`http://localhost:5000/contests/${id}`, {
    method: "DELETE"
  })

  setContests(contests.filter((contest) => contest.id !== id))
}

// ** //

// * OTHER USEFUL FUNCTIONS ARE HERE * //

// Toggle reminder to remind user of close deadlines.
const toggleReminder = (id) => {
  setContests(contests.map((contest) => contest.id === id
  ? { ...contest, reminder: !contest.reminder } : contest))
}

// ** //

// get current url for the purpose of updating highlights in sidebar "Admin", user
const currentUrl = "/"+(window.location.href).split("/").slice(-1)

const changeCurrentPath = async (path) => {
  setCurrentPath(path);
}

const changeIsAuth = (value) => {
  setIsAuth(value)
}


const getUserInfo = async (userInfo) => {
  setUserInfo(userInfo)
  setIsAuth(userInfo === null ? false : true)
}

  return (
  
    <Router>
      <div className={currentPath === "/login" ? "login_flex" : "flex"}>
        <SideBar user={user} url={currentUrl}/>
        <div style={{ overflowY: "scroll" }} className="p-7 text-2xl font-semibold flex-1 h-screen">
        <Header userInfo = {userInfo} changeUserInfo = {getUserInfo} isAuth = {isAuth} changePath = {changeCurrentPath}/>
          <Routes>
            <Route path="/" exact element={ 
              (
                <>
                  {contests.length > 0 ? (
                    <Contests user={user} contests={contests} onDelete=
                    {deleteContest} onToggle={toggleReminder}/>) : 
                    ("No Contests Available")}
                </>
              )}/>
            <Route path="/login" element={<Authentic isAuth={isAuth} changeIsAuth={changeIsAuth} changeUserInfo={getUserInfo} changePath={changeCurrentPath} />}></Route>
            <Route path="/about" element={<About />} />
            <Route path="/create-contest" element={<CreateContest onAdd={addContest} />} />
            <Route path="/create-contest-p2" element={<CreateContestPage2 onAdd={addTableQ}  onAddQuestion={addQuestion} competitionName={competitionName}/>} />
            <Route path="/create-contest-p3" element={<CreateContestPage3/>} />
            <Route path="/leaderboards" element={<Leaderboards user={user} leaderboards={contests}/>} />
            <Route path="/submissions" element={<Submissions dbqueries={userSubmissions} user={user} contests={contests}/>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout user={user}/>} />
            <Route path="/view-leaderboard/:id" element={<ViewLeaderboard users={users} user={user} contests={contests} submissions={competitionSubmissions} />} />
            <Route path="/submit-query/:id" element={<SubmitQuery onAdd={addQuery} user={user} contests={contests}/>} />
            <Route path="/view-eval-result/:id" element={<ViewEvaluationResult user={user} submissions={competitionSubmissions} contests={contests} />} />
            <Route path="/view-submission-result/:id" element={<ViewSubmissionResult user={user} submissions={competitionSubmissions} contests={contests} dbqueries={dbqueries}/>} />
          </Routes>
          <Footer user={user} />
      </div>
    </div>
    </Router>
  );
}

export default App;
