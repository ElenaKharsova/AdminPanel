export async function getUsers(){
  const response = await fetch('');
}

export async function loginUser({username, password}){
    const response = await fetch("https://test-assignment.emphasoft.com/api/v1/login/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({username: username, password: password}),
    })

    const data = await response.json();

    if(!response.ok){        
      throw new Error('Http error, status = ' + response.status);
    }
    
    console.log("loginUser data:", data);
    return data;
}