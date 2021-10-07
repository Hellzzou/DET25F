import { inDays } from "../Datas/constants"
import { Control, Nights } from "../types/Objects"

export const getWeekNumber = (date: number): number => {
	let i = 0
	for (i; i <= 7; i++) if (new Date(new Date(date).getFullYear(), 0, i).getDay() === 0) break
	const firstMonday = Date.parse(new Date(new Date(date).getFullYear(), 0, i).toDateString())
	return Math.ceil((date - firstMonday) / 1000 / 60 / 60 / 24 / 7)
}
export const findNumberOfWeeks = (): number => {
	let i = 0
	for (i; i <= 7; i++) if (new Date(new Date().getFullYear(), 0, 31 - i).getDay() === 0) break
	return getWeekNumber(Date.parse(new Date(new Date().getFullYear(), 11, 31 - i).toDateString()))
}
export const getSunsets = (nights: Nights, date: number, type: string): string => {
	const thisDate = new Date(date)
	if (nights[0][0])
		return type === "jour"
			? nights[thisDate.getMonth()][thisDate.getDate() - 1].jour + "L"
			: nights[thisDate.getMonth()][thisDate.getDate() - 1].nuit + "L"
	return ""
}
export const returnHoursInInteger = (value: string): number => {
	if (value.split("")[0] === "0") return parseInt(value.split("")[1])
	return parseInt(value)
}
export const getDateNumber = (number: number): string => (number < 10 ? "0" + number : number.toString())
export const getMonthNumber = (number: number): string => (number < 9 ? "0" + (number + 1) : (number + 1).toString())
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
	jour = Math.ceil(jour * 10) / 10
	nuit = Math.ceil(nuit * 10) / 10
	return { jour: jour, nuit: nuit }
}
export const INITIAL_STARTDATE_CONTROL = {
	value: new Date().getFullYear() + "-" + getMonthNumber(new Date().getMonth()) + "-01",
	validity: true,
	disabled: false,
}
export const INITIAL_ENDDATE_CONTROL = {
	value:
		new Date().getFullYear() +
		"-" +
		getMonthNumber(new Date().getMonth()) +
		"-" +
		getDateNumber(new Date().getDate()),
	validity: true,
	disabled: false,
}
export const getBriefingTime = (departureTime: Control): Control => {
	console.log(departureTime.value)
	let hours = 0
	let minutes = 0
	if (parseInt(departureTime.value.split(":")[1]) < 30) {
		hours = parseInt(departureTime.value.split(":")[0]) - 2
		minutes = parseInt(departureTime.value.split(":")[1]) + 30
	} else {
		hours = parseInt(departureTime.value.split(":")[0]) - 1
		minutes = parseInt(departureTime.value.split(":")[1]) - 30
	}
	return {
		value: (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? minutes + "0" : minutes),
		validity: true,
		disabled: false,
	}
}
export const getEndOfMonth = (): Date =>
	new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime() - inDays)
export const getEndOfNextMonth = (date: Date): Date =>
	new Date(new Date(date.getFullYear(), date.getMonth() + 2, 1).getTime() - inDays)
export const getEndOfPreviousMonth = (date: Date): Date =>
	new Date(new Date(date.getFullYear(), date.getMonth(), 1).getTime() - inDays)
