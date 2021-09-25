import { CrewMember, Etat400View, FDVView, Flight } from "../types/Objects"

export const buildEtat400View = (flights: Flight[], members: CrewMember[]): Etat400View[] => {
	return flights
		.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())
		.map((flight) => {
			return {
				date:
					flight.departureDate.split("T")[0].split("-")[2] +
					"/" +
					flight.departureDate.split("T")[0].split("-")[1] +
					"/" +
					flight.departureDate.split("T")[0].split("-")[0],
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				crew: members.find(({ trigram }) => trigram === flight.chief)!.crew!,
				takeOff:
					flight.departureDate.split("T")[1].split(":")[0] +
					":" +
					flight.departureDate.split("T")[1].split(":")[1],
				duration: (Date.parse(flight.arrivalDate) - Date.parse(flight.departureDate)) / 3600000,
				type: flight.type,
				mission: flight.mission,
				underGroup: flight.group,
				fuel: flight.fuel,
				config: flight.config,
			}
		})
}
export const buildFDVView = (flights: Flight[], members: CrewMember[]): FDVView[] => {
	return flights
		.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())
		.map((flight) => {
			return {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				crew: members.find(({ trigram }) => trigram === flight.chief)!.crew!,
				chief: flight.chief,
				crewMembers: flight.pilot + " " + flight.crewMembers.reduce((acc, member) => acc + member + " ", ""),
				takeOff:
					flight.departureDate.split("T")[1].split(":")[0] +
					":" +
					flight.departureDate.split("T")[1].split(":")[1],
				duration: (Date.parse(flight.arrivalDate) - Date.parse(flight.departureDate)) / 3600000,
				type: flight.type,
				mission: flight.mission,
				underGroup: flight.group,
				fuel: flight.fuel,
				config: flight.config,
			}
		})
}
