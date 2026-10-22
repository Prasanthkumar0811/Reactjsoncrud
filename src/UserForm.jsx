import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addusers, getusersbyid, updateuser } from "./userservice"



const initialform={
    name:'',
    email:'',
    age:'',
    address:'',
    state:''
}
function UserForm(){
    const [form,setForm]=useState(initialform)
    const [error,setError]=useState('')
    const [loading,setloading]=useState(false)

    const {id}=useParams()
    const navigate=useNavigate()


    useEffect(()=>{
        setError('')
        if(id){
            setloading(true)
            getusersbyid(id).then((data)=>
            setForm({
                name:data.name ?? '',
                email:data.email ?? '',
                age:data.age ?? '',
                address:data.address ?? '',
                state:data.state ?? ''
            })
            )
            .catch((err)=>setError(err.message))
            .finally(()=>setloading(false))
        }else{
            setForm(initialform)
        }
    },[id])

    function handleChange(e){
        const {name,value}=e.target

        setForm({
            ...form,
            [name]:value
        })
    }

    async function  handlesubmit(e){
        e.preventDefault()
        setloading(true)
        setError('')

        try{
            const data={
                ...form,
                age:Number(form.age)
            }
            if(id){
                await updateuser(id,data)
            }else{
                await addusers(data)
            }

            navigate('/list')
        }catch(err){
            setError(err.message)
        }finally{
            setloading(false)
        }
    }

     if (loading && id && !form.email) {
    return <p>Loading employee...</p>;
  }

  return(
    <>
      <h2>{id ? 'Edit User' : 'Add User'}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handlesubmit}>
        <div>
          <label>Name: </label>
          <input
            type="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            min="1"
            max="120"
            required
          />
        </div>

        <br />
         <div>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <br />
         <div>
          <label>State: </label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />
        </div>

        <br />
         <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : id
              ? "Update Employee"
              : "Add Employee"}
        </button>
        {id && 
        <button onClick={()=>navigate('/list')}>Cancel</button>
        }
      </form>
    </>
  )
}
export default UserForm