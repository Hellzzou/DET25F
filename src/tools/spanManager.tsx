import { Flight, Event, UpgradedGroup } from "../types/Objects"

export const getBetweenColSpan = (event: Flight | Event, events: Array<Flight | Event>): number => {
	const departure = new Date(event.departureDate).getUTCHours() + new Date(event.departureDate).getUTCMinutes() / 60
	const arrival = new Date(event.arrivalDate).getUTCHours() + new Date(event.arrivalDate).getUTCMinutes() / 60
	if (events.indexOf(event) !== 0) {
		if (arrival >= 20) {
			return (
				28 -
				new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCHours() * 2 -
				Math.max(arrival - departure, 3) * 2
			)
		}
		return (
			(departure -
				(new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCHours() +
					new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCMinutes() / 60)) *
			2
		)
	}
	if (arrival >= 20 && events.indexOf(event) === 0) return 28 - Math.max(arrival - departure, 3) * 2
	return Math.ceil((departure - 6) * 2)
}
export const getColSpan = (event: Flight | Event): number => {
	const departure = new Date(event.departureDate).getUTCHours() + new Date(event.departureDate).getUTCMinutes() / 60
	const arrival = new Date(event.arrivalDate).getUTCHours() + new Date(event.arrivalDate).getUTCMinutes() / 60
	return Math.max(arrival - departure, 2.5) * 2
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
