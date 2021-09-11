import { flight } from "../types/Objects"
import { returnHoursInInteger } from "./date"

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
export const getFlightColor = (flight: flight): string => (flight.client === "25F" ? "primary" : "danger")
