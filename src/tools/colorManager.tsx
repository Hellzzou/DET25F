import { old } from "../Datas/initialObjects"
import { Flight } from "../types/Objects"

export const getFlightColor = (flight: Flight): string => (flight.client === "25F" ? "normalFlight" : "simar")
export const getAnnual = (date: Date, dateToCompare: Date): string => {
	const lastYear = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth() - 12, 1)
	const lastMonth = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth() - 11, 1)
	return date < lastYear ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getQuadri = (date: Date, dateToCompare: Date): string => {
	const fourMonths = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth() - 4, 1)
	const lastMonth = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth() - 3, 1)
	return date < fourMonths ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getMonthly = (date: Date, dateToCompare: Date): string => {
	const lastMonth = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth(), 1)
	const twoLastMonth = new Date(dateToCompare.getFullYear(), dateToCompare.getMonth() - 1, 1)
	return date < twoLastMonth ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getDone = (date: Date): string => (date !== old ? "success" : "danger")
export const getDurationsValidity = (duration: number, durationToCompare: number): string => {
	if (duration < durationToCompare - durationToCompare / 4) return "danger"
	if (duration < durationToCompare) return "warning"
	return "success"
}
export const tableColor = (group: string): string => {
	if (group === "1") return "warning"
	if (group === "2") return "danger"
	return "primary"
}
export const groupColor = (group: string): string => {
	if (group === "1") return "yellowGroup"
	if (group === "2") return "redGroup"
	return "blueGroup"
}
export const hebdoColor = (underGroup: string): string => {
	if (/^1/.test(underGroup)) return "warning"
	if (/^2/.test(underGroup)) return "danger"
	return "primary"
}
