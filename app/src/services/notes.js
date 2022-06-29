import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  let config = {
    headers: {
      'Authorization': token ? token 
                             : `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser'))?.token}` || ''
    }
  };
  console.log(config);
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.post(baseUrl, newObject, config);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const config = {
    headers: {
      'Authorization': token ? token 
                             : `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser'))?.token}` || ''
    }
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }