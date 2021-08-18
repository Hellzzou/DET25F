/* eslint-disable indent */
import {
	INITIAL_DENAE_DATE_TPA,
	INITIAL_MECBO_DATE_TPA,
	INITIAL_PILOT_DATE_TPA,
	INITIAL_RADIO_DATE_TPA,
} from "../Datas/dateTPA"
import {
	allTPAs,
	crewMember,
	crewTPA,
	denaeDateTPA,
	denaeTPA,
	flight,
	mecboDateTPA,
	mecboTPA,
	pilotDateTPA,
	pilotTPA,
	radioDateTPA,
	radioTPA,
} from "../types/Objects"

export const buildInitialPilotTPAs = (members: Array<crewMember>): Array<{ name: string; TPA: pilotDateTPA }> => {
	const pilotTPAs: Array<{ name: string; TPA: pilotDateTPA }> = []
	members.forEach((member) => {
		if (member.onBoardFunction === "CDA" || member.onBoardFunction === "pilote") {
			pilotTPAs.push({
				name: member.trigram,
				TPA: INITIAL_PILOT_DATE_TPA,
			})
		}
	})
	return pilotTPAs
}
export const updatePilotTPA = (
	flightTPAs: pilotTPA,
	flightCrewTPAs: crewTPA,
	flightDate: Date,
	tpa: { name: string; TPA: pilotDateTPA }
): { name: string; TPA: pilotDateTPA } => {
	const newArray = tpa.TPA.TMAHD
	if (flightCrewTPAs.TMAHD.value) {
		newArray.unshift(flightDate)
		newArray.pop()
	}
	return {
		name: tpa.name,
		TPA: {
			COOPBAT: flightCrewTPAs.COOPBAT.value ? flightDate : tpa.TPA.COOPBAT,
			SAR: flightCrewTPAs.SAR.value ? flightDate : tpa.TPA.SAR,
			DITCHING: flightCrewTPAs.DITCHING.value ? flightDate : tpa.TPA.DITCHING,
			SIMAR: flightCrewTPAs.SIMAR.value ? flightDate : tpa.TPA.SIMAR,
			ATTPC: flightTPAs.TPA.ATTPC.value ? flightDate : tpa.TPA.ATTPC,
			IFR: flightTPAs.TPA.IFR.value ? flightDate : tpa.TPA.IFR,
			LCS: flightTPAs.TPA.LCS.value ? flightDate : tpa.TPA.LCS,
			TMAHD: flightCrewTPAs.TMAHD.value ? newArray : tpa.TPA.TMAHD,
		},
	}
}
// export const updateMecboTPA = (
// 	mecboDateTPA: { name: string; TPA: mecboDateTPA },
// 	mecbo: string,
// 	crewTPA: crewTPA,
// 	mecboTPA: Array<mecboTPA>,
// 	flightDate: Date
// ): { name: string; TPA: mecboDateTPA } => {
// 	const TPAindex = mecboTPA.findIndex((tpa) => tpa.name === mecbo)
// 	crewTPA.forEach((tpa) => {
// 		if (tpa.name === "TMA HD" && tpa.value && mecboDateTPA.TPA.TMAHD[0] < flightDate) {
// 			mecboDateTPA.TPA.TMAHD[0] = flightDate
// 			mecboDateTPA.TPA.TMAHD.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 		if (tpa.name === "coop BAT" && tpa.value && mecboDateTPA.TPA.COOPBAT < flightDate)
// 			mecboDateTPA.TPA.COOPBAT = flightDate
// 		if (tpa.name === "SAR/SECMAR" && tpa.value && mecboDateTPA.TPA.SAR < flightDate)
// 			mecboDateTPA.TPA.SAR = flightDate
// 		if (tpa.name === "Ditching" && tpa.value && mecboDateTPA.TPA.DITCHING < flightDate)
// 			mecboDateTPA.TPA.DITCHING = flightDate
// 		if (tpa.name === "SIMAR" && tpa.value && mecboDateTPA.TPA.SIMAR < flightDate)
// 			mecboDateTPA.TPA.SIMAR = flightDate
// 	})
// 	if (mecboTPA[TPAindex].TPA.LCS.value && mecboDateTPA.TPA.LCS < flightDate) mecboDateTPA.TPA.LCS = flightDate
// 	if (mecboTPA[TPAindex].TPA.PH.value !== "") {
// 		for (let i = 0; i < parseInt(mecboTPA[TPAindex].TPA.PH.value); i++) {
// 			if (mecboDateTPA.TPA.PH[0] < flightDate) {
// 				mecboDateTPA.TPA.PH[0] = flightDate
// 				mecboDateTPA.TPA.PH.sort(
// 					(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 				)
// 			}
// 		}
// 	}
// 	if (mecboTPA[TPAindex].TPA.TRP.value && mecboDateTPA.TPA.TRP < flightDate) mecboDateTPA.TPA.TRP = flightDate
// 	return mecboDateTPA
// }
// export const updateRadioTPA = (
// 	radioDateTPA: { name: string; TPA: radioDateTPA },
// 	radio: string,
// 	crewTPA: crewTPA,
// 	radioTPA: Array<radioTPA>,
// 	flightDate: Date
// ): { name: string; TPA: radioDateTPA } => {
// 	const TPAindex = radioTPA.findIndex((tpa) => tpa.name === radio)
// 	crewTPA.forEach((tpa) => {
// 		if (tpa.name === "TMA HD" && tpa.value && radioDateTPA.TPA.TMAHD[0] < flightDate) {
// 			radioDateTPA.TPA.TMAHD[0] = flightDate
// 			radioDateTPA.TPA.TMAHD.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 		if (tpa.name === "coop BAT" && tpa.value && radioDateTPA.TPA.COOPBAT < flightDate)
// 			radioDateTPA.TPA.COOPBAT = flightDate
// 		if (tpa.name === "SAR/SECMAR" && tpa.value && radioDateTPA.TPA.SAR < flightDate)
// 			radioDateTPA.TPA.SAR = flightDate
// 		if (tpa.name === "Ditching" && tpa.value && radioDateTPA.TPA.DITCHING < flightDate)
// 			radioDateTPA.TPA.DITCHING = flightDate
// 		if (tpa.name === "SIMAR" && tpa.value && radioDateTPA.TPA.SIMAR < flightDate)
// 			radioDateTPA.TPA.SIMAR = flightDate
// 	})
// 	radioTPA[TPAindex].TPA.forEach((tpa) => {
// 		if (tpa.name === "dossier IMINT" && tpa.value && radioDateTPA.TPA.IMINT[0] < flightDate) {
// 			radioDateTPA.TPA.IMINT[0] = flightDate
// 			radioDateTPA.TPA.IMINT.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 	})
// 	return radioDateTPA
// }
// export const updateDenaeTPA = (
// 	denaeDateTPA: { name: string; TPA: denaeDateTPA },
// 	denae: string,
// 	crewTPA: crewTPA,
// 	denaeTPA: Array<denaeTPA>,
// 	flightDate: Date
// ): { name: string; TPA: denaeDateTPA } => {
// 	const TPAindex = denaeTPA.findIndex((tpa) => tpa.name === denae)
// 	crewTPA.forEach((tpa) => {
// 		if (tpa.name === "TMA HD" && tpa.value && denaeDateTPA.TPA.TMAHD[0] < flightDate) {
// 			denaeDateTPA.TPA.TMAHD[0] = flightDate
// 			denaeDateTPA.TPA.TMAHD.sort(
// 				(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 			)
// 		}
// 		if (tpa.name === "coop BAT" && tpa.value && denaeDateTPA.TPA.COOPBAT < flightDate)
// 			denaeDateTPA.TPA.COOPBAT = flightDate
// 		if (tpa.name === "SAR/SECMAR" && tpa.value && denaeDateTPA.TPA.SAR < flightDate)
// 			denaeDateTPA.TPA.SAR = flightDate
// 		if (tpa.name === "Ditching" && tpa.value && denaeDateTPA.TPA.DITCHING < flightDate)
// 			denaeDateTPA.TPA.DITCHING = flightDate
// 		if (tpa.name === "SIMAR" && tpa.value && denaeDateTPA.TPA.SIMAR < flightDate)
// 			denaeDateTPA.TPA.SIMAR = flightDate
// 	})
// 	if (denaeTPA[TPAindex].TPA.PGPS.value && denaeDateTPA.TPA.PGPS < flightDate) denaeDateTPA.TPA.PGPS = flightDate
// 	if (denaeTPA[TPAindex].TPA.appRDR.value !== "") {
// 		for (let i = 0; i < parseInt(denaeTPA[TPAindex].TPA.appRDR.value); i++) {
// 			if (denaeDateTPA.TPA.APPRDR[0] < flightDate) {
// 				denaeDateTPA.TPA.APPRDR[0] = flightDate
// 				denaeDateTPA.TPA.APPRDR.sort(
// 					(a, b) => Date.parse(a.toLocaleDateString()) - Date.parse(b.toLocaleDateString())
// 				)
// 			}
// 		}
// 	}
// 	return denaeDateTPA
// }
export const buildAllTPAs = (
	members: Array<crewMember>,
	allFlights: Array<flight>
): Array<{ name: string; TPA: pilotDateTPA }> => {
	let pilotTPA: Array<{ name: string; TPA: pilotDateTPA }> = buildInitialPilotTPAs(members)
	console.log(pilotTPA)
	allFlights.forEach((flight) => {
		const flightDate = new Date(flight.departureDate)
		const allCrewMembers = [flight.chief, flight.pilot, ...flight.crewMembers]
		allCrewMembers.forEach((crewMember) => {
			const speciality = members[members.findIndex((member) => member.trigram === crewMember)].onBoardFunction
			if (speciality === "CDA" || speciality === "pilote") {
				pilotTPA = pilotTPA.map((tpa) => {
					if (tpa.name === crewMember) {
						const TPAIndex = flight.pilotTPA.findIndex((element) => element.name === crewMember)
						return updatePilotTPA(flight.pilotTPA[TPAIndex], flight.crewTPA, flightDate, tpa)
					} else return tpa
				})
			}
		})
	})
	return pilotTPA
}
