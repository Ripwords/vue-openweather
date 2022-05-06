/**
 * It takes a time in seconds and an offset in seconds and returns a new Date object with the timezone
 * offset applied
 * @param {number} time - the time in seconds since the epoch
 * @param {number} offset - The offset of the timezone you want to convert to.
 * @returns A Date object.
 */
export const convertTimeZone = (time: number, offset: number) => {
  const date = new Date((time + offset) * 1000)
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
  const nd = new Date(utc)
  return nd
}

/**
 * It takes a UTC time and an offset and returns a date in the format of "Day, Day of Month Month"
 * @param {number} time - number - the time in milliseconds
 * @param {number} offset - -28800
 * @returns A string in the format of "Monday, 1 January"
 */
export const utcToDate = (time: number, offset: number) => {
  const date = convertTimeZone(time, offset)
  const day = date.toLocaleString('default', { weekday: 'long' })
  const month = date.toLocaleString('default', { month: 'long' })
  const dayOfMonth = date.getDate()
  return `${day}, ${dayOfMonth} ${month}`
}

/**
 * It takes a UTC time and an offset and returns a formatted time
 * @param {number} time - number - the time in milliseconds
 * @param {number} offset - -28800
 * @returns A string in the format of "HH:MM am/pm"
 */
export const utcToTime = (time: number, offset: number) => {
  const date = convertTimeZone(time, offset)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hour = (hours == 12) && (ampm == 'pm') ? hours : hours % 12
  const formattedHour = hour < 10 ? `0${hour}` : hour
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${formattedHour}:${formattedMinutes} ${ampm}`
}

/**
 * It takes an array of strings and returns a string of comma separated values
 * @param {any[]} excludes - any[]
 * @returns A function that takes an array of any type and returns a string of the array elements
 * joined by a comma.
 */
export const excludeString = (excludes: any[]) => {
  return excludes.join(',')
}

/**
 * It takes an API key, latitude, longitude, units, and an array of strings that represent the data you
 * want to exclude from the response. 
 * 
 * It returns a promise that resolves to an object containing the weather data. 
 * 
 * The function uses the fetch API to make a request to the OpenWeatherMap API. 
 * 
 * @param {string} apiKey - string - Your OpenWeatherMap API key
 * @param {string} lat - string,
 * @param {string} lon - longitude
 * @param [units=metric] - metric, imperial, or standard
 * @param excludes - An array of strings that are the names of the data points you want to exclude from
 * the response.
 * @returns An object with the weather data.
 */
export const getWeather = async (
  apiKey: string,
  lat: string,
  lon: string,
  units = "metric",
  excludes = ["minutely", "alerts"]
) => {
  let data
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&exclude=${excludeString(excludes)}`)
    data = await response.json()
  } catch (error) {
    console.log(error)
    data = {}
  }
  return data
}