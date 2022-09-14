import axios, { AxiosRequestConfig } from 'axios';

async function swapiGetter(slug: string, id: string) {
  const options: AxiosRequestConfig = {
    baseURL: "https://swapi.dev/api/",
    timeout: 3000,
    method: "get"
  };

  try {
    let query = slug;
    if (id.length > 0) {
      query = query + '/' + id;
    }
    const res = await axios.get(query, options);
    if (res.status !== 200) {
      // test for status you want, etc
      console.log(res.status)
    }
    return res.data;
  }
  catch (err) {
    console.error(err);
  }
}

export default swapiGetter;
