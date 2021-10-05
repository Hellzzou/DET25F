import { CrewMember, Flight } from "../types/Objects"
import { returnZeroOrValue } from "./maths"

export const crewMembersFlights = (
	members: Array<CrewMember>,
	allFlights: Array<Flight>
): { name: string; flight: Flight[] }[] => {
	const membersFlights = allFlights.flatMap((flight) =>
		[flight.chief, flight.pilot, ...flight.crewMembers].map((member) => {
			return { member, flight }
		})
	)
	const allHours = Object.entries(
		membersFlights.reduce<Record<string, Record<string, Flight[]>>>((acc, { member, flight }) => {
			if (!acc[member]) acc[member] = {}
			if (!acc[member]["flight"]) acc[member]["flight"] = []
			acc[member]["flight"].push(flight)
			return acc
		}, {})
	).map((member) => {
		return {
			name: member[0],
			flight: member[1]["flight"],
		}
	})
	const allFlightsNames = Object.entries(allHours).map((member) => member[1].name)
	const missingMembers = members
		.filter((member) => !allFlightsNames.includes(member.trigram))
		.map((m) => {
			return {
				name: m.trigram,
				flight: [],
			}
		})
	return [...allHours, ...missingMembers]
}
export const crewMemberHours = (allHours: Flight[]): Record<string, number> => {
	console.log(allHours)
	return allHours.reduce<Record<string, number>>((acc, flight) => {
		if (!acc["day"]) acc["day"] = 0
		if (!acc["night"]) acc["night"] = 0
		if (!acc["total"]) acc["total"] = 0
		acc["day"] += returnZeroOrValue(flight.dayDuration)
		acc["night"] += returnZeroOrValue(flight.nightDuration)
		acc["total"] += returnZeroOrValue(flight.dayDuration) + returnZeroOrValue(flight.nightDuration)
		return acc
	}, {})
}
