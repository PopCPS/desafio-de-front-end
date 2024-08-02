import { ForecastHour } from "../../lib/interfaces/forecast-hour"

interface WeatherTimePeriodProps {
  isMetric: boolean
  forecastHour: ForecastHour | null,
  formatTemp: (arg0: number) => string
}

export const SectionWeatherTimePeriod = ({ 
  isMetric,
  forecastHour, 
  formatTemp, 
}: WeatherTimePeriodProps) => {

  const hourOfDay = [ 3, 9, 15, 21 ]
  const timeOfDay = [ 'dawn', 'morning', 'afternoon', 'night' ]

  return (
    <>
      {forecastHour && (
        <div className="grid grid-cols-4 gap-4 select-none xl:w-[450px]">
        {hourOfDay.map((hourOfDay, index) => {

          return (
            <div key={timeOfDay[index]} className="flex flex-col items-center md:gap-2">
              <span>{timeOfDay[index]}</span>
                <img 
                  src={forecastHour.hour[hourOfDay].condition.icon} 
                  alt={forecastHour.hour[hourOfDay].condition.text}  
                  className="size-16"
                />
              <span className="text-lg">
                {isMetric ? (
                  formatTemp(forecastHour.hour[hourOfDay].temp_c)
                ) : (
                  formatTemp(forecastHour.hour[hourOfDay].temp_f)
                )}
                </span>
            </div>
          )})
        }
      </div>  
      )}
    </>
  )
}
