import axios from "axios";

export const URL = `/api/tickets`; 
export const ADMIN_URL = `/api/users/{id}/tickets`;

export async function getSuperAdminTickets( filter) {
    let url =  URL + (filter ? filter : "")
    const response = await axios.get( url);
    const data = response.data;
    if (response.status > 400) {
      throw new Error(data)
    }
    return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function getAdminTickets(  id , filter) {
  let admurl =  ADMIN_URL + (filter ? filter : "")
  const response = await axios.get( admurl.replace('{id}' , id ));
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data)
  }
  return data;
}

export async function getTicket(  id ) {

  const response = await axios.get(`${URL}/${id}`);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data)
  }
  return data;
}

export async function updateTicket(  id , ticket) {

  const response = await axios.put(`${URL}/${id}` , ticket );
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data)
  }
  return data;
}

export async function addTicket(ticket) {
  const response = await axios.post(URL, ticket);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function deleteTicket(id) {
  const response = await axios.delete(`${URL}/${id}`);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return 'hydra:member' in data ? data["hydra:member"] : data;
}