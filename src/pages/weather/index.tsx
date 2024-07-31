import { ArrowLeft, MoveUp, MoveDown } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { useEffect, useState } from "react"
import PuffLoader from "react-spinners/PuffLoader"
import { WeatherData } from "../../lib/interfaces/weather-data"
import { LocationInfo } from "../../lib/interfaces/location-info"
import { ForecastToday } from "../../lib/interfaces/forecast-today"
import { ForecastHour } from "../../lib/interfaces/forecast-hour"
import { TodayAstro } from "../../lib/interfaces/today-astro"

export const Weather = () => {

  const [ currentWeather, setCurrentWeather ] = useState<WeatherData | null>(null)
  const [ locationInfo, setLocationInfo ] = useState<LocationInfo | null>(null)
  const [ forecastToday, setForecastToday ] = useState<ForecastToday | null>(null)
  const [ forecastDawn, setForecastDawn ] = useState<ForecastHour | null>(null)
  const [ forecastMorning, setForecastMorning ] = useState<ForecastHour | null>(null)
  const [ forecastAfternoon, setForecastAfternoon ] = useState<ForecastHour | null>(null)
  const [ forecastNight, setForecastNight ] = useState<ForecastHour | null>(null)
  const [ todayAstro, setTodayAstro ] = useState<TodayAstro | null>(null)
  
  const [ loading, setLoading ] = useState<boolean>(true)
  const { city } = useParams()

  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°`
  }

  useEffect(() => {
    if(currentWeather) {
      setLoading(false)
    }
  }, [currentWeather])

  useEffect(() => {
    if(city) {
      api.get(city).then(response => {
        setCurrentWeather(response.data.current)
        setLocationInfo(response.data.location)
        setTodayAstro(response.data.forecast.forecastday[0].astro)
        setForecastToday(response.data.forecast.forecastday[0].day)
        setForecastDawn(response.data.forecast.forecastday[0].hour[3])
        setForecastMorning(response.data.forecast.forecastday[0].hour[9])
        setForecastAfternoon(response.data.forecast.forecastday[0].hour[15])
        setForecastNight(response.data.forecast.forecastday[0].hour[21])
      })
    }
  }, [city])  

  return (
    <div className="h-screen text-zinc-50 bg-zinc-950">
      {!loading ? (
        <div className="flex flex-col items-center gap-12 p-2 lg:gap-16">
          
          <button className="self-start">
            <Link to={'/'}>
              <ArrowLeft className="size-12" />
            </Link>
          </button>
    
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center">
              <h1 className="text-5xl">{locationInfo.name}</h1>
              <h3 className="text-lg">{currentWeather.condition.text}</h3>
            </div>
    
            <div className="flex justify-center">
              <h2 className="text-9xl">{Math.round(currentWeather.temp_c)}</h2>
              <div className="flex flex-col justify-between py-4">
                <div className="text-2xl w-fit self-end">°C</div>
                <div>
                  <div className="flex justify-between items-center">
                    <MoveUp className="size-4" />
                    <span>{formatTemp(forecastToday.maxtemp_c)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <MoveDown className="size-4" />
                    <span>{formatTemp(forecastToday.mintemp_c)}</span>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="flex justify-center">
              <img 
                src={currentWeather.condition.icon.replace('64x64', '128x128')}
                alt={currentWeather.condition.text} 
                className="size-40"
              />
            </div>
          </div>
    
          <div className="grid grid-cols-4 gap-4 md:w-4/6">
            
            <div className="flex flex-col items-center">
              <span>morning</span>
              <img 
                src={forecastMorning.condition.icon} 
                alt={forecastMorning.condition.text}  
                className="size-16"
              />
              <span>{formatTemp(forecastMorning.temp_c)}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>afternoon</span>
              <img 
                src={forecastAfternoon.condition.icon} 
                alt={forecastAfternoon.condition.text}  
                className="size-16"
              />
              <span>{formatTemp(forecastAfternoon.temp_c)}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>night</span>
              <img 
                src={forecastNight.condition.icon} 
                alt={forecastNight.condition.text}  
                className="size-16"
              />
              <span>{formatTemp(forecastNight.temp_c)}</span>
            </div>
          </div>
    
          <div className="grid grid-cols-2 gap-y-3 xs:flex xs:items-center xs:justify-center gap-4">
    
            <div className="flex flex-col items-center gap-1">
              <span>wind speed</span>
              <span>{currentWeather.wind_kph} km/h</span>
            </div>
            <div className="w-px h-8 bg-gray-800 hidden xs:block" />
            <div className="flex flex-col items-center gap-1">
              <span>sunrise</span>
              <span>{todayAstro.sunrise}</span>
            </div>
            <div className="w-px h-8 bg-gray-800 hidden xs:block" />
            <div className="flex flex-col items-center gap-1">
              <span>sunset</span>
              <span>{todayAstro.sunset}</span>
            </div>
            <div className="w-px h-8 bg-gray-800 hidden xs:block" />
            <div className="flex flex-col items-center gap-1">
              <span>humidity</span>
              <span>{currentWeather.humidity}%</span>
            </div>
    
          </div>
    
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <PuffLoader 
            size={150}
            color="#fafafa"
          />
        </div>
      )}
    </div>
  )
}