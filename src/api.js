async function fetchApi(url, responseData){
  let response;

  try {
    response = await fetch(url, responseData);
  }
  catch(originalError){
    throw new Error('NETWORK_ERROR', {cause: originalError});
  }

  const raw = await response.text();
  let data;

  try {
    data = raw ? JSON.parse(raw) : null;
  }
  catch {
    data = null;
  }

  if(!response.ok){        
    const error = new Error('HTTP_ERROR');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
}

export function loginUser({username, password}){
  const data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({username: username, password: password}),
    }

  return fetchApi("https://test-assignment.emphasoft.com/api/v1/login/", data);
}

export function getUsers(token){
  const authHead = `Token ${token}`;

  const data = {
    method: 'GET',
    headers: {
      'Authorization': authHead,
    }
  }

  return fetchApi('https://test-assignment.emphasoft.com/api/v1/users/',data);
}

export function getUser(token, userId){
  const authHead = `Token ${token}`;
  
  const data = {
    method: 'GET',
    headers: {
      'Authorization': authHead,
    }
  }

  return fetchApi(`https://test-assignment.emphasoft.com/api/v1/users/${userId}`, data);
}

export function putUser(token, user){
  const authHead = `Token ${token}`

  const data = {
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
  }

  return fetchApi(`https://test-assignment.emphasoft.com/api/v1/users/${user.id}`, data);
}

export function deleteUser(token, userId){
  const authHead = `Token ${token}`;

  const data = {
    method: 'DELETE',
    headers: {
      'Authorization': authHead,
    },
  }

  return fetchApi(`https://test-assignment.emphasoft.com/api/v1/users/${userId}`, data);
}

export function postUser(token, user){
  const authHead = `Token ${token}`;

  const data = {
    method: 'POST',
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
  }

  return fetchApi('https://test-assignment.emphasoft.com/api/v1/users/', data);
}