/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Group } from "../types/Objects"

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
export const sumQOGFlightsByUnderGroup = (
	flights: Record<string, { dayDuration: number; nightDuration: number }>[],
	group: string
): number => {
	return flights.reduce((acc, month) => {
		const { dayDuration, nightDuration } = month[group]
		acc += dayDuration + nightDuration
		return acc
	}, 0)
}
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
	flights: Record<string, { dayDuration: number; nightDuration: number }>[],
	underGroups: string[]
): number => underGroups.reduce((acc, underGroup) => (acc += sumQOGFlightsByUnderGroup(flights, underGroup)), 0)

export const allocSumOfAGroup = (underGroups: Group[]): number =>
	underGroups.reduce((acc, underGroup) => (acc = underGroup.allocation !== -1 ? acc + underGroup.allocation : acc), 0)
export const sumQOGFlightsByMontAndGroup = (
	flights: Record<string, { dayDuration: number; nightDuration: number }>[],
	underGroups: Group[],
	month: number
): number => {
	return underGroups.reduce((acc, { underGroup }) => {
		const { dayDuration, nightDuration } = flights[month][underGroup]
		acc += dayDuration + nightDuration
		return acc
	}, 0)
}
export const sumQOGFlightsByMontAndGroupNight = (
	flights: Record<string, { dayDuration: number; nightDuration: number }>[],
	underGroups: Group[],
	month: number
): number => underGroups.reduce((acc, { underGroup }) => (acc += flights[month][underGroup].nightDuration), 0)

export const sumQOGFlights = (
	flights: Record<string, { dayDuration: number; nightDuration: number }>[],
	underGroups: Group[]
): number =>
	flights.reduce(
		(acc, month) => (acc += sumQOGFlightsByMontAndGroup(flights, underGroups, flights.indexOf(month))),
		0
	)
export const sumQOGFlightsNight = (
	flights: Record<string, { dayDuration: number; nightDuration: number }>[],
	underGroups: Group[]
): number =>
	flights.reduce(
		(acc, month) => (acc += sumQOGFlightsByMontAndGroupNight(flights, underGroups, flights.indexOf(month))),
		0
	)
export const sumHebdoFlightsByUnderGroups = (flights: Record<string, number>[], underGroup: string): number =>
	flights.reduce((acc, week) => (acc += week[underGroup]), 0)
export const sumHebdoFlightsByWeek = (flight: Record<string, number>, underGroups: string[]): number =>
	underGroups.reduce((acc, underGroup) => (acc += flight[underGroup]), 0)
export const sumHebdoFlights = (flights: Record<string, number>[], underGroups: string[]): number =>
	underGroups.reduce((acc, underGroup) => (acc += sumHebdoFlightsByUnderGroups(flights, underGroup)), 0)
