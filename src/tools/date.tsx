import { inDays } from "../Datas/dates"
import { newEvent, flight, Nights } from "../types/Objects"

export const getWeekNumber = (date: number): number => {
	const year = new Date(date).getFullYear()
	let i = 0
	while (i <= 7) {
		if (new Date(year, 0, 1).getDay() === 0) break
		i++
	}
	const firstMonday = Date.parse(new Date(year, 0, i).toDateString())
	return Math.ceil((date - firstMonday) / 1000 / 60 / 60 / 24 / 7) + 1
}
export const getHour = (date: Date): string => {
	const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
	const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
	return hours + ":" + minutes
}
export const getBetweenColSpan = (event: flight | newEvent, events: Array<flight | newEvent>): number => {
	if (events.indexOf(event) !== 0) {
		return (
			returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) -
			returnHoursInInteger(events[events.indexOf(event) - 1].arrivalDate.split("T")[1].split(":")[0])
		)
	}
	return returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) - 6
}
export const getColSpan = (event: flight | newEvent): number => {
	return new Date(event.arrivalDate).getUTCHours() - new Date(event.departureDate).getUTCHours()
}
export const getSunsets = (nights: Nights, monday: number, date: number, type: string): string => {
	const thisDate = new Date(monday + date * inDays)
	if (typeof nights[0][0] !== "undefined")
		return type === "jour"
			? nights[thisDate.getMonth()][thisDate.getDate() - 1].jour + "L"
			: nights[thisDate.getMonth()][thisDate.getDate() - 1].nuit + "L"
	return ""
}
export const returnHoursInInteger = (value: string): number => {
	if (value.split("")[0] === "0") return parseInt(value.split("")[1])
	return parseInt(value)
}
