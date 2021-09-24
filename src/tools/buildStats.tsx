import { months } from "../Datas/constants"
import { ChartDatas, crewMember, flight, Group, newAlert } from "../types/Objects"

export const buildConsoChart = (groups: Group[], flights: flight[]): ChartDatas => {
	const allocation = groups.reduce((acc, group) => {
		if (group.allocation !== -1) acc += group.allocation
		return acc
	}, 0)
	const reference = Array.from(Array(12), () => allocation / 12).map((alloc, index) => alloc * (index + 1))
	const underGroups = groups.map(({ underGroup }) => underGroup)
	const monthly = flights
		.filter((flight) => underGroups.includes(flight.group))
		.reduce<number[]>(
			(acc, flight) => {
				const { dayDuration, nightDuration, departureDate } = flight
				const monthDeparture = new Date(departureDate).getMonth()
				acc[monthDeparture] += parseFloat(dayDuration) + parseFloat(nightDuration)
				return acc
			},
			Array.from(Array(12), () => 0)
		)
	const datas = monthly.reduce<number[]>((acc, month, index) => {
		if (index !== 0) acc[index] += acc[index - 1]
		return acc
	}, monthly)
	return {
		labels: months,
		datasets: [
			{
				label: "Consommation moyenne",
				data: reference,
				backgroundColor: "rgb(32, 184, 104)",
				borderColor: "rgba(32, 184, 104, 0.2)",
			},
			{
				label: "consommation réelle",
				data: datas,
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
export const buildRepartition = (flights: flight[], prop: "area" | "NCArea" | "group" | "type"): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		if (!acc[flight[prop]]) acc[flight[prop]] = 0
		acc[flight[prop]] += parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
		return acc
	}, {})
	return {
		labels: Object.entries(datas).map(([group]) => group),
		datasets: [
			{
				label: "Répartition par Zone",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
export const buildAlertByMember = (alerts: newAlert[], members: crewMember[]): ChartDatas => {
	const init = members.reduce<Record<string, number>>((acc, { trigram }) => {
		acc[trigram] = 0
		return acc
	}, {})
	const datas = alerts.reduce<Record<string, number>>((acc, alert) => {
		acc[alert.chief] += 1
		acc[alert.pilot] += 1
		acc[alert.mecbo] += 1
		acc[alert.radio] += 1
		acc[alert.rdr] += 1
		acc[alert.nav] += 1
		acc[alert.tech] += 1
		return acc
	}, init)
	return {
		labels: Object.entries(datas).map(([group]) => group),
		datasets: [
			{
				label: "Nombre de jour d'alerte par personne",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
