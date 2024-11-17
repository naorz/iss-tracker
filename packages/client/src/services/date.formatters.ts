export const formatDate = (date: string | number | Date): string => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  let hours = '' + d.getHours()
  let minutes = '' + d.getMinutes()
  let seconds = '' + d.getSeconds()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  if (hours.length < 2) hours = '0' + hours
  if (minutes.length < 2) minutes = '0' + minutes
  if (seconds.length < 2) seconds = '0' + seconds

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
