import { ArrowLeft, MoveUp, MoveDown, } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { useEffect, useRef, useState } from "react"
import PuffLoader from "react-spinners/PuffLoader"
import { WeatherData } from "../../lib/weather-data"
import { LocationInfo } from "../../lib/interfaces/location-info"
import { ForecastToday } from "../../lib/interfaces/forecast-today"
import { ForecastHour } from "../../lib/interfaces/forecast-hour"
import { TodayAstro } from "../../lib/interfaces/today-astro"
import { SectionWeatherTimePeriod } from "./section-weather-time-pediod"
import { isDayTime } from "../../lib/set-bg"

export const CityWeather = () => {

  const [ currentWeather, setCurrentWeather ] = useState<WeatherData | null>(null)
  const [ locationInfo, setLocationInfo ] = useState<LocationInfo | null>(null)
  const [ forecastToday, setForecastToday ] = useState<ForecastToday | null>(null)
  const [ forecastHour, setForecastHour ] = useState<ForecastHour | null>(null)
  const [ todayAstro, setTodayAstro ] = useState<TodayAstro | null>(null)
  
  const [ isMetric, setIsMetric ] = useState(true)
  const [ isDay, setIsDay ] = useState<boolean | null>(null)
  const [ isMainWeatherImageLoaded , setIsMainWeatherImageLoaded ] = useState(false)
  
  const [ loading, setLoading ] = useState<boolean>(true)
  const { city } = useParams()

  const imageRef = useRef<HTMLImageElement | null>(null)

  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°`
  }

  const handleMeasurementUnit = () => {
    setIsMetric(!isMetric)
  }
  
  useEffect(() => {
    if(isDay === false) {
      document.body.classList.add('dark')
    }
    if(isDay === true) {
      document.body.classList.remove('dark')
    }
  }, [isDay])

  useEffect(() => {
    if(currentWeather) {
      setLoading(false)
    }
  }, [currentWeather])

  useEffect(() => {
    if(todayAstro && locationInfo) {
      const hourNow = locationInfo.localtime.match(/\d{1,2}:\d{2}/)
      if(hourNow) {
        setIsDay(isDayTime(todayAstro.sunrise, todayAstro.sunset, hourNow[0]))
      }
    }
  }, [locationInfo, todayAstro])

  useEffect(() => {
    if(city) {
      api.get(city).then(response => {
        setCurrentWeather(response.data.current)
        setLocationInfo(response.data.location)
        setTodayAstro(response.data.forecast.forecastday[0].astro)
        setForecastToday(response.data.forecast.forecastday[0].day)
        setForecastHour(response.data.forecast.forecastday[0])
      })
    }
  }, [city])  

  return (
    <div onClick={()=>{console.log()}} className="h-screen font-extraligh text-zinc-950 bg-gradient-to-t from-sky-500 to-sky-300 dark:text-zinc-50 dark:from-slate-950 dark:to-blue-950">
      {!loading ? (
        <div className="flex flex-col items-center gap-12 p-2 lg:gap-16">
          
          <div className="md:w-4/6 xl:w-[450px]">
            <button className="self-start duration-300 hover:scale-125">
              <Link to={'/'}>
                <ArrowLeft strokeWidth={1} className="size-12" />
              </Link>
            </button>
          </div>
    
          {currentWeather && locationInfo && forecastToday ? (
            <div data-testid='main-content' className="flex flex-col gap-4 select-none cursor-pointer">
              <div className="flex flex-col items-center">
                <h1 className="text-5xl">{locationInfo.name}</h1>
                <h3 className="text-lg">{currentWeather.condition.text}</h3>
              </div>
            
              <div onClick={handleMeasurementUnit} className="flex justify-center transition-transform duration-300 hover:scale-110">
                <h2 className="text-9xl">
                  {isMetric ? (
                    Math.round(currentWeather.temp_c)
                  ) : (
                    Math.round(currentWeather.temp_f)
                  )}
                </h2>
                <div className="flex flex-col justify-between py-4">
                  <div className="text-2xl w-fit self-end">
                    {isMetric ? (
                      '°C'
                    ) : (
                      '°F'
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <MoveUp className="size-4 text-zinc-400 dark:text-zinc-500" />
                      <span>
                        {isMetric ? (
                          formatTemp(forecastToday.maxtemp_c)
                        ) : (
                          formatTemp(forecastToday.maxtemp_f)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <MoveDown className="size-4 text-zinc-400 dark:text-zinc-500" />
                      <span>
                        {isMetric ? (
                          formatTemp(forecastToday.mintemp_c)
                        ) : (
                          formatTemp(forecastToday.mintemp_f)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
      
              <div onClick={()=>{console.log(imageRef)}} className="flex justify-center">
                <img 
                  ref={imageRef}
                  onLoad={() => {
                    if(imageRef.current) {
                      imageRef.current.classList.remove('hidden')
                      setIsMainWeatherImageLoaded(true)
                    }
                  }}
                  src={currentWeather.condition.icon.replace('64x64', '128x128')}
                  alt={currentWeather.condition.text} 
                  className="size-40 hidden"
                />
                {!isMainWeatherImageLoaded && (
                  <PuffLoader 
                    size={160}
                    color="#fafafa" 
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <PuffLoader 
                size={40}
                color="#fafafa"
              />
            </div>
          )}
    
          <SectionWeatherTimePeriod 
            isMetric={isMetric}
            forecastHour={forecastHour}
            formatTemp={formatTemp}
          />
    
          {currentWeather && todayAstro && (
            <div className="grid grid-cols-2 gap-y-3 gap-4 select-none xs:flex xs:items-center xs:justify-center">
    
              <div className="flex flex-col items-center gap-1">
                <span>wind speed</span>
                <span data-testid='wind-speed'>
                  {isMetric ? (
                    `${currentWeather.wind_kph} km/h`
                  ) : (
                    `${currentWeather.wind_mph} mph`
                  )}
                </span>
              </div>
              <div className="w-px h-8 bg-gray-800 hidden xs:block" />
              <div className="flex flex-col items-center gap-1">
                <span>sunrise</span>  
                <span data-testid='sunrise'>{todayAstro.sunrise}</span>
              </div>
              <div className="w-px h-8 bg-gray-800 hidden xs:block" />
              <div className="flex flex-col items-center gap-1">
                <span>sunset</span>
                <span data-testid='sunset'>{todayAstro.sunset}</span>
              </div>
              <div className="w-px h-8 bg-gray-800 hidden xs:block" />
              <div className="flex flex-col items-center gap-1">
                <span>humidity</span>
                <span data-testid='humidity'>{currentWeather.humidity}%</span>
              </div>
      
            </div>
          )}
    
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