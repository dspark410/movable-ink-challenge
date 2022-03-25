/**
 *
 * @param {number} time - Unix time in seconds returns it in miliseconds
 */

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function convertDate(time) {
  const date = new Date(time * 1000)
  const dayIndex = date.getDay()
  const day = days[dayIndex]

  return day
}
