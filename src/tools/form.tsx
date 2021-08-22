import { DB_URL } from "../Datas/datas"
import { INITIAL_DENAETPA, INITIAL_MECBOTPA, INITIAL_PILOTEQA, INITIAL_PILOTTPA, INITIAL_RADIOTPA } from "../Datas/TPA"
import {
	control,
	controlArray,
	crewMember,
	denaeTPA,
	flight,
	mecboTPA,
	pilotEQA,
	pilotTPA,
	radioTPA,
} from "../types/Objects"
import { getFetchRequest } from "./fetch"
import { removeAnEntry, removeATPA, returnDayNightDuration, returnZeroOrValue } from "./tools"
import { selectChoiceIsDone, timeIsCorrect } from "./validators"

export const fullfillFlightForm = (setters: Array<any>, flight: flight): void => {
	const departureTime = flight.departureDate.split("T")[1].split("Z")[0]
	const arrivalTime = flight.arrivalDate.split("T")[1].split("Z")[0]
	setters[0]({ value: flight.departureDate.split("T")[0], validity: true })
	setters[1]({ value: departureTime, validity: true })
	setters[2]({ value: flight.arrivalDate.split("T")[0], validity: true })
	setters[3]({ value: arrivalTime, validity: true })
	setters[4]({ value: flight.aircraft, validity: true })
	setters[5]({ value: flight.fuel, validity: true })
	setters[6]({ value: flight.config, validity: true })
	setters[7]({ value: flight.type, validity: true })
	setters[8]({ value: flight.mission, validity: true })
	setters[9]({ value: flight.area, validity: true })
	setters[10]({ value: flight.NCArea, validity: flight.area === "ZEENC" || flight.NCArea !== "Choix..." })
	setters[11]({ value: flight.group, validity: selectChoiceIsDone(flight.group) })
	setters[12]({ value: flight.belonging, validity: selectChoiceIsDone(flight.belonging) })
	setters[13]({ value: flight.chief, validity: true })
	setters[14]({ value: flight.pilot, validity: true })
	setters[15]({ value: flight.crewMembers, validity: true })
	setters[16]({ value: flight.onTime, validity: timeIsCorrect(flight.onTime) })
	setters[17]({ value: flight.offTime, validity: timeIsCorrect(flight.offTime) })
	setters[18]({ value: flight.done, validity: selectChoiceIsDone(flight.done) })
	setters[19]({
		value: flight.cause,
		validity: flight.done === "ME" || flight.cause !== "Choix...",
		disabled: flight.done === "ME",
	})
	setters[20](flight.crewTPA)
	setters[21](flight.pilotTPA)
	setters[22](flight.mecboTPA)
	setters[23](flight.radioTPA)
	setters[24](flight.denaeTPA)
	setters[25](flight.pilotEQA)
	setters[26]({ value: returnZeroOrValue(flight.dayDuration), validity: true })
	setters[27]({ value: returnZeroOrValue(flight.nightDuration), validity: true })
}
export const removeTPA = (
	member: string,
	pilotTPA: Array<pilotTPA>,
	mecboTPA: Array<mecboTPA>,
	radioTPA: Array<radioTPA>,
	denaeTPA: Array<denaeTPA>,
	pilotEQA: Array<pilotEQA>,
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<pilotTPA>>>,
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<mecboTPA>>>,
	setRadioTPA: React.Dispatch<React.SetStateAction<Array<radioTPA>>>,
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<denaeTPA>>>,
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<pilotEQA>>>
): void => {
	setPilotTPA(removeATPA(pilotTPA, member))
	setMecboTPA(removeATPA(mecboTPA, member))
	setRadioTPA(removeATPA(radioTPA, member))
	setDenaeTPA(removeATPA(denaeTPA, member))
	setPilotEQA(removeATPA(pilotEQA, member))
}
export function addTPA(
	member: string,
	members: crewMember[],
	pilotTPA: Array<pilotTPA>,
	mecboTPA: Array<mecboTPA>,
	radioTPA: Array<radioTPA>,
	denaeTPA: Array<denaeTPA>,
	pilotEQA: Array<pilotEQA>,
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<pilotTPA>>>,
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<mecboTPA>>>,
	setRadioTPA: React.Dispatch<React.SetStateAction<Array<radioTPA>>>,
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<denaeTPA>>>,
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<pilotEQA>>>
): void {
	const onBoardFunction =
		members[members.findIndex((element: crewMember) => element.trigram === member)].onBoardFunction
	const newPilotTPA = pilotTPA
	const newPilotEQA = pilotEQA
	const newMecboTPA = mecboTPA
	const newRadioTPA = radioTPA
	const newDenaeTPA = denaeTPA
	if (onBoardFunction === "CDA" || onBoardFunction === "pilote") {
		newPilotTPA.push({ name: member, TPA: INITIAL_PILOTTPA })
		newPilotEQA.push({ name: member, EQA: INITIAL_PILOTEQA })
	}
	if (onBoardFunction === "MECBO") newMecboTPA.push({ name: member, TPA: INITIAL_MECBOTPA })
	if (onBoardFunction === "GETBO") newRadioTPA.push({ name: member, TPA: INITIAL_RADIOTPA })
	if (onBoardFunction === "DENAE") newDenaeTPA.push({ name: member, TPA: INITIAL_DENAETPA })
	setPilotTPA(newPilotTPA)
	setMecboTPA(newMecboTPA)
	setRadioTPA(newRadioTPA)
	setDenaeTPA(newDenaeTPA)
	setPilotEQA(newPilotEQA)
}
export const changePilotsTPA = (pilot: string, pilotTPA: Array<pilotTPA>, type: string): Array<pilotTPA> => {
	let newPilotTPA: Array<pilotTPA> = pilotTPA
	const index = newPilotTPA.findIndex((element: pilotTPA) => element.name === pilot)
	if (pilot !== "") {
		if (index !== -1) {
			if (index !== -1) {
				if (index === 0) newPilotTPA.shift()
				else if (index === newPilotTPA.length - 1) newPilotTPA.pop()
				else {
					newPilotTPA = [...newPilotTPA.slice(0, index), ...newPilotTPA.slice(index + 1, newPilotTPA.length)]
				}
			}
		}
		if (type === "chief") newPilotTPA[0] = { name: pilot, TPA: INITIAL_PILOTTPA }
		if (type === "pilot") newPilotTPA[1] = { name: pilot, TPA: INITIAL_PILOTTPA }
	}
	return newPilotTPA
}
export const changePilotsEQA = (pilot: string, pilotEQA: Array<pilotEQA>, type: string): Array<pilotEQA> => {
	let newPilotEQA: Array<pilotEQA> = pilotEQA
	if (pilot !== "") {
		const index = newPilotEQA.findIndex((element: pilotEQA) => element.name === pilot)
		if (index !== -1) {
			if (index !== -1) {
				if (index === 0) newPilotEQA.shift()
				else if (index === newPilotEQA.length - 1) newPilotEQA.pop()
				else {
					newPilotEQA = [...newPilotEQA.slice(0, index), ...newPilotEQA.slice(index + 1, newPilotEQA.length)]
				}
			}
		}
		if (type === "chief") newPilotEQA[0] = { name: pilot, EQA: INITIAL_PILOTEQA }
		if (type === "pilot") newPilotEQA[1] = { name: pilot, EQA: INITIAL_PILOTEQA }
	}
	return newPilotEQA
}
export const manageAddableList = (
	addableMembers: Array<string>,
	pilots: Array<string>,
	pilotToRemove: string
): Array<string> => {
	let newAddableMembers = addableMembers
	pilots.forEach((pilot) => (newAddableMembers = removeAnEntry(newAddableMembers, pilot)))
	pilots.forEach((pilot) => newAddableMembers.push(pilot))
	if (pilotToRemove !== "Choix...") newAddableMembers = removeAnEntry(newAddableMembers, pilotToRemove)
	return newAddableMembers
}
export const manageCrewMembers = (
	crewMembers: controlArray,
	setCrewMembers: React.Dispatch<React.SetStateAction<controlArray>>,
	pilot: string
): void => {
	let newCrewMembers = crewMembers.value
	if (pilot !== "" && typeof pilot !== "undefined" && pilot !== "Choix..." && newCrewMembers.length > 0) {
		if (newCrewMembers.findIndex((element: string) => element === pilot) !== -1) {
			newCrewMembers = removeAnEntry(newCrewMembers, pilot)
		}
		setCrewMembers({ value: newCrewMembers, validity: crewMembers.validity, disabled: false })
	}
}
export const manageNCAreas = (
	areaValue: string,
	setNCArea: React.Dispatch<React.SetStateAction<control>>,
	NCareaValue: string
): void => {
	if (areaValue !== "ZEENC" && areaValue !== "") {
		setNCArea({ value: "Choix...", validity: true, disabled: true })
	} else if (NCareaValue !== "") {
		setNCArea({ value: NCareaValue, validity: selectChoiceIsDone(NCareaValue), disabled: false })
	}
}
export const manageCNL = (
	doneValue: string,
	cause: control,
	setCause: React.Dispatch<React.SetStateAction<control>>,
	ON: control,
	setON: React.Dispatch<React.SetStateAction<control>>,
	OFF: control,
	setOFF: React.Dispatch<React.SetStateAction<control>>,
	group: control,
	setGroupe: React.Dispatch<React.SetStateAction<control>>,
	belongin: control,
	setBelonging: React.Dispatch<React.SetStateAction<control>>
): void => {
	if (doneValue === "ME" || doneValue === "MPE") {
		setON({ value: ON.value, validity: timeIsCorrect(ON.value), disabled: false })
		setOFF({ value: OFF.value, validity: timeIsCorrect(OFF.value), disabled: false })
		setGroupe({ value: group.value, validity: selectChoiceIsDone(group.value), disabled: false })
		setBelonging({ value: belongin.value, validity: selectChoiceIsDone(belongin.value), disabled: false })
	} else {
		setON({ value: "", validity: true, disabled: true })
		setOFF({ value: "", validity: true, disabled: true })
		setGroupe({ value: "Choix...", validity: true, disabled: true })
		setBelonging({ value: "Choix...", validity: true, disabled: true })
	}
	if (doneValue !== "ME" && cause.value !== "")
		setCause({ value: cause.value, validity: selectChoiceIsDone(cause.value), disabled: false })
	else if (cause.value !== "") setCause({ value: "Choix...", validity: true, disabled: true })
}
export const manageDuration = (
	start: control,
	end: control,
	jAero: string,
	nAero: string,
	done: string
): { jour: number; nuit: number } => {
	if (done !== "CNL" && start.validity && end.validity) {
		const duration = returnDayNightDuration(start.value, end.value, jAero, nAero)
		return { jour: duration.jour, nuit: duration.nuit }
	} else return { jour: 0, nuit: 0 }
}
export const removeCrewMembers = (
	array: Array<string>,
	crewMembers: Array<string>,
	chief: string,
	pilot: string
): Array<string> => {
	let addableCrewMembers = array
	crewMembers.forEach((crewMember) => {
		addableCrewMembers = removeAnEntry(addableCrewMembers, crewMember)
	})
	addableCrewMembers = removeAnEntry(addableCrewMembers, chief)
	addableCrewMembers = removeAnEntry(addableCrewMembers, pilot)
	return addableCrewMembers
}
