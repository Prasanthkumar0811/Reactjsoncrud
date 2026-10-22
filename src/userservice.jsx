

const API_URL='  http://localhost:3000/users'

export async function getusers(){
        const data=await fetch(API_URL)
        if(!data.ok){
            throw new Error('Cant Fetch Data')
        }
        return data.json()
    
}
export async function getusersbyid(id){
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("User not found");
  }

  return res.json();
};
export async function addusers(emp){
    const data=await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(emp)
    })
    if(!data.ok){
        throw new Error('Cant add Data')
    }
    return data.json()
}

export async function updateuser(id,emp){
    const data=await fetch(`${API_URL}/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(emp)
    })
    if(!data.ok){
        throw new Error('Cant update')
    }
    return data.json()
}

export async function deleteuser(id){
    const data=await fetch(`${API_URL}/${id}`,{
        method:'DELETE'
    })
    if(!data.ok){
        throw new Error('Failed to delete user')
    }
    return true
}