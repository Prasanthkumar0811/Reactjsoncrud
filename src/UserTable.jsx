import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteuser, getusers } from "./userservice";


function UserTable(){
 const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate=useNavigate()

   async function loadusers(){
        try{
            setError('')
            const data=await getusers()
            setUsers(data)
        }catch(err){
            setError(err.messagee)
        }finally{
            setLoading(false)
        }
    }
  useEffect(()=>{
   loadusers()
  },[])

  async function handleDelete(id){
    if(!window.confirm(`Are you sure want to delete the users ${id}`)){
        return
    }

    try{
        setError('')
        await deleteuser(id)
        loadusers()
    }catch(err){
        setError(err.message)
    }

  }
    if (loading) return <p>Loading employees...</p>;
   return (
    <>
    <h2>Employee List</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

       <button onClick={() => navigate("/add")}>
        Add Employee
      </button>

      <br />
      <br />
       <table border='1' cellPadding='10'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
            {users.length === 0 ? (
                <tr>
                    <td colSpan='7'>No Users found</td>
                </tr>
            ):
             users.map((u)=>(
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.age}</td>
                    <td>{u.address}</td>
                    <td>{u.state}</td>
                    <td>
                        <button onClick={()=>navigate(`/edit/${u.id}`)}>Edit</button>
                        <button onClick={()=>handleDelete(u.id)}>Delete</button>
                    </td>
                </tr>
             ))
            }
        </tbody>

       </table>
    </>
   )
}
export default UserTable