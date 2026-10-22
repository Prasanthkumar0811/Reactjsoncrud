import { Link, Routes, Route } from "react-router-dom";
import UserForm from "./UserForm";
import UserTable from "./UserTable";



export default function Navbar(){
    return(
        <>
        <nav>
            <Link to='/'>Home</Link> {'|'}
            <Link to='/add'>Add User</Link>{'|'}
            <Link to='/list'>User List</Link>{'|'}
        </nav>
        <hr />

        <Routes>
            <Route
            path="/"
            element={<h1>Welcome to User Management System</h1>}
            ></Route>

            <Route
            path="/add"
            element={<UserForm />}
            >
            </Route>

            <Route
            path="/edit/:id"
            element={<UserForm />}
            >
            </Route>
            
            <Route
            path="/list"
            element={<UserTable />}
            ></Route>
        </Routes>
        </>
    )
}