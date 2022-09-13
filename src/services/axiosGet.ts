import React from 'react'
import axios, { AxiosRequestConfig } from 'axios';

export async function axiosGet(url: string) {
    const options: AxiosRequestConfig = {
        timeout: 3000,
        method: "get"
    };
    try {
        const res = await axios.get(url, options);
        return res;
    }
    catch (err) {
        console.log(err);
    }
}