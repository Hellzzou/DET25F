import { Duration, Group } from "../types/Objects"

export const duration = {
	dayDuration: 0,
	nightDuration: 0,
}
export const INITIAL_QOG = (allGroups: Array<Group>): Record<string, Array<Duration>> => {
	return allGroups.reduce<Record<string, Array<Duration>>>((acc, group) => {
		if (!acc[group.underGroup]) {
			acc[group.underGroup] = [{ dayDuration: 0, nightDuration: 0 }]
		}
		return acc
	}, {})
}
