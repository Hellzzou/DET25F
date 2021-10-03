import { Duration, Flight } from "../types/Objects"
import { findNumberOfWeeks, getWeekNumber } from "./dateManager"

export const buildQOG = (yearFlights: Flight[], allUnderGroups: string[]): Record<string, Duration>[] => {
	const emptyArray = Array.from(Array(12), () =>
		allUnderGroups.reduce<Record<string, Duration>>((acc, underGroup) => {
			if (!acc[underGroup]) acc[underGroup] = { dayDuration: 0, nightDuration: 0 }
			return acc
		}, {})
	)
	// Here we want to sort the year flights by months then by groups, keeping only the durations
	// like { january : { group : {dayDuration, nightDuration}[]}}
	return yearFlights.reduce<Record<string, Duration>[]>((acc, flight) => {
		const { group, dayDuration, nightDuration } = flight
		const flightDate = new Date(flight.departureDate).getMonth()
		acc[flightDate][group].dayDuration += parseFloat(dayDuration)
		acc[flightDate][group].nightDuration += parseFloat(nightDuration)
		return acc
	}, emptyArray)
}
export const buildWeekReport = (yearFlights: Flight[], allunderGroups: string[]): Record<string, Duration>[] => {
	// build an Array with objects where all groups equals 0, its length equals the number of week in the year
	const emptyArray = Array.from(Array(findNumberOfWeeks()), () =>
		allunderGroups.reduce<Record<string, Duration>>((acc, underGroup) => {
			if (!acc[underGroup]) acc[underGroup] = { dayDuration: 0, nightDuration: 0 }
			return acc
		}, {})
	)
	// sum all the year flights of the same week sorting them by week and groups
	return yearFlights.reduce<Record<string, Duration>[]>((acc, flight) => {
		acc[getWeekNumber(Date.parse(flight.departureDate)) - 1][flight.group].dayDuration += parseFloat(
			flight.dayDuration
		)
		acc[getWeekNumber(Date.parse(flight.departureDate)) - 1][flight.group].nightDuration += parseFloat(
			flight.nightDuration
		)
		return acc
	}, emptyArray)
}
