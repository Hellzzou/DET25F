import { crewMember, flight } from "../types/Objects"
import { returnZeroOrValue } from "./tools"

export const crewMembersFlights = (
	members: Array<crewMember>,
	allFlights: Array<flight>
): { name: string; flight: flight[] }[] => {
	const membersFlights = allFlights.flatMap((flight) =>
		[flight.chief, flight.pilot, ...flight.crewMembers].map((member) => {
			return { member, flight }
		})
	)
	const allHours = Object.entries(
		membersFlights.reduce<Record<string, Record<string, flight[]>>>((acc, { member, flight }) => {
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
export const crewMemberHours = (allHours: flight[]): Record<string, number> => {
	return allHours.reduce<Record<string, number>>((acc, flight) => {
		if (!acc["day"]) acc["day"] = 0
		if (!acc["night"]) acc["night"] = 0
		if (!acc["total"]) acc["total"] = 0
		acc["day"] += returnZeroOrValue(flight.dayDuration)
		acc["night"] += returnZeroOrValue(flight.dayDuration)
		acc["total"] += returnZeroOrValue(flight.dayDuration)
		return acc
	}, {})
}
