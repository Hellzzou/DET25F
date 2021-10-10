import { Flight, Event, UpgradedGroup, Holiday } from "../types/Objects"

export const getBetweenColSpan = (event: Flight | Event, events: Array<Flight | Event>): number => {
	const departure = new Date(event.departureDate).getUTCHours() + new Date(event.departureDate).getUTCMinutes() / 60
	const arrival = new Date(event.arrivalDate).getUTCHours() + new Date(event.arrivalDate).getUTCMinutes() / 60
	if (events.indexOf(event) !== 0) {
		const previousDeparture =
			new Date(events[events.indexOf(event) - 1].departureDate).getUTCHours() +
			new Date(events[events.indexOf(event) - 1].departureDate).getUTCMinutes() / 60
		const previousArrival =
			new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCHours() +
			new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCMinutes() / 60
		return (departure - previousDeparture) * 2 - Math.max(previousArrival - previousDeparture, 2.5) * 2
	}
	if (arrival >= 20 && events.indexOf(event) === 0) return 27 - Math.max(arrival - departure, 3) * 2
	return Math.ceil((departure - 7) * 2)
}
export const getBetweenColSpanHoliday = (event: Holiday, events: Array<Holiday>): number => {
	let departure = 8
	if (event.type === "Perm PM" || event.type === "Recup PM") departure = 12
	if (events.indexOf(event) !== 0) {
		let arrival = 12
		if (
			events[events.indexOf(event) - 1].type !== "Perm AM" &&
			events[events.indexOf(event) - 1].type !== "Recup AM"
		)
			arrival = 16
		return (departure - arrival) * 2
	}
	return (departure - 7) * 2
}
export const getColSpan = (event: Flight | Event): number => {
	const departure = new Date(event.departureDate).getUTCHours() + new Date(event.departureDate).getUTCMinutes() / 60
	const arrival = new Date(event.arrivalDate).getUTCHours() + new Date(event.arrivalDate).getUTCMinutes() / 60
	return Math.max(arrival - departure, 2.5) * 2
}
export const getColSpanHoliday = (event: Holiday): number => {
	let departure = 8
	let arrival = 12
	if (event.type === "Perm PM" || event.type === "Recup PM") {
		departure = 12
		arrival = 16
	}
	if (event.type === "Perm journée" || event.type === "Recup journée") {
		departure = 8
		arrival = 16
	}
	return (arrival - departure) * 2
}
export const allocRowSpan = (groups: UpgradedGroup[], index: number): number => {
	let rowSpan = 1
	let i = index
	if (i + 1 < groups.length && groups[i + 1].allocation !== -1) return 1
	while (i + 1 < groups.length && groups[i + 1].allocation === -1) {
		rowSpan += 1
		i++
	}
	return rowSpan
}
