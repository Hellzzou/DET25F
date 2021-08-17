import { INITIAL_PILOT_DATE_EQA } from "../Datas/dateTPA"
import { AllEQAs, crewMember, flight, PilotDateEQA, pilotEQA } from "../types/Objects"
import { returnZeroOrValue } from "./tools"

export const buildInitialsEQA = (members: Array<crewMember>): AllEQAs => {
	const allEQAs: AllEQAs = []
	members.forEach((member) => {
		if (member.onBoardFunction === "CDA" || member.onBoardFunction === "pilote")
			allEQAs.push({ name: member.trigram, EQA: INITIAL_PILOT_DATE_EQA })
	})
	return allEQAs
}
export const fourYearPilotsEQA = (
	flightEQAs: pilotEQA,
	flightDate: Date,
	eqa: { name: string; EQA: PilotDateEQA }
): { name: string; EQA: PilotDateEQA } => {
	const newArray = eqa.EQA.ATTJOUR
	console.log(flightEQAs.EQA.ATTJ.value)
	if (flightEQAs.EQA.ATTJ.value !== "")
		for (let i = 0; i < parseInt(flightEQAs.EQA.ATTJ.value); i++) {
			newArray[0] = flightDate
			newArray.sort((a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString()))
		}
	return {
		name: eqa.name,
		EQA: {
			ERGTR: flightEQAs.EQA.ERGTR.value ? flightDate : eqa.EQA.ERGTR,
			AMVM: flightEQAs.EQA.AMVMANU.value ? flightDate : eqa.EQA.AMVM,
			AMVPADV: flightEQAs.EQA.AMVPADV.value ? flightDate : eqa.EQA.AMVPADV,
			AMVN: flightEQAs.EQA.AMVN.value ? flightDate : eqa.EQA.AMVN,
			ATTN: flightEQAs.EQA.ATTN.value ? flightDate : eqa.EQA.ATTN,
			ATTN_1: flightEQAs.EQA.ATTN1.value ? flightDate : eqa.EQA.ATTN_1,
			STAND: flightEQAs.EQA.STAND.value ? flightDate : eqa.EQA.STAND,
			ATTJOUR: newArray,
			BANUIT: eqa.EQA.BANUIT,
			lastYear: eqa.EQA.lastYear,
			fourMonths: eqa.EQA.fourMonths,
			fourMonthsNight: eqa.EQA.fourMonthsNight,
			lastMonth: eqa.EQA.lastMonth,
		},
	}
}
export const lastYearPilotsEQA = (
	flightEQAs: pilotEQA,
	eqa: { name: string; EQA: PilotDateEQA }
): { name: string; EQA: PilotDateEQA } => {
	return {
		name: eqa.name,
		EQA: {
			ERGTR: eqa.EQA.ERGTR,
			AMVM: eqa.EQA.AMVM,
			AMVPADV: eqa.EQA.AMVPADV,
			AMVN: eqa.EQA.AMVN,
			ATTN: eqa.EQA.ATTN,
			ATTN_1: eqa.EQA.ATTN_1,
			STAND: eqa.EQA.STAND,
			ATTJOUR: eqa.EQA.ATTJOUR,
			BANUIT: eqa.EQA.BANUIT,
			lastYear:
				eqa.EQA.lastYear +
				returnZeroOrValue(flightEQAs.EQA.PILJ.value) +
				returnZeroOrValue(flightEQAs.EQA.PILN.value),
			fourMonths: eqa.EQA.fourMonths,
			fourMonthsNight: eqa.EQA.fourMonthsNight,
			lastMonth: eqa.EQA.lastMonth,
		},
	}
}
export const fourMonthsPilotsEQA = (
	flightEQAs: pilotEQA,
	eqa: { name: string; EQA: PilotDateEQA }
): { name: string; EQA: PilotDateEQA } => {
	return {
		name: eqa.name,
		EQA: {
			ERGTR: eqa.EQA.ERGTR,
			AMVM: eqa.EQA.AMVM,
			AMVPADV: eqa.EQA.AMVPADV,
			AMVN: eqa.EQA.AMVN,
			ATTN: eqa.EQA.ATTN,
			ATTN_1: eqa.EQA.ATTN_1,
			STAND: eqa.EQA.STAND,
			ATTJOUR: eqa.EQA.ATTJOUR,
			BANUIT: eqa.EQA.BANUIT + returnZeroOrValue(flightEQAs.EQA.BAN.value),
			lastYear: eqa.EQA.lastYear,
			fourMonths:
				eqa.EQA.fourMonths +
				returnZeroOrValue(flightEQAs.EQA.PILJ.value) +
				returnZeroOrValue(flightEQAs.EQA.PILN.value),
			fourMonthsNight: eqa.EQA.fourMonthsNight + returnZeroOrValue(flightEQAs.EQA.PILN.value),
			lastMonth: eqa.EQA.lastMonth,
		},
	}
}
export const lastMonthPilotsEQA = (
	flightEQAs: pilotEQA,
	eqa: { name: string; EQA: PilotDateEQA }
): { name: string; EQA: PilotDateEQA } => {
	return {
		name: eqa.name,
		EQA: {
			ERGTR: eqa.EQA.ERGTR,
			AMVM: eqa.EQA.AMVM,
			AMVPADV: eqa.EQA.AMVPADV,
			AMVN: eqa.EQA.AMVN,
			ATTN: eqa.EQA.ATTN,
			ATTN_1: eqa.EQA.ATTN_1,
			STAND: eqa.EQA.STAND,
			ATTJOUR: eqa.EQA.ATTJOUR,
			BANUIT: eqa.EQA.BANUIT,
			lastYear: eqa.EQA.lastYear,
			fourMonths: eqa.EQA.fourMonths,
			fourMonthsNight: eqa.EQA.fourMonthsNight,
			lastMonth:
				eqa.EQA.lastMonth +
				returnZeroOrValue(flightEQAs.EQA.PILJ.value) +
				returnZeroOrValue(flightEQAs.EQA.PILN.value),
		},
	}
}
export const buildAllEQAs = (
	members: Array<crewMember>,
	fourYearsFlights: Array<flight>,
	lastYearFlights: Array<flight>,
	fourMonthsFlights: Array<flight>,
	lastMonthFlights: Array<flight>
): AllEQAs => {
	let allEQAs: AllEQAs = []
	members.forEach((member) => {
		if (member.onBoardFunction === "CDA" || member.onBoardFunction === "pilote")
			allEQAs.push({ name: member.trigram, EQA: INITIAL_PILOT_DATE_EQA })
	})
	fourYearsFlights = fourYearsFlights.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate))
	lastYearFlights = lastYearFlights.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate))
	fourMonthsFlights = fourMonthsFlights.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate))
	lastMonthFlights = lastMonthFlights.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate))
	fourYearsFlights.forEach((flight) => {
		const allMembers = [flight.chief, flight.pilot, ...flight.crewMembers]
		const flightDate = new Date(flight.departureDate)
		allMembers.forEach((crewMember) => {
			const speciality = members[members.findIndex((member) => member.trigram === crewMember)].onBoardFunction
			if (speciality === "CDA" || speciality === "pilote") {
				allEQAs = allEQAs.map((eqa) => {
					const EQAIndex = flight.pilotEQA.findIndex((element) => element.name === crewMember)
					if (eqa.name === crewMember) return fourYearPilotsEQA(flight.pilotEQA[EQAIndex], flightDate, eqa)
					else return eqa
				})
			}
		})
	})
	lastYearFlights.forEach((flight) => {
		const allMembers = [flight.chief, flight.pilot, ...flight.crewMembers]
		allMembers.forEach((crewMember) => {
			const speciality = members[members.findIndex((member) => member.trigram === crewMember)].onBoardFunction
			if (speciality === "CDA" || speciality === "pilote") {
				allEQAs = allEQAs.map((eqa) => {
					const EQAIndex = flight.pilotEQA.findIndex((element) => element.name === crewMember)
					if (eqa.name === crewMember) return lastYearPilotsEQA(flight.pilotEQA[EQAIndex], eqa)
					else return eqa
				})
			}
		})
	})
	fourMonthsFlights.forEach((flight) => {
		const allMembers = [flight.chief, flight.pilot, ...flight.crewMembers]
		allMembers.forEach((crewMember) => {
			const speciality = members[members.findIndex((member) => member.trigram === crewMember)].onBoardFunction
			if (speciality === "CDA" || speciality === "pilote") {
				allEQAs = allEQAs.map((eqa) => {
					const EQAIndex = flight.pilotEQA.findIndex((element) => element.name === crewMember)
					if (eqa.name === crewMember) return fourMonthsPilotsEQA(flight.pilotEQA[EQAIndex], eqa)
					else return eqa
				})
			}
		})
	})
	lastMonthFlights.forEach((flight) => {
		const allMembers = [flight.chief, flight.pilot, ...flight.crewMembers]
		allMembers.forEach((crewMember) => {
			const speciality = members[members.findIndex((member) => member.trigram === crewMember)].onBoardFunction
			if (speciality === "CDA" || speciality === "pilote") {
				allEQAs = allEQAs.map((eqa) => {
					const EQAIndex = flight.pilotEQA.findIndex((element) => element.name === crewMember)
					if (eqa.name === crewMember) return lastMonthPilotsEQA(flight.pilotEQA[EQAIndex], eqa)
					else return eqa
				})
			}
		})
	})
	return allEQAs
}
