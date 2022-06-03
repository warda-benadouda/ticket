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

export async function getDepartement(id , departement){

  const response = await axios.get(`${URL}/${id}` , departement)
  const data = response.data
  if (response.status > 400) {
      throw new Error(data)
    }
    return 'hydra:member' in data ? data["hydra:member"] : data;
}


export async function addDepartement(departement) {
  const response = await axios.post(URL, departement);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function updateDepartement(  id , departement) {

  const response = await axios.put(`${URL}/${id}` , departement );
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