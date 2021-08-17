import { DB_URL } from "../Datas/datas"
import { inDays } from "../Datas/dates"
import { newAlert, newEvent, flight } from "../types/Objects"
import { postFetchRequest } from "./fetch"

export async function getWeekEvents(startDate: number, endDate: number, type: string): Promise<any> {
	let weekEvents: Array<Array<newEvent | flight | newAlert>> = []
	const monday: Array<newEvent | flight | newAlert> = []
	const tuesday: Array<newEvent | flight | newAlert> = []
	const wednesday: Array<newEvent | flight | newAlert> = []
	const thursday: Array<newEvent | flight | newAlert> = []
	const friday: Array<newEvent | flight | newAlert> = []
	const saturday: Array<newEvent | flight | newAlert> = []
	const sunday: Array<newEvent | flight | newAlert> = []
	const res = await postFetchRequest(DB_URL + type + "/betweenTwoDates", {
		start: new Date(startDate),
		end: new Date(endDate),
	})
	if (typeof res.error !== "undefined") return "erreur serveur"
	else {
		res.forEach((flight: newEvent | flight | newAlert) => {
			const flightDate = new Date(Date.parse(flight.departureDate) - 11 * 3600000).toDateString()
			if (flightDate === new Date(startDate).toDateString()) monday.push(flight)
			if (flightDate === new Date(startDate + 1 * inDays).toDateString()) tuesday.push(flight)
			if (flightDate === new Date(startDate + 2 * inDays).toDateString()) wednesday.push(flight)
			if (flightDate === new Date(startDate + 3 * inDays).toDateString()) thursday.push(flight)
			if (flightDate === new Date(startDate + 4 * inDays).toDateString()) friday.push(flight)
			if (flightDate === new Date(startDate + 5 * inDays).toDateString()) saturday.push(flight)
			if (flightDate === new Date(startDate + 6 * inDays).toDateString()) sunday.push(flight)
		})
	}
	weekEvents = [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
	weekEvents.forEach((day) => {
		day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate))
	})
	return weekEvents
}
