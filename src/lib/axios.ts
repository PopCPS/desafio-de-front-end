import axios from 'axios'

export const api = axios.create({
  baseURL: "https://api.weatherapi.com/v1/forecast.json?key=a03965b1f5fc41e0b3d171856243107&q="
})