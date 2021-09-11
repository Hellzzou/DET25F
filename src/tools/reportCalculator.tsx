/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Duration, Group } from "../types/Objects"

export const groupFilter = (groups: Group[], groupName: string): Group[] => {
	const regex = "^" + groupName
	return groups.filter((group) => new RegExp(regex).test(group.underGroup))
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
export const monthReportByCel = (flights: Record<string, Duration>[], underGroups: Group[], month: number): number =>
	underGroups.reduce(
		(acc, { underGroup }) =>
			acc + flights[month][underGroup].dayDuration + flights[month][underGroup].nightDuration,
		0
	)
export const monthReportByUnderGRoup = (flights: Record<string, Duration>[], group: string): number =>
	flights.reduce((acc, month) => acc + month[group].dayDuration + month[group].nightDuration, 0)
export const sameAllocSum = (flights: Record<string, Duration>[], underGroups: string[]): number =>
	underGroups.reduce((acc, underGroup) => acc + monthReportByUnderGRoup(flights, underGroup), 0)
export const allocSumOfAGroup = (underGroups: Group[]): number =>
	underGroups.reduce((acc, underGroup) => (acc = underGroup.allocation !== -1 ? acc + underGroup.allocation : acc), 0)
export const nightReportByCol = (flights: Record<string, Duration>[], underGroups: Group[], month: number): number =>
	underGroups.reduce((acc, { underGroup }) => acc + flights[month][underGroup].nightDuration, 0)
export const sumQOGFlights = (flights: Record<string, Duration>[], underGroups: Group[]): number =>
	flights.reduce((acc, month) => acc + monthReportByCel(flights, underGroups, flights.indexOf(month)), 0)
export const monthReportNight = (flights: Record<string, Duration>[], underGroups: Group[]): number =>
	flights.reduce((acc, month) => acc + nightReportByCol(flights, underGroups, flights.indexOf(month)), 0)
export const weekReportByUnderGroups = (flights: Record<string, number>[], underGroup: string): number =>
	flights.reduce((acc, week) => acc + week[underGroup], 0)
export const weekReportByWeek = (flight: Record<string, number>, underGroups: string[]): number =>
	underGroups.reduce((acc, underGroup) => acc + flight[underGroup], 0)
export const weekReport = (flights: Record<string, number>[], underGroups: string[]): number =>
	underGroups.reduce((acc, underGroup) => acc + weekReportByUnderGroups(flights, underGroup), 0)
