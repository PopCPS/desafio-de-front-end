import axios from 'axios'

export const api = axios.create({
  baseURL: `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_Key}&q=`
})