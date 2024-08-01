const formatHour = (hour: string): string => { 
  const splitHour = hour.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/)
  if(splitHour) {
    const hours = parseInt(splitHour[1])
    const minutes = splitHour[2]
    const partOfDay = splitHour[3]

    if(partOfDay === 'PM') {
      return (hours + 12) + ':' +  minutes
    }

    return hours + ':' + minutes
  } else {
    return 'invalid hour format'
  }
}

export const isDayTime = (sunrise: string, sunset: string, now: string ) => {
  const sunriseArray = formatHour(sunrise).split(':')
  const sunsetArray = formatHour(sunset).split(':')
  const nowArray = now.split(':')

  const parsedSunriseArray = sunriseArray.map((number) => {
    return parseInt(number)
  })
  
  const parsedSunsetArray = sunsetArray.map((number) => {
    return parseInt(number)
  })
  
  const parsedNowArray = nowArray.map((number) => {
    return parseInt(number)
  })

  if(parsedNowArray[0] > parsedSunriseArray[0] && parsedNowArray[0] < parsedSunsetArray[0]){
    return true
  }
  return false
}

