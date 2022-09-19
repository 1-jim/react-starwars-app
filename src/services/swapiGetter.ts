import axios, { AxiosRequestConfig } from 'axios';

async function swapiGetter(slug: string, id?: string) {
  const options: AxiosRequestConfig = {
    baseURL: "https://swapi.dev/api/",
    timeout: 10000,
    method: "get"
  };

  try {
    let query = slug;
    if (id) {
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
    return err;
  }
}

export default swapiGetter;
