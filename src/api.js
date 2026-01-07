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

export async function getUsers(token){
  const authHead = `Token ${token}`;

  const response = await fetch('https://test-assignment.emphasoft.com/api/v1/users/',{
    method: 'GET',
    headers: {
      'Authorization': authHead,
    }
  })

  const data = await response.json();

  if(!response.ok) {
    throw new Error('Http error, status = ' + response.status);
  }

  return data;
}

export async function getUser(token, userId){
  const authHead = `Token ${token}`;

  const response = await fetch(`https://test-assignment.emphasoft.com/api/v1/users/${userId}`,
  {
    method: 'Get',
    headers: {
      'Authorization': authHead,
    }
  })

  const data = await response.json();

  if(!response.ok) {
    throw new Error('Http error, status = ' + response.status);
  }

  return data;
}

export async function putUser(token, user){
  const authHead = `Token ${token}`

  const response = await fetch(`https://test-assignment.emphasoft.com/api/v1/users/${user.id}`, 
  {
    method: 'PUT',
    headers: {
      'Authorization': authHead,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      is_active: user.is_active
    })
  })

  const data = await response.json();

  if(!response.ok) {
    throw data;
  }

  return data;
}

export async function deleteUser(token, userId){
  const authHead = `Token ${token}`

  const response = await fetch(`https://test-assignment.emphasoft.com/api/v1/users/${userId}`,
  {
    method: 'DELETE',
    headers: {
      'Authorization': authHead,
    },
  }
  );
  if(!response.ok) {
    throw new Error('Http error, status = ' + response.status);
  }

  if (response.status === 204) return null;

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}