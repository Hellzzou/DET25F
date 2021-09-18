import { old } from "../Datas/dateTPA"
import { flight } from "../types/Objects"

export const getFlightColor = (flight: flight): string => (flight.client === "25F" ? "normalFlight" : "simar")
export const getAnnual = (date: Date, dateToCompare: number): string => {
	const lastYear = new Date(new Date().getFullYear(), dateToCompare - 12, 1)
	const lastMonth = new Date(new Date().getFullYear(), dateToCompare - 11, 1)
	return date < lastYear ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getQuadri = (date: Date, dateToCompare: number): string => {
	const fourMonths = new Date(new Date().getFullYear(), dateToCompare - 4, 1)
	const lastMonth = new Date(new Date().getFullYear(), dateToCompare - 3, 1)
	return date < fourMonths ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getMonthly = (date: Date, dateToCompare: number): string => {
	return date.getMonth() === dateToCompare ? "success" : "danger"
}
export const getDone = (date: Date): string => {
	return date !== old ? "success" : "danger"
}
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
export const hebdoColor = (underGroup: string): string => {
	if (/^1/.test(underGroup)) return "warning"
	if (/^2/.test(underGroup)) return "danger"
	return "primary"
}
