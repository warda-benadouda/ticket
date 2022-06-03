import axios from "axios";
export const URL = `/api/users`;


export async function getUsers(filter = ""){

  const response = await axios.get(URL)
  const data = response.data

  if (response.status > 400) {
      throw new Error(data)
    }
    return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function getUser(id){

    const response = await axios.get(`${URL}/${id}`)
    const data = response.data
    if (response.status > 400) {
        throw new Error(data)
      }
      return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function addUser(user) {
  const response = await axios.post(URL, user);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function updateUser(  id , user ) {

  const response = await axios.put(`${URL}/${id}` , user );
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data)
  }
  return data;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${URL}/${id}`);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return data;
}