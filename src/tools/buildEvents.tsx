/* eslint-disable indent */
import {
	INITIAL_CREWTPA,
	INITIAL_DENAETPA,
	INITIAL_MECBOTPA,
	INITIAL_PILOTEQA,
	INITIAL_PILOTTPA,
	INITIAL_RADIOTPA,
} from "../Datas/initialObjects"
import {
	Control,
	ControlArray,
	CrewMember,
	CrewTPA,
	DenaeTPA,
	Group,
	MecboTPA,
	PilotEQA,
	PilotTPA,
	RadioTPA,
} from "../types/Objects"
import { returnDayNightDuration } from "./dateManager"

export const buildNewFlight = (
	hooks: Array<Control>,
	crewMembers: ControlArray,
	allGroups: Group[],
	allMembers: CrewMember[]
): unknown => {
	const pilotTPA: Array<PilotTPA> = []
	const pilotEQA: Array<PilotEQA> = []
	const mecboTPA: Array<MecboTPA> = []
	const radioTPA: Array<RadioTPA> = []
	const denaeTPA: Array<DenaeTPA> = []
	pilotTPA.push({ name: hooks[14].value, TPA: INITIAL_PILOTTPA })
	pilotTPA.push({ name: hooks[15].value, TPA: INITIAL_PILOTTPA })
	pilotEQA.push({ name: hooks[14].value, EQA: INITIAL_PILOTEQA })
	pilotEQA.push({ name: hooks[15].value, EQA: INITIAL_PILOTEQA })

	crewMembers.value.forEach((member) => {
		const onBoardFunction =
			allMembers[allMembers.findIndex((element) => element.trigram === member)].onBoardFunction
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
		briefingTime: new Date(Date.parse(hooks[0].value + " " + hooks[4].value) + 11 * 3600000),
		aircraft: hooks[5].value,
		fuel: hooks[6].value,
		config: hooks[7].value,
		type: hooks[8].value,
		mission: hooks[9].value,
		group: hooks[10].value,
		belonging: hooks[11].value,
		area: hooks[12].value,
		NCArea: hooks[13].value,
		chief: hooks[14].value,
		pilot: hooks[15].value,
		manager: allGroups.find((group) => group.underGroup === hooks[10].value)?.manager,
		client: allGroups.find((group) => group.underGroup === hooks[10].value)?.client,
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
	hooks: Array<Control>,
	crewMembers: ControlArray,
	crewTPA: CrewTPA,
	pilotTPA: Array<PilotTPA>,
	mecboTPA: Array<MecboTPA>,
	radioTPA: Array<RadioTPA>,
	denaeTPA: Array<DenaeTPA>,
	pilotEQA: Array<PilotEQA>,
	jAero: string,
	nAero: string,
	allGroups: Group[]
): unknown => {
	const dayDuration =
		hooks[16].value === "CNL" ? 0 : returnDayNightDuration(hooks[1].value, hooks[3].value, jAero, nAero).jour
	const nightDuration =
		hooks[16].value === "CNL" ? 0 : returnDayNightDuration(hooks[1].value, hooks[3].value, jAero, nAero).nuit
	const onDayDuration =
		hooks[16].value === "CNL" ? 0 : returnDayNightDuration(hooks[14].value, hooks[15].value, jAero, nAero).jour
	const onNightDuration =
		hooks[16].value === "CNL" ? 0 : returnDayNightDuration(hooks[14].value, hooks[15].value, jAero, nAero).nuit
	const debriefedFlight = {
		departureDate: new Date(Date.parse(hooks[0].value + " " + hooks[1].value) + 11 * 3600000),
		arrivalDate: new Date(Date.parse(hooks[2].value + " " + hooks[3].value) + 11 * 3600000),
		briefingTime: new Date(Date.parse(hooks[0].value + " " + hooks[4].value) + 11 * 3600000),
		aircraft: hooks[5].value,
		fuel: hooks[6].value,
		config: hooks[7].value,
		type: hooks[8].value,
		mission: hooks[9].value,
		area: hooks[10].value,
		NCArea: hooks[11].value,
		chief: hooks[12].value,
		pilot: hooks[13].value,
		crewMembers: crewMembers.value,
		status: "Debriefed",
		dayDuration: dayDuration,
		nightDuration: nightDuration,
		onTime: hooks[14].value,
		offTime: hooks[15].value,
		onDayDuration: onDayDuration,
		onNightDuration: onNightDuration,
		done: hooks[16].value,
		cause: hooks[17].value,
		group: hooks[18].value,
		manager: allGroups.find((group) => group.underGroup === hooks[18].value)?.manager,
		client: allGroups.find((group) => group.underGroup === hooks[18].value)?.client,
		belonging: hooks[19].value,
		pilotTPA: pilotTPA,
		mecboTPA: mecboTPA,
		radioTPA: radioTPA,
		denaeTPA: denaeTPA,
		pilotEQA: pilotEQA,
		crewTPA: crewTPA,
	}
	return debriefedFlight
}

export const buildNewEvent = (hooks: Array<Control>, members: ControlArray): unknown => {
	return {
		departureDate: new Date(Date.parse(hooks[0].value + " " + hooks[1].value) + 11 * 3600000),
		arrivalDate: new Date(Date.parse(hooks[2].value + " " + hooks[3].value) + 11 * 3600000),
		event: hooks[4].value,
		type: hooks[5].value,
		members: members.value,
	}
}
export const buildNewAlert = (hooks: Array<Control>): unknown => {
	return {
		departureDate: new Date(Date.parse(hooks[0].value + " " + "00:00") + 11 * 3600000),
		chief: hooks[1].value === "Choix..." ? "" : hooks[1].value,
		pilot: hooks[2].value === "Choix..." ? "" : hooks[2].value,
		mecbo: hooks[3].value === "Choix..." ? "" : hooks[3].value,
		nav: hooks[4].value === "Choix..." ? "" : hooks[4].value,
		rdr: hooks[5].value === "Choix..." ? "" : hooks[5].value,
		radio: hooks[6].value === "Choix..." ? "" : hooks[6].value,
		tech: hooks[7].value === "Choix..." ? "" : hooks[7].value,
	}
}
