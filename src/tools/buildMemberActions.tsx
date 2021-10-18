/* eslint-disable indent */
import {
	INITIAL_DENAE_DATE_TPA,
	INITIAL_MECBO_DATE_TPA,
	INITIAL_PILOT_DATE_TPA,
	INITIAL_RADIO_DATE_TPA,
	old,
} from "../Datas/initialObjects"
import {
	AllTPAs,
	CrewMember,
	DenaeDateTPA,
	DenaeTPA,
	Flight,
	MecboDateTPA,
	MecboTPA,
	PilotDateTPA,
	PilotTPA,
	RadioDateTPA,
	RadioTPA,
} from "../types/Objects"
import { getAnnual, getQuadri } from "./colorManager"

export function buildSpecialitiesTPA<Type>(
	membersActions: Record<string, Record<string, Date[]>>,
	members: CrewMember[],
	speciality: string[],
	initialTPA: Type
): { name: string; TPA: Type }[] {
	const specialities = members
		.filter(({ onBoardFunction }) => speciality.includes(onBoardFunction))
		.map(({ trigram }) => trigram)
	const allTPAs = Object.entries(membersActions)
		.filter(([trigram]) => specialities.includes(trigram))
		.map(([trigram, actions]) => {
			const actionLatest: [string, Date | Date[]][] = Object.entries(actions).map(([type, dates]) => {
				const sortedDates = dates.sort((d1, d2) => d2.getTime() - d1.getTime())
				if (type === "TMAHD" || type === "PH" || type === "IMINT")
					return [type, [...sortedDates.slice(0, 2), ...Array(2).fill(old)].slice(0, 2)]
				if (type === "appRDR") return [type, [...sortedDates.slice(0, 6), ...Array(6).fill(old)].slice(0, 6)]
				if (type === "entCodage") return [type, [...sortedDates.slice(0, 4), ...Array(4).fill(old)].slice(0, 4)]
				return [type, sortedDates[0]]
			})
			return {
				name: trigram,
				TPA: {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					...initialTPA,
					...Object.fromEntries(actionLatest),
				},
			}
		})
	const allTPAsNames = allTPAs.map(({ name }) => name)

	const missingMembers = specialities
		.filter((member) => !allTPAsNames.includes(member))
		.map((member) => ({ name: member, TPA: initialTPA }))
	return [...allTPAs, ...missingMembers]
}
export const buildAllTPAs = (members: Array<CrewMember>, allFlights: Array<Flight>): AllTPAs => {
	const membersActions = allFlights
		.flatMap((flight) =>
			[flight.chief, flight.pilot, ...flight.crewMembers]
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				.map((flightMember) => members.find((m) => m.trigram === flightMember)!)
				.flatMap((flightMember) => {
					const { pilotTPA, mecboTPA, radioTPA, denaeTPA, crewTPA, departureDate } = flight
					const flightDate = new Date(departureDate)
					const { onBoardFunction } = flightMember
					const specialityTPA: Array<PilotTPA | MecboTPA | RadioTPA | DenaeTPA> = ((onBoardFunction) => {
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
					return [
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						...Object.entries(specialityTPA.find((tpa) => tpa.name === flightMember.trigram)!.TPA),
						...Object.entries(crewTPA),
					]
						.filter(([, val]) => val.value || (typeof val.value === "string" && !!val.value))
						.map(([name, type]) => ({
							tpa: { name: name, value: type.value },
							flightDate,
							flightMember,
						}))
				})
		)
		.reduce<Record<string, Record<string, Date[]>>>((acc, { tpa, flightDate, flightMember: { trigram } }) => {
			if (!acc[trigram]) acc[trigram] = {}
			if (!acc[trigram][tpa.name]) acc[trigram][tpa.name] = []
			if (typeof tpa.value === "string") {
				for (let i = 0; i < parseInt(tpa.value); i++) acc[trigram][tpa.name].push(flightDate)
			} else acc[trigram][tpa.name].push(flightDate)
			return acc
		}, {})
	return {
		pilotTPA: buildSpecialitiesTPA<PilotDateTPA>(
			membersActions,
			members,
			["CDA", "pilote"],
			INITIAL_PILOT_DATE_TPA
		),
		mecboTPA: buildSpecialitiesTPA<MecboDateTPA>(membersActions, members, ["MECBO"], INITIAL_MECBO_DATE_TPA),
		radioTPA: buildSpecialitiesTPA<RadioDateTPA>(membersActions, members, ["GETBO"], INITIAL_RADIO_DATE_TPA),
		denaeTPA: buildSpecialitiesTPA<DenaeDateTPA>(membersActions, members, ["DENAE"], INITIAL_DENAE_DATE_TPA),
	}
}
export const buildPilotPurcentage = (pilotTPA: PilotDateTPA, dateToCompare: Date): number => {
	let purcentage = [pilotTPA.ATTPC, pilotTPA.IFR, pilotTPA.LCS, pilotTPA.DITCHING, pilotTPA.SIMAR].reduce(
		(acc, TPA) => {
			if (getQuadri(TPA, dateToCompare) === "success") acc += 1
			return acc
		},
		0
	)
	purcentage += [...pilotTPA.TMAHD, pilotTPA.COOPBAT, pilotTPA.SAR].reduce((acc, TPA) => {
		if (getAnnual(TPA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	return Math.ceil((purcentage / 9) * 100)
}
export const buildMecboPurcentage = (mecboTPA: MecboDateTPA, dateToCompare: Date): number => {
	let purcentage = [...mecboTPA.PH, mecboTPA.LCS, mecboTPA.DITCHING, mecboTPA.SIMAR].reduce((acc, TPA) => {
		if (getQuadri(TPA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	purcentage += [...mecboTPA.TMAHD, mecboTPA.COOPBAT, mecboTPA.SAR, mecboTPA.TRP].reduce((acc, TPA) => {
		if (getAnnual(TPA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	return Math.ceil((purcentage / 10) * 100)
}
export const buildDenaePurcentage = (denaeTPA: DenaeDateTPA, dateToCompare: Date): number => {
	let purcentage = [...denaeTPA.appRDR, denaeTPA.PGPS, denaeTPA.DITCHING, denaeTPA.SIMAR].reduce((acc, TPA) => {
		if (getQuadri(TPA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	purcentage += [...denaeTPA.TMAHD, denaeTPA.COOPBAT, denaeTPA.SAR].reduce((acc, TPA) => {
		if (getAnnual(TPA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	return Math.ceil((purcentage / 13) * 100)
}
export const buildRadioPurcentage = (radioTPA: RadioDateTPA, dateToCompare: Date): number => {
	let purcentage = [...radioTPA.IMINT, ...radioTPA.entCodage, radioTPA.DITCHING, radioTPA.SIMAR].reduce(
		(acc, TPA) => {
			if (getQuadri(TPA, dateToCompare) === "success") acc += 1
			return acc
		},
		0
	)
	purcentage += [...radioTPA.TMAHD, radioTPA.COOPBAT, radioTPA.SAR].reduce((acc, TPA) => {
		if (getAnnual(TPA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	return Math.ceil((purcentage / 12) * 100)
}
