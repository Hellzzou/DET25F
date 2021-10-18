import { INITIAL_PILOT_DATE_EQA, old } from "../Datas/initialObjects"
import { EQADurations } from "../Datas/constants"
import { AllEQAs, CrewMember, Flight, PilotDateEQA } from "../types/Objects"
import { getDone, getDurationsValidity, getMonthly, getQuadri } from "./colorManager"

export const buildAllEQAs = (members: Array<CrewMember>, fourYearsFlights: Array<Flight>, date: Date): AllEQAs => {
	const lastYear = new Date(date.getFullYear(), date.getMonth() - 11, 1)
	const fourMonths = new Date(date.getFullYear(), date.getMonth() - 3, 1)
	const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1)
	const pilotActions = fourYearsFlights.flatMap((flight) =>
		[flight.chief, flight.pilot, ...flight.crewMembers]
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.map((flightMember) => members.find((m) => m.trigram === flightMember)!)
			.filter((flightMember) => ["CDA", "pilote"].includes(flightMember.onBoardFunction))
			.flatMap((flightMember) => {
				const { pilotEQA, departureDate } = flight
				const flightDate = new Date(departureDate)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return [...Object.entries(pilotEQA.find((eqa) => eqa.name === flightMember.trigram)!.EQA)]
					.filter(([, val]) => val.value || (typeof val.value === "string" && !!val.value))
					.map(([name, type]) => ({
						eqa: { name: name, value: type.value },
						flightDate,
						flightMember,
					}))
			})
	)
	const pilotEQAs = pilotActions.reduce<Record<string, Record<string, Date[]>>>(
		(acc, { eqa, flightDate, flightMember: { trigram } }) => {
			if (!acc[trigram]) acc[trigram] = {}
			if (!acc[trigram][eqa.name] && eqa.name !== "PILJ" && eqa.name !== "PILN" && eqa.name !== "BAN")
				acc[trigram][eqa.name] = []
			if (typeof eqa.value === "string" && eqa.name === "ATTJ") {
				for (let i = 0; i < parseInt(eqa.value); i++) acc[trigram][eqa.name].push(flightDate)
			} else if (eqa.name !== "PILJ" && eqa.name !== "PILN" && eqa.name !== "BAN")
				acc[trigram][eqa.name].push(flightDate)
			return acc
		},
		{}
	)
	const pilotDurations = pilotActions.reduce<Record<string, Record<string, number>>>(
		(acc, { eqa, flightDate, flightMember: { trigram } }) => {
			if (!acc[trigram]) acc[trigram] = {}
			if (!acc[trigram]["lastYear"]) acc[trigram]["lastYear"] = 0
			if (!acc[trigram]["fourMonths"]) acc[trigram]["fourMonths"] = 0
			if (!acc[trigram]["fourMonthsNight"]) acc[trigram]["fourMonthsNight"] = 0
			if (!acc[trigram]["lastMonth"]) acc[trigram]["lastMonth"] = 0
			if (!acc[trigram]["BAN"]) acc[trigram]["BAN"] = 0
			if (typeof eqa.value === "string" && eqa.name !== "ATTJ") {
				if (flightDate > lastMonth && eqa.name !== "BAN") {
					acc[trigram]["lastMonth"] += parseFloat(eqa.value)
				}
				if (flightDate > fourMonths) {
					if (eqa.name === "PILN") {
						acc[trigram]["fourMonthsNight"] += parseFloat(eqa.value)
						acc[trigram]["fourMonths"] += parseFloat(eqa.value)
					}
					if (eqa.name === "PILJ") acc[trigram]["fourMonths"] += parseFloat(eqa.value)
					if (eqa.name === "BAN") acc[trigram]["BAN"] += parseFloat(eqa.value)
				}
				if (flightDate > lastYear && eqa.name !== "BAN") {
					acc[trigram]["lastYear"] += parseFloat(eqa.value)
				}
			}
			return acc
		},
		{}
	)
	const allEQAs = Object.entries(pilotEQAs).map(([trigram, actions]) => {
		const actionLatest: [string, Date | Date[]][] = Object.entries(actions).map(([type, dates]) => {
			// sort dates descending
			const sortedDates = dates.sort((d1, d2) => d2.getTime() - d1.getTime())
			if (type === "ATTJ") return [type, [...sortedDates.slice(0, 2), ...Array(2).fill(old)].slice(0, 2)]
			return [type, sortedDates[0]]
		})
		return {
			name: trigram,
			// merge default item INITIAL_PILOT_DATE_EQA with action to populate missing actions
			EQA: {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				...INITIAL_PILOT_DATE_EQA,
				...pilotDurations[trigram],
				...Object.fromEntries(actionLatest),
			},
		}
	})
	const allEQAsNames = allEQAs.map(({ name }) => name)

	const missingMembers = members
		.filter(
			(member) => !allEQAsNames.includes(member.trigram) && ["CDA", "pilote"].includes(member.onBoardFunction)
		)
		.map((m) => ({ name: m.trigram, EQA: INITIAL_PILOT_DATE_EQA }))

	return [...allEQAs, ...missingMembers]
}
export const buildPilotEQAPurcentage = (pilotEQA: PilotDateEQA, dateToCompare: Date): number => {
	let purcentage = [
		...pilotEQA.ATTJ,
		pilotEQA.ATTN1,
		pilotEQA.ATTN,
		pilotEQA.AMVPADV,
		pilotEQA.AMVM,
		pilotEQA.AMVN,
	].reduce((acc, EQA) => {
		if (getMonthly(EQA, dateToCompare) === "success") acc += 1
		return acc
	}, 0)
	purcentage += getDurationsValidity(pilotEQA.BAN, EQADurations.BAN) === "success" ? 1 : 0
	purcentage += getDurationsValidity(pilotEQA.fourMonths, EQADurations.fourMonths) === "success" ? 1 : 0
	purcentage += getDurationsValidity(pilotEQA.fourMonthsNight, EQADurations.fourMonthsNight) === "success" ? 1 : 0
	purcentage += getQuadri(pilotEQA.STAND, dateToCompare) === "success" ? 1 : 0
	purcentage += getDone(pilotEQA.ERGTR) === "success" ? 1 : 0
	return Math.ceil((purcentage / 12) * 100)
}
