import { crewMember } from "../types/Objects"
import { returnHoursInInteger } from "./date"
export const removeATPA = (array: Array<any>, value: string): Array<any> => {
	const newTPA = array
	const index = newTPA.findIndex((element) => element.name === value)
	if (index === -1) return array
	else if (index === 0) {
		newTPA.shift()
		return newTPA
	} else if (index === newTPA.length - 1) {
		newTPA.pop()
		return newTPA
	} else {
		return [...newTPA.slice(0, index), ...newTPA.slice(index + 1, newTPA.length)]
	}
}
export const removeAnEntry = (array: Array<string>, value: string): Array<string> => {
	const index = array.findIndex((element) => element === value)
	if (index === -1) return array
	else if (index === 0) {
		array.shift()
		return array
	} else if (index === array.length - 1) {
		array.pop()
		return array
	} else {
		return [...array.slice(0, index), ...array.slice(index + 1, array.length)]
	}
}
export const printArray = (array: Array<string>): string => {
	let str = ""
	array.forEach((value) => (str = str + value + " "))
	return str
}
export const getTrigrams = (crewMembers: Array<crewMember>): Array<string> => {
	const trigrams: Array<string> = []
	crewMembers.forEach((crewMember) => trigrams.push(crewMember.trigram))
	return trigrams
}
export const getQuantity = (fuels: Array<{ quantity: string }>): Array<string> => {
	const quantities: Array<string> = []
	fuels.forEach((fuel) => quantities.push(fuel.quantity))
	return quantities
}
export const getNumber = (aircrafts: Array<{ number: string }>): Array<string> => {
	const numbers: Array<string> = []
	aircrafts.forEach((aircraft) => numbers.push(aircraft.number))
	return numbers
}
export const getName = (types: Array<{ name: string }>): Array<string> => {
	const names: Array<string> = []
	types.forEach((type) => names.push(type.name))
	return names
}
export const returnZeroOrValue = (value: string): number => {
	if (value !== "" && typeof value != "undefined") return parseFloat(value)
	else return 0
}
export const returnDayNightDuration = (
	startTime: string,
	endTime: string,
	jAeroTime: string,
	nAeroTime: string
): { jour: number; nuit: number } => {
	const start =
		returnHoursInInteger(startTime.split(":")[0]) + (returnHoursInInteger(startTime.split(":")[1]) * 100) / 6000
	const end = returnHoursInInteger(endTime.split(":")[0]) + (returnHoursInInteger(endTime.split(":")[1]) * 100) / 6000
	const jAero =
		returnHoursInInteger(jAeroTime.split("h")[0]) +
		(returnHoursInInteger(jAeroTime.split("h")[1].split("L")[0]) * 100) / 6000
	const nAero =
		returnHoursInInteger(nAeroTime.split("h")[0]) +
		(returnHoursInInteger(nAeroTime.split("h")[1].split("L")[0]) * 100) / 6000
	let jour = 0
	let nuit = 0
	if (start < jAero) nuit += jAero - start
	else if (start > jAero && start < nAero) jour += nAero - start
	else if (start > nAero) nuit -= start - nAero
	if (end < jAero) nuit -= jAero - end
	else if (end > jAero && end < nAero) jour -= nAero - end
	else if (end > nAero) nuit += end - nAero
	jour = Math.floor(jour * 10) / 10
	nuit = Math.ceil(nuit * 10) / 10
	return { jour: jour, nuit: nuit }
}
export const roundToDecimal = (value: number): number => {
	return Math.round(value * 10) / 10
}
