import { inDays } from "../Datas/constants"
import { Alert, Event, Flight, Holiday } from "../types/Objects"
import { returnHoursInInteger } from "./dateManager"

export const buildWeekFlights = (events: Flight[], startDate: number): Flight[][] =>
	events
		.reduce<Flight[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))

export const buildWeekAlerts = (events: Alert[], startDate: number): Alert[] =>
	events.reduce<Alert[]>((acc, flight) => {
		const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
		acc[flightDate] = flight
		return acc
	}, [])

export const buildWeekEvents = (events: Event[], startDate: number): Event[][] =>
	events
		.reduce<Event[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))
export const buildWeekHolidays = (events: Holiday[], startDate: number): Holiday[][] =>
	events
		.reduce<Holiday[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.date) - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => (a.type === "Perm PM" ? 12 : 8) - (b.type === "Perm PM" ? 12 : 8)))
export const sortEventByRow = (events: Event[]): Event[][] => {
	let departureTime = 0
	const newRow: Event[] = []
	const currentRow: Event[] = []
	events.map((event) => {
		if (returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) >= departureTime)
			currentRow.push(event)
		else newRow.push(event)
		departureTime = returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0])
	})
	return newRow.length === 0 ? [currentRow] : [currentRow, ...sortEventByRow(newRow)]
}
export const sortHolidaysByRow = (events: Holiday[]): Holiday[][] => {
	let departureTime = 0
	const newRow: Holiday[] = []
	const currentRow: Holiday[] = []
	events.map((event) => {
		const eventDeparture = event.type === "Perm PM" ? 12 : 8
		if (eventDeparture >= departureTime) currentRow.push(event)
		else newRow.push(event)
		departureTime = event.type === "Perm AM" ? 12 : 16
	})
	return newRow.length === 0 ? [currentRow] : [currentRow, ...sortHolidaysByRow(newRow)]
}
