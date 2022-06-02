import axios from "axios";
export const URL = `/api/companies`;


export async function getCompanies(filter = ""){

  const response = await axios.get(URL)
  const data = response.data

  if (response.status > 400) {
      throw new Error(data)
    }
    return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function getCompany(id){

    const response = await axios.get(`${URL}/${id}`)
    const data = response.data
    if (response.status > 400) {
        throw new Error(data)
      }
      return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function addCompany(company) {
  const response = await axios.post(URL, company);
  const data = response.data;
  if (response.status > 400) {
    throw new Error(data.error)
  }
  return 'hydra:member' in data ? data["hydra:member"] : data;
}