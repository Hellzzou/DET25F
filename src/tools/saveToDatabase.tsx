/* eslint-disable indent */
import { Alert } from "../types/Objects"
import { DB_URL } from "../Datas/datas"
import {
	INITIAL_CREWTPA,
	INITIAL_DENAETPA,
	INITIAL_MECBOTPA,
	INITIAL_PILOTEQA,
	INITIAL_PILOTTPA,
	INITIAL_RADIOTPA,
} from "../Datas/TPA"
import {
	control,
	controlArray,
	crewTPA,
	denaeTPA,
	Group,
	mecboTPA,
	pilotEQA,
	pilotTPA,
	radioTPA,
} from "../types/Objects"
import { getFetchRequest, postFetchRequest } from "./fetch"
import { returnDayNightDuration } from "./tools"

export async function buildNewFlight(
	hooks: Array<control>,
	crewMembers: controlArray,
	allGroups: Group[]
): Promise<unknown> {
	const allMembers = await getFetchRequest(DB_URL + "crewMembers")
	const pilotTPA: Array<pilotTPA> = []
	const pilotEQA: Array<pilotEQA> = []
	const mecboTPA: Array<mecboTPA> = []
	const radioTPA: Array<radioTPA> = []
	const denaeTPA: Array<denaeTPA> = []
	pilotTPA.push({ name: hooks[13].value, TPA: INITIAL_PILOTTPA })
	pilotTPA.push({ name: hooks[14].value, TPA: INITIAL_PILOTTPA })
	pilotEQA.push({ name: hooks[13].value, EQA: INITIAL_PILOTEQA })
	pilotEQA.push({ name: hooks[14].value, EQA: INITIAL_PILOTEQA })

	crewMembers.value.forEach((member) => {
		const onBoardFunction =
			allMembers[allMembers.findIndex((element: any) => element.trigram === member)].onBoardFunction
		if (onBoardFunction === "CDA" || onBoardFunction === "pilote") {
			pilotTPA.push({ name: member, TPA: INITIAL_PILOTTPA })
			pilotEQA.push({ name: member, EQA: INITIAL_PILOTEQA })
		}
		if (onBoardFunction === "MECBO") mecboTPA.push({ name: member, TPA: INITIAL_MECBOTPA })
		if (onBoardFunction === "GETBO") radioTPA.push({ name: member, TPA: INITIAL_RADIOTPA })
		if (onBoardFunction === "DENAE") denaeTPA.push({ name: member, TPA: INITIAL_DENAETPA })
	})
	const newFlight = {
		departureDate: new Date(Date.parse(hooks[0].value + " " + hooks[1].value) + 11 * 3600000),
		arrivalDate: new Date(Date.parse(hooks[2].value + " " + hooks[3].value) + 11 * 3600000),
		aircraft: hooks[4].value,
		fuel: hooks[5].value,
		config: hooks[6].value,
		type: hooks[7].value,
		mission: hooks[8].value,
		group: hooks[9].value,
		belonging: hooks[10].value,
		area: hooks[11].value,
		NCArea: hooks[12].value,
		chief: hooks[13].value,
		pilot: hooks[14].value,
		manager: allGroups.find((group) => group.underGroup === hooks[9].value)?.manager,
		client: allGroups.find((group) => group.underGroup === hooks[9].value)?.client,
		crewMembers: crewMembers.value,
		status: "inProgress",
		done: "Choix...",
		cause: "Choix...",
		pilotTPA: pilotTPA,
		mecboTPA: mecboTPA,
		radioTPA: radioTPA,
		denaeTPA: denaeTPA,
		pilotEQA: pilotEQA,
		crewTPA: INITIAL_CREWTPA,
	}
	return newFlight
}
export const buildDebriefedFlight = (
	hooks: Array<any>,
	crewMembers: controlArray,
	crewTPA: crewTPA,
	pilotTPA: Array<pilotTPA>,
	mecboTPA: Array<mecboTPA>,
	radioTPA: Array<radioTPA>,
	denaeTPA: Array<denaeTPA>,
	pilotEQA: Array<pilotEQA>,
	jAero: string,
	nAero: string,
	allGroups: Group[]
): unknown => {
	const dayDuration =
		hooks[15].value === "CNL" ? 0 : returnDayNightDuration(hooks[1].value, hooks[3].value, jAero, nAero).jour
	const nightDuration =
		hooks[15].value === "CNL" ? 0 : returnDayNightDuration(hooks[1].value, hooks[3].value, jAero, nAero).nuit
	const onDayDuration =
		hooks[15].value === "CNL" ? 0 : returnDayNightDuration(hooks[13].value, hooks[14].value, jAero, nAero).jour
	const onNightDuration =
		hooks[15].value === "CNL" ? 0 : returnDayNightDuration(hooks[13].value, hooks[14].value, jAero, nAero).nuit
	const debriefedFlight = {
		departureDate: new Date(Date.parse(hooks[0].value + " " + hooks[1].value) + 11 * 3600000),
		arrivalDate: new Date(Date.parse(hooks[2].value + " " + hooks[3].value) + 11 * 3600000),
		aircraft: hooks[4].value,
		fuel: hooks[5].value,
		config: hooks[6].value,
		type: hooks[7].value,
		mission: hooks[8].value,
		area: hooks[9].value,
		NCArea: hooks[10].value,
		chief: hooks[11].value,
		pilot: hooks[12].value,
		crewMembers: crewMembers.value,
		status: "Debriefed",
		dayDuration: dayDuration,
		nightDuration: nightDuration,
		onTime: hooks[13].value,
		offTime: hooks[14].value,
		onDayDuration: onDayDuration,
		onNightDuration: onNightDuration,
		done: hooks[15].value,
		cause: hooks[16].value,
		group: hooks[17].value,
		manager: allGroups.find((group) => group.underGroup === hooks[17].value)?.manager,
		client: allGroups.find((group) => group.underGroup === hooks[17].value)?.client,
		belonging: hooks[18].value,
		pilotTPA: pilotTPA,
		mecboTPA: mecboTPA,
		radioTPA: radioTPA,
		denaeTPA: denaeTPA,
		pilotEQA: pilotEQA,
		crewTPA: crewTPA,
	}
	console.log(debriefedFlight)
	return debriefedFlight
}

export const buildNewEvent = (hooks: Array<control>): unknown => {
	return {
		departureDate: new Date(Date.parse(hooks[0].value + " " + hooks[1].value) + 11 * 3600000),
		arrivalDate: new Date(Date.parse(hooks[2].value + " " + hooks[3].value) + 11 * 3600000),
		event: hooks[4].value,
	}
}
export const buildNewAlert = (hooks: Array<control>): unknown => {
	return {
		departureDate: new Date(Date.parse(hooks[0].value + " " + "00:00") + 11 * 3600000),
		chief: hooks[1].value,
		pilot: hooks[2].value,
		mecbo: hooks[3].value,
		nav: hooks[4].value,
		rdr: hooks[5].value,
		radio: hooks[6].value,
		tech: hooks[7].value,
	}
}
