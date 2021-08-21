/* eslint-disable indent */
import { INITIAL_DATE_TPAS, old } from "../Datas/dateTPA"
import { crewMember, denaeTPA, flight, mecboTPA, pilotTPA, radioTPA } from "../types/Objects"

export const buildAllTPAs = (
	members: Array<crewMember>,
	allFlights: Array<flight>
): { pilotTPA: any; mecboTPA: any; radioTPA: any; denaeTPA: any } => {
	const membersActions = allFlights
		/**
		 * here we want a couple flight / member to iterate, so
		 * 2- we return a couple for each flight and member
		 **/
		.flatMap((flight) =>
			// for each flight filter members
			[flight.chief, flight.pilot, ...flight.crewMembers]
				// we find the members in the original members DB items
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				.map((flightMember) => members.find((m) => m.trigram === flightMember)!)
				// return a couple flight / member for each flight
				.flatMap((flightMember) => {
					const { pilotTPA, mecboTPA, radioTPA, denaeTPA, crewTPA, departureDate } = flight
					const flightDate = new Date(departureDate)
					const { onBoardFunction } = flightMember
					const specialityTPA: Array<pilotTPA | mecboTPA | radioTPA | denaeTPA> = ((onBoardFunction) => {
						switch (onBoardFunction) {
							case "CDA":
							case "pilote":
								return pilotTPA
							case "MECBO":
								return mecboTPA
							case "GETBO":
								return radioTPA
							case "DENAE":
								return denaeTPA
							default:
								return pilotTPA
						}
					})(onBoardFunction)
					return (
						[
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							...Object.entries(specialityTPA.find((tpa) => tpa.name === flightMember.trigram)!.TPA),
							...Object.entries(crewTPA),
						]
							// filter only ones with values
							.filter(([, val]) => val.value || (typeof val.value === "string" && !!val.value))
							// map one action with flight date and flightmember
							.map(([name, type]) => ({
								tpa: { name: name, value: type.value },
								flightDate,
								flightMember,
							}))
					)
				})
		)
		/**
		 * at this stage with have a big array of each action for each member for each flight
		 *  so we want to group them by member, so we use reduce
		 */
		.reduce<Record<string, Record<string, Date[]>>>((acc, { tpa, flightDate, flightMember: { trigram } }) => {
			if (!acc[trigram]) acc[trigram] = {}
			if (!acc[trigram][tpa.name]) acc[trigram][tpa.name] = []
			if (typeof tpa.value === "string") {
				for (let i = 0; i < parseInt(tpa.value); i++) acc[trigram][tpa.name].push(flightDate)
			} else acc[trigram][tpa.name].push(flightDate)
			return acc
		}, {})

	/**
	 * Final step we want to keep only the latest date for each action except TMAHD where we want the two latest
	 */
	const allTPAs = Object.entries(membersActions).map(([trigram, actions]) => {
		/**
		 * we sort the date array and we keep the first date
		 * /!\ missing actions will not be in the array
		 */
		const actionLatest: [string, Date | Date[]][] = Object.entries(actions).map(([type, dates]) => {
			// sort dates descending
			const sortedDates = dates.sort((d1, d2) => d2.getTime() - d1.getTime())
			if (type === "TMAHD" || type === "PH" || type === "IMINT")
				return [type, [...sortedDates.slice(0, 2), ...Array(2).fill(old)].slice(0, 2)]
			if (type === "appRDR") return [type, [...sortedDates.slice(0, 6), ...Array(6).fill(old)].slice(0, 6)]
			return [type, sortedDates[0]]
		})
		return {
			name: trigram,
			// merge default item INITIAL__DATE_TPAS with action to populate missing actions
			TPA: {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				...INITIAL_DATE_TPAS[members.find((member) => member.trigram === trigram)!.onBoardFunction],
				...Object.fromEntries(actionLatest),
			},
		}
	})
	const allTPAsNames = allTPAs.map(({ name }) => name)

	const missingMembers = members
		.filter((member) => !allTPAsNames.includes(member.trigram))
		.map((m) => ({ name: m.trigram, TPA: INITIAL_DATE_TPAS[m.onBoardFunction] }))
	return {
		pilotTPA: [...allTPAs, ...missingMembers].filter((tpa) =>
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			["CDA", "pilote"].includes(members.find((m) => m.trigram === tpa.name)!.onBoardFunction)
		),
		mecboTPA: [...allTPAs, ...missingMembers].filter(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(tpa) => members.find((m) => m.trigram === tpa.name)!.onBoardFunction === "MECBO"
		),
		radioTPA: [...allTPAs, ...missingMembers].filter(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(tpa) => members.find((m) => m.trigram === tpa.name)!.onBoardFunction === "GETBO"
		),
		denaeTPA: [...allTPAs, ...missingMembers].filter(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(tpa) => members.find((m) => m.trigram === tpa.name)!.onBoardFunction === "DENAE"
		),
	}
}
