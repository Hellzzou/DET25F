import { inDays } from "../Datas/dates"
import { newAlert, newEvent, flight } from "../types/Objects"

export const buildWeekFlights = (events: flight[], startDate: number): flight[][] =>
	events
		.reduce<flight[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))

export const buildWeekAlerts = (events: newAlert[], startDate: number): newAlert[][] =>
	events
		.reduce<newAlert[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))

export const buildWeekEvents = (events: newEvent[], startDate: number): newEvent[][] =>
	events
		.reduce<newEvent[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))
