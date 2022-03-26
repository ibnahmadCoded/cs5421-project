import { useState } from "react"
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

function App() {

  const users = 
    [
        {
            id: 1,
            username: "DZ12345AB",
            userType: "Admin",
            createdAt: "Mar 10th at 2:30pm",
        },
        {
          id: 2,
          username: "AF12345CD",
          userType: "Student",
          createdAt: "Mar 10th at 2:30pm",
        },
        {
          id: 3,
          username: "GA12345PO",
          userType: "Student",
          createdAt: "Mar 10th at 2:30pm",
        },
    ]

  const [contests, setContests] = useState(
    [
        {
            id: 1,
            title: "Find Maximum Execution Time",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing. Lorem ipsum dolor sit amet, consectetur adipiscing ",
            startDate: "Mar 10th at 2:30pm",
            endDate: "Mar 30th at 2:30pm",
            maxTries: 1,
            maxExecutionTime: 200,
            expectedResult: "abc",
            tables: ["Table1", "Table2", "Table3"],
            reminder: false,
        },
        {
            id: 2,
            title: "Find Minimum Execution Time",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing. Lorem ipsum dolor sit amet, consectetur adipiscing ",
            startDate: "Mar 10th at 2:30pm",
            endDate: "Mar 30th at 2:30pm",
            maxTries: 1,
            maxExecutionTime: 200,
            expectedResult: "abc",
            tables: ["Table11", "Table21", "Table31"],
            reminder: true,
        },
        {
            id: 3,
            title: "Find Equal Execution Time",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing. Lorem ipsum dolor sit amet, consectetur adipiscing ",
            startDate: "Mar 10th at 2:30pm",
            endDate: "Mar 30th at 2:30pm",
            maxTries: 1,
            maxExecutionTime: 200,
            expectedResult: "abc",
            tables: ["Tablex", "Tabley", "Tablez"],
            reminder: true,
        },
        {
          id: 5,
          title: "Find Nothing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing. Lorem ipsum dolor sit amet, consectetur adipiscing ",
          startDate: "Mar 10th at 2:30pm",
          endDate: "Mar 30th at 2:30pm",
          maxTries: 1,
          maxExecutionTime: 200,
          expectedResult: "abc",
          tables: ["Tablex", "Tabley", "Tablez"],
          reminder: true,
        }
    ]
)

  const [dbqueries, setDbqueries] = useState(
    [
        {
            id: 1,
            userId: 2,
            contestId: 1,
            submissionDate: "Mar 10th at 2:30pm",
            executionTime: 2,
            planningTime: 0,
            result: "abc",
            query: "SELECT * FROM A",
        },
        {
            id: 2,
            userId: 2,
            contestId: 1,
            submissionDate: "Mar 10th at 2:30pm",
            executionTime: 3,
            planningTime: 0,
            result: "abcd",
            query: "SELECT * FROM A",
        },
        {
            id: 3,
            userId: 2,
            contestId: 3,
            submissionDate: "Mar 10th at 2:30pm",
            executionTime: 5,
            planningTime: 0,
            result: "abc",
            query: "SELECT * FROM A",
        },
        {
          id: 4,
          userId: 3,
          contestId: 3,
          submissionDate: "Mar 1th at 2:30pm",
          executionTime: 1,
          planningTime: 0,
          result: "abc",
          query: "SELECT * FROM A",
        },
    ]
  )

// Add Submitted Query
 const addQuery = (submitted_query) => {
   const id = Math.floor(Math.random() * 10000) + 1
   const newQuery = { id, ...submitted_query }
   setDbqueries([...dbqueries, newQuery])
 }

// Delete Contest
const deleteContest = (id) => {
  setContests(contests.filter((contest) => contest.id !== id))
}

// Toggle reminder to remind user of close deadlines.
const toggleReminder = (id) => {
  setContests(contests.map((contest) => contest.id === id
  ? { ...contest, reminder: !contest.reminder } : contest))
}

// Get User with id = 1. This should be passed from backend after signIn
const user = users.filter((user) => user.id === 1)

// get current url for the purpose of updating highlights in sidebar
const currentUrl = "/"+(window.location.href).split("/").slice(-1)

  return (
    <Router>
      <div className="flex">
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
            <Route path="/create-contest" element={<CreateContest />} />
            <Route path="/leaderboards" element={<Leaderboards user={user} leaderboards={contests}/>} />
            <Route path="/submissions" element={<Submissions dbqueries={dbqueries} user={user} contests={contests}/>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout user={user}/>} />
            <Route path="/view-leaderboard/:id" element={<ViewLeaderboard users={users} user={user} contests={contests} dbqueries={dbqueries}/>} />
            <Route path="/submit-query/:id" element={<SubmitQuery onAdd={addQuery} user={user} contests={contests}/>} />
            <Route path="/view-eval-result/:id" element={<ViewEvaluationResult user={user} contests={contests} dbqueries={dbqueries}/>} />
          </Routes>
          <Footer user={user} />
      </div>
    </div>
    </Router>
  );
}

export default App;
