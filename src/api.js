export async function getUsers(token){
  const authHead = `Token ${token}`;

  const response = await fetch('https://test-assignment.emphasoft.com/api/v1/users/',{
    method: 'GET',
    headers: {
      "Authorization": authHead,
    }
  })

  const data = await response.json();

  if(!response.ok){
    throw new Error('Http error, status = ' + response.status);
  }

  return data;
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
    
    return data;
}