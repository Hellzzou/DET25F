/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { englishMonths } from "../Datas/dates"
import { Group } from "../types/Objects"

export const tableColor = (group: string): string => {
	if (group === "1") return "warning"
	if (group === "2") return "danger"
	return "primary"
}

export const groupFilter = (groups: Group[], groupName: string): Group[] => {
	const regex = "^" + groupName
	return groups.filter((group) => new RegExp(regex).test(group.underGroup))
}

export const allocRowSpan = (groups: Group[], index: number): number => {
	let rowSpan = 1
	let i = index
	if (i + 1 < groups.length && groups[i + 1]!.allocation !== -1) return 1
	while (i + 1 < groups.length && groups[i + 1]!.allocation === -1) {
		rowSpan += 1
		i++
	}
	return rowSpan
}

export const sumFlights = (groupFlights: { dayDuration: number; nightDuration: number }[]): number =>
	groupFlights.reduce<number>((acc, flight) => (acc = acc + flight.dayDuration + flight.nightDuration), 0)

export const sumFlightsNight = (groupFlights: { dayDuration: number; nightDuration: number }[]): number =>
	groupFlights.reduce<number>((acc, flight) => (acc = acc + flight.nightDuration), 0)

export const sumQOGFlightsByUnderGroup = (
	flights: Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>,
	group: string
): number => Object.entries(flights).reduce((acc, month) => (acc = acc + sumFlights(flights[month[0]][group])), 0)

export const getUnderGroupList = (groups: Group[], index: number): string[] => {
	const underGroupList = [groups[index].underGroup]
	let i = index
	if (i + 1 < groups.length && groups[i + 1]!.allocation !== -1) return [groups[index].underGroup]
	while (i + 1 < groups.length && groups[i + 1]!.allocation === -1) {
		underGroupList.push(groups[i + 1].underGroup)
		i++
	}
	return underGroupList
}

export const sumUnderGroupList = (
	flights: Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>,
	underGroups: string[]
): number => underGroups.reduce((acc, underGroup) => (acc = acc + sumQOGFlightsByUnderGroup(flights, underGroup)), 0)

export const allocSumOfAGroup = (underGroups: Group[]): number =>
	underGroups.reduce((acc, underGroup) => (acc = underGroup.allocation !== -1 ? acc + underGroup.allocation : acc), 0)

export const sumQOGFlightsByMontAndGroup = (
	flights: Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>,
	underGroups: Group[],
	month: string
): number => underGroups.reduce((acc, underGroup) => (acc = acc + sumFlights(flights[month][underGroup.underGroup])), 0)

export const sumQOGFlightsByMontAndGroupNight = (
	flights: Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>,
	underGroups: Group[],
	month: string
): number =>
	underGroups.reduce((acc, underGroup) => (acc = acc + sumFlightsNight(flights[month][underGroup.underGroup])), 0)

export const sumQOGFlights = (
	flights: Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>,
	underGroups: Group[]
): number => {
	return englishMonths.reduce(
		(acc, month) => (acc = acc + sumQOGFlightsByMontAndGroup(flights, underGroups, month)),
		0
	)
}
export const sumQOGFlightsNight = (
	flights: Record<string, Record<string, { dayDuration: number; nightDuration: number }[]>>,
	underGroups: Group[]
): number => {
	return englishMonths.reduce(
		(acc, month) => (acc = acc + sumQOGFlightsByMontAndGroupNight(flights, underGroups, month)),
		0
	)
}
