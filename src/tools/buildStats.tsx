import { months } from "../Datas/constants"
import { ChartDatas, CrewMember, Flight, Group, Alert } from "../types/Objects"

export const buildConsoChart = (groups: Group[], flights: Flight[]): ChartDatas => {
	const allocation = groups.reduce((acc, group) => {
		if (group.allocation !== -1) acc += group.allocation
		return acc
	}, 0)
	const reference = Array.from(Array(12), () => allocation / 12).map((alloc, index) => alloc * (index + 1))
	const underGroups = groups.map(({ underGroup }) => underGroup)
	const monthly = flights
		.filter(({ group }) => underGroups.includes(group))
		.reduce<number[]>(
			(acc, flight) => {
				const { dayDuration, nightDuration, departureDate } = flight
				const monthDeparture = new Date(departureDate).getMonth()
				acc[monthDeparture] += parseFloat(dayDuration) + parseFloat(nightDuration)
				return acc
			},
			Array.from(Array(12), () => 0)
		)
	for (let i = 1; i < monthly.length; i++) monthly[i] += monthly[i - 1]
	return {
		labels: months,
		datasets: [
			{
				label: "Consommation moyenne",
				data: reference,
				backgroundColor: ["rgb(32, 184, 104)"],
				borderColor: ["rgba(32, 184, 104, 0.2)"],
			},
			{
				label: "consommation réelle",
				data: monthly,
				backgroundColor: ["rgb(88, 160, 231)"],
				borderColor: ["rgba(88, 160, 231, 0.2)"],
			},
		],
	}
}
export const buildRepartition = (flights: Flight[], prop: "NCArea" | "type"): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		const { dayDuration, nightDuration } = flight
		if (!acc[flight[prop]]) acc[flight[prop]] = 0
		acc[flight[prop]] += parseFloat(dayDuration) + parseFloat(nightDuration)
		return acc
	}, {})
	return {
		labels: Object.entries(datas).map(([group]) => group),
		datasets: [
			{
				label: "Répartition par Zone",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: ["rgb(88, 160, 231)"],
				borderColor: ["rgba(88, 160, 231, 0.2)"],
			},
		],
	}
}
export const buildFlightNumber = (flights: Flight[]): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		if (!acc[flight.done]) acc[flight.done] = 0
		acc[flight.done] += 1
		return acc
	}, {})
	return {
		labels: Object.entries(datas).map(([done]) => done),
		datasets: [
			{
				label: "Répartition par Zone",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: ["rgb(123, 214, 88)", "rgb(214, 107, 88)", "rgb(247, 163, 68)"],
				borderColor: ["rgba(88, 160, 231, 0.2)"],
			},
		],
	}
}
export const buildAlertByMember = (alerts: Alert[], members: CrewMember[]): ChartDatas => {
	const cdas = members.filter(({ onBoardFunction }) => onBoardFunction === "CDA")
	const pilots = members.filter(({ onBoardFunction }) => onBoardFunction === "pilote")
	const mecbos = members.filter(({ onBoardFunction }) => onBoardFunction === "MECBO")
	const navs = members.filter(({ onBoardFunction }) => onBoardFunction === "DENAE")
	const radios = members.filter(({ onBoardFunction }) => onBoardFunction === "GETBO")
	const techs = members.filter(({ onBoardFunction }) => onBoardFunction === "TECH")
	const init = [...cdas, ...pilots, ...mecbos, ...navs, ...radios, ...techs].reduce<Record<string, number>>(
		(acc, { trigram }) => {
			acc[trigram] = 0
			return acc
		},
		{}
	)
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
				backgroundColor: [
					...cdas.map(() => "rgb(71, 154, 236)"),
					...pilots.map(() => "rgb(226, 92, 68)"),
					...mecbos.map(() => "rgb(215, 226, 68)"),
					...navs.map(() => "rgb(168, 68, 226)"),
					...radios.map(() => "rgb(226, 171, 68)"),
					...techs.map(() => "rgb(68, 226, 121)"),
				],
				borderColor: ["rgba(88, 160, 231, 0.2)"],
			},
		],
	}
}
