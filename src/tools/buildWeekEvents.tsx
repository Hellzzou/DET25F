import { inDays } from "../Datas/dates"
import { newAlert, newEvent, flight } from "../types/Objects"
import { returnHoursInInteger } from "./dateManager"

export const buildWeekFlights = (events: flight[], startDate: number): flight[][] =>
	events
		.reduce<flight[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))

export const buildWeekAlerts = (events: newAlert[], startDate: number): newAlert[] =>
	events.reduce<newAlert[]>((acc, flight) => {
		const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
		acc[flightDate] = flight
		return acc
	}, [])

export const buildWeekEvents = (events: newEvent[], startDate: number): newEvent[][] =>
	events
		.reduce<newEvent[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))
export const sortEventByRow = (events: newEvent[]): newEvent[][] => {
	let departureTime = 0
	const newRow: newEvent[] = []
	const currentRow: newEvent[] = []
	events.map((event) => {
		if (returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) >= departureTime)
			currentRow.push(event)
		else newRow.push(event)
		departureTime = returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0])
	})
	return newRow.length === 0 ? [currentRow] : [currentRow, ...sortEventByRow(newRow)]
}
