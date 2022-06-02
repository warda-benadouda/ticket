import axios from "axios";
export const URL = `/api/departements`;

export async function getDepartements(){

    const response = await axios.get(URL)
    const data = response.data
    if (response.status > 400) {
        throw new Error(data)
      }
      return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function getDepartement(id , ticket){

  const response = await axios.get(`${URL}/${id}` , ticket)
  const data = response.data
  if (response.status > 400) {
      throw new Error(data)
    }
    return 'hydra:member' in data ? data["hydra:member"] : data;
}


export async function addDepartement(company) {
  const response = await axios.post(URL, company);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function updateDepartement(  id , departement) {

  const response = await axios.put(`${URL}/${id}` , company );
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data)
  }
  return data;
}

export async function deleteDepartement(id) {
  const response = await axios.delete(`${URL}/${id}`);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return data;
}