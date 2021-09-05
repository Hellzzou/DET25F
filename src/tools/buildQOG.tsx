import { englishMonths } from "../Datas/dates"
import { INITIAL_QOG } from "../Datas/QOG"
import { flight, Group } from "../types/Objects"

export const buildQOG = (
	yearFlights: flight[],
	allGroups: Group[]
): Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>> => {
	// Here we want to sort the year flights by months then by groups, keeping only the durations
	// like { january : { group : {dayDuration, nightDuration}[]}}
	const QOG = yearFlights.reduce<Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>>(
		(acc, flight) => {
			const { group, dayDuration, nightDuration } = flight
			const flightDate = new Date(flight.departureDate).getMonth()
			if (!acc[englishMonths[flightDate]]) acc[englishMonths[flightDate]] = {}
			if (!acc[englishMonths[flightDate]][group]) acc[englishMonths[flightDate]][group] = []
			acc[englishMonths[flightDate]][group].push({
				dayDuration: parseFloat(dayDuration),
				nightDuration: parseFloat(nightDuration),
			})
			return acc
		},
		{}
	)
	// fullfill empty groups with [{dayDuration: 0, nightDuration: 0}]
	const mergedFlights = Object.entries(QOG).map((group) => [group[0], { ...INITIAL_QOG(allGroups), ...group[1] }])
	// find empty months
	const QOGMonths = mergedFlights.map((month) => month[0])
	//fullfill empty months with [{dayDuration: 0, nightDuration: 0}] for each groups
	const missingMonths = englishMonths
		.filter((month) => !QOGMonths.includes(month))
		.map((month) => [month, INITIAL_QOG(allGroups)])
	return { ...Object.fromEntries(missingMonths), ...Object.fromEntries(mergedFlights) }
}
