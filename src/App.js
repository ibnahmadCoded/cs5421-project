import { useState, useEffect } from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
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
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {

  // *DEFINE ALL DATA* //
  // Define all data used in the webapp
  // Note, all data must be imported here and then just passed further into the components

  const [users, setUsers] = useState([])

  const [contests, setContests] = useState([])

  const [dbqueries, setDbqueries] = useState([])

  const [tableQueries, setTableQueris] = useState([])

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
    const res = await fetch("http://localhost:5000/contests")
    const data = await res.json()
    
    return data
  }
  // ** //

  // *FETCH TABLEQUERIES (queries for creating contest by Admin) FROM SERVER* //
  // Note: after connecting backend, edit only the backend url (i.e. "http://localhost:5000/users")
  // NOTE: to use the tableQueries table, u fetech each query in the queries array and run. this should be done
  // often as no contest can hold without it. If you think of a better algo for this, the place to edit is CreateContestPage2.js
  // NOTE: when a contest is deleted, get a list of all its tables and run quries to delete those tables from
  // the backend

  useEffect(() => {
    const getTBQ = async () => {
      const tbqueriesFromServer = await fetchTBQ()
      setTableQueris(tbqueriesFromServer) 
    }

    getTBQ()
  }, [])

  // Fetch TableQueries
  const fetchTBQ = async () => {
    const res = await fetch("http://localhost:5000/tableQueries")
    const data = await res.json()
    
    return data
  }
  // ** //

  // *FETCH DBQUERIES (queries submitted by students) FROM SERVER* //
  // Note: after connecting backend, edit only the backend url (i.e. "http://localhost:5000/users")
  useEffect(() => {
    const getDBQ = async () => {
      const dbqueriesFromServer = await fetchDBQ()
      setDbqueries(dbqueriesFromServer) 
    }

    getDBQ()
  }, [])

  // Fetch DBQueries
  const fetchDBQ = async () => {
    const res = await fetch("http://localhost:5000/dbqueries")
    const data = await res.json()
    
    return data
  }
  // ** //

// * ALL DB MANIPULATING PROCEDURES AND FUNCTIONS ARE IN THIS BLOCK * //
// please add fnctions for the user table here

// Add Submitted Query
 const addQuery = async (submitted_query) => {
  const res = await fetch("http://localhost:5000/dbqueries", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(submitted_query)
  })

  const data = await res.json()

  setDbqueries([...dbqueries, data])

  // how table was updated before using dummy backend

  //  const id = Math.floor(Math.random() * 10000) + 1
  //  const newQuery = { id, ...submitted_query }
  //  setDbqueries([...dbqueries, newQuery])
 }

 // Get queries from createContestPage2 for Contest addition
 // save the queries in tableQueries table of DB
 const addTableQ = async (tableQ) => {
    const res = await fetch("http://localhost:5000/tableQueries", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(tableQ)
    })

    const data = await res.json()

    setTableQueris([...tableQueries, data])

    // how updating db was done before using dummy backend

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTableQ = { id, ...tableQ }
    // setTableQueris([...tableQueries, newTableQ])
}

// Add contest
const addContest = async (contest) => {
  const res = await fetch("http://localhost:5000/contests", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(contest)
  })

  const data = await res.json()

  setContests([...contests, data])

  // how contests table was updated before using dmmy backend

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newContest = { id, ...contest }
  // setContests([...contests, newContest])
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

// TODO: change this to get user_id by session 
// Add new user to DB
const addUser = async (newUser) => {
  const res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(newUser)
  })

  const data = await res.json()

  setUsers([...users, data])

  // how updating db was done before using dummy backend

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTableQ = { id, ...tableQ }
  // setTableQueris([...tableQueries, newTableQ])
}

// Get User with id = 1. This should be passed from backend after signIn
const user = users.filter((user) => user.id === 1)
// console.log(user)

// get current url for the purpose of updating highlights in sidebar
const currentUrl = "/"+(window.location.href).split("/").slice(-1)

// Login
const isLoggedIn = false

// const [user, setUser] = useState(0)
// const [isLoggedIn, setIsLoggedIn] = useState(false)
 const newLogin =  async(loginData) => {
//   // const isLoggedIn = true
//   // setUser(users.filter((use) => use.NUSid === loginData.loginId))
//   // setIsLoggedIn(true)
//   // users.filter((use) => use.NUSid === loginId)
//   // console.log(loginData)
//   // console.log(users.filter((use) => use.NUSid === loginData.loginId).map(u => {return u.id})[0])
  
   }

  

  return (
    <Router>
      <div className="flex">
        {isLoggedIn ?  //is user logged in? show everthing, else show login page
        <>
          <SideBar user={user} url={currentUrl} />
          <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          <Header />
            <Routes>
              <Route path="/" exact element={ 
                (
                  <>
                    {contests.length > 0 ? (
                      <Contests dbqueries={dbqueries} user={user} contests={contests} onDelete=
                      {deleteContest} onToggle={toggleReminder}/>) : 
                      ("No Contests Available")}
                  </>
                )}/>
              <Route path="/about" element={<About />} />
              <Route path="/create-contest" element={<CreateContest onAdd={addContest} />} />
              <Route path="/create-contest-p2" element={<CreateContestPage2 user={user} onAdd={addTableQ}/>} />
              <Route path="/create-contest-p3" element={<CreateContestPage3/>} />
              <Route path="/leaderboards" element={<Leaderboards user={user} leaderboards={contests}/>} />
              <Route path="/submissions" element={<Submissions dbqueries={dbqueries} user={user} contests={contests}/>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout user={user}/>} />
              <Route path="/view-leaderboard/:id" element={<ViewLeaderboard users={users} user={user} contests={contests} dbqueries={dbqueries}/>} />
              <Route path="/submit-query/:id" element={<SubmitQuery onAdd={addQuery} user={user} contests={contests}/>} />
              <Route path="/view-eval-result/:id" element={<ViewEvaluationResult user={user} contests={contests} dbqueries={dbqueries}/>} />
              {/* <Route path="/login" element={<Login onAdd={newLogin} />} />
              <Route path="/signup" element={<Signup onAdd={addUser} users={users} />} /> */}
            </Routes>
            <Footer user={user} />
        </div> 
        </> 
        : 
        <Routes>
          
          <Route path="/" element={<Login onAdd={newLogin} users={users} />} />
          <Route path="/signup" element={<Signup onAdd={addUser} users={users} />} />
        </Routes>
        }
    </div>
    </Router>
  );
}

export default App;
