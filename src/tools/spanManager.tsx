import { flight, Group, newEvent } from "../types/Objects"
import { returnHoursInInteger } from "./dateManager"

export const getBetweenColSpan = (event: flight | newEvent, events: Array<flight | newEvent>): number => {
	if (events.indexOf(event) !== 0) {
		return (
			returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) -
			returnHoursInInteger(events[events.indexOf(event) - 1].arrivalDate.split("T")[1].split(":")[0])
		)
	}
	if (returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0]) >= 20)
		return (
			14 -
			Math.max(
				returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0]) -
					returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]),
				3
			)
		)
	return returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) - 6
}
export const getColSpan = (event: flight | newEvent): number => {
	return Math.max(new Date(event.arrivalDate).getUTCHours() - new Date(event.departureDate).getUTCHours(), 3)
}
export const allocRowSpan = (groups: Group[], index: number): number => {
	let rowSpan = 1
	let i = index
	if (i + 1 < groups.length && groups[i + 1].allocation !== -1) return 1
	while (i + 1 < groups.length && groups[i + 1].allocation === -1) {
		rowSpan += 1
		i++
	}
	return rowSpan
}
