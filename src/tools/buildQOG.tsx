import { englishMonths } from "../Datas/dates"
import { INITIAL_QOG } from "../Datas/QOG"
import { flight, Group } from "../types/Objects"
import { findNumberOfWeeks, getWeekNumber } from "./date"

export const buildQOG = (
	yearFlights: flight[],
	allGroups: Group[]
): Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>> => {
	// Here we want to sort the year flights by months then by groups, keeping only the durations
	// like { january : { group : {dayDuration, nightDuration}[]}}
	const sortedFlights = yearFlights.reduce<
		Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>
	>((acc, flight) => {
		const { group, dayDuration, nightDuration } = flight
		const flightDate = new Date(flight.departureDate).getMonth()
		if (!acc[englishMonths[flightDate]]) acc[englishMonths[flightDate]] = {}
		if (!acc[englishMonths[flightDate]][group]) acc[englishMonths[flightDate]][group] = []
		acc[englishMonths[flightDate]][group].push({
			dayDuration: parseFloat(dayDuration),
			nightDuration: parseFloat(nightDuration),
		})
		return acc
	}, {})
	// fullfill empty groups with [{dayDuration: 0, nightDuration: 0}]
	const mergedFlights = Object.entries(sortedFlights).map(([groupName, group]) => [
		groupName,
		{ ...INITIAL_QOG(allGroups), ...group },
	])
	const QOGMonths = mergedFlights.map(([month]) => month)
	// find empty months
	// fullfill empty months with [{dayDuration: 0, nightDuration: 0}] for each groups
	const missingMonths = englishMonths
		.filter((month) => !QOGMonths.includes(month))
		.map((month) => [month, INITIAL_QOG(allGroups)])
	return { ...Object.fromEntries(missingMonths), ...Object.fromEntries(mergedFlights) }
}
export const allUnderGroupsToZero = (underGroups: string[]): Record<string, number> => {
	return underGroups.reduce<Record<string, number>>((acc, underGroup) => {
		if (!acc[underGroup]) acc[underGroup] = 0
		return acc
	}, {})
}
export const buildWeekReport = (yearFlights: flight[], allunderGroups: string[]): Record<string, number>[] => {
	// build an Array with objects where all groups equals 0, its length equals the number of week in the year
	const emptyArray = Array.from(Array(findNumberOfWeeks()), () => allUnderGroupsToZero(allunderGroups))
	// sum all the year flights of the same week sorting them by week and groups
	const sortedArray = yearFlights.reduce<Record<string, number>[]>((acc, flight) => {
		if (!acc[getWeekNumber(Date.parse(flight.departureDate)) - 1])
			acc[getWeekNumber(Date.parse(flight.departureDate)) - 1] = allUnderGroupsToZero(allunderGroups)
		acc[getWeekNumber(Date.parse(flight.departureDate)) - 1][flight.group] +=
			parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
		return acc
	}, [])
	// merge the two arrays
	sortedArray.map((week) => (emptyArray[sortedArray.indexOf(week)] = week))
	return emptyArray
}
