// Function to account for different Time Zone based on offset
// given UTC dt string from OpenWeather
export const convertTimeZone = (time: number, offset: number) => {
  const date = new Date((time + offset) * 1000)
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
  const nd = new Date(utc + (3600000 * offset))
  return nd
}

// Function to convert UTC string to date with day of week
export const utcToDate = (time: number, offset: number) => {
  const date = convertTimeZone(time, offset)
  const day = date.toLocaleString('default', { weekday: 'long' })
  const month = date.toLocaleString('default', { month: 'long' })
  const dayOfMonth = date.getDate()
  return `${day}, ${dayOfMonth} ${month}`
}

// Function to convert UTC to time in 12 hour format
export const utcToTime = (time: number, offset: number) => {
  const date = convertTimeZone(time, offset)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hour = hours % 12
  const formattedHour = hour < 10 ? `0${hour}` : hour
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${formattedHour}:${formattedMinutes} ${ampm}`
}