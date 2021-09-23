import { months } from "../Datas/dates"
import { ChartDatas, flight, Group, newAlert } from "../types/Objects"

export const buildConsoChart = (groups: Group[], flights: flight[]): ChartDatas => {
	const underGroups = groups.map(({ underGroup }) => underGroup)
	const allocation = groups.reduce((acc, group) => {
		if (group.allocation !== -1) acc += group.allocation
		return acc
	}, 0)
	const reference = Array.from(Array(12), () => allocation / 12).map((alloc, index) => alloc * (index + 1))
	const datas = flights
		.filter((flight) => underGroups.includes(flight.group))
		.reduce<number[]>((acc, flight) => {
			const departureDate = new Date(flight.departureDate).getMonth()
			if (!acc[departureDate]) acc[departureDate] = 0
			acc[departureDate] += parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
			return acc
		}, [])
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
				label: "consommatiion réelle",
				data: datas,
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
export const buildGroupRepartition = (flights: flight[]): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		if (!acc[flight.group]) acc[flight.group] = 0
		acc[flight.group] += parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
		return acc
	}, {})
	return {
		labels: Object.entries(datas).map(([group]) => group),
		datasets: [
			{
				label: "Répartition par groupe",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
export const buildAreaRepartition = (flights: flight[]): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		if (!acc[flight.area]) acc[flight.area] = 0
		acc[flight.area] += parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
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
export const buildAreaNCRepartition = (flights: flight[]): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		if (!acc[flight.NCArea]) acc[flight.NCArea] = 0
		acc[flight.NCArea] += parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
		return acc
	}, {})
	return {
		labels: Object.entries(datas).map(([group]) => group),
		datasets: [
			{
				label: "Répartition par zone en ZEE",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
export const buildTypeRepartition = (flights: flight[]): ChartDatas => {
	const datas = flights.reduce<Record<string, number>>((acc, flight) => {
		if (!acc[flight.type]) acc[flight.type] = 0
		acc[flight.type] += parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration)
		return acc
	}, {})
	return {
		labels: Object.entries(datas).map(([group]) => group),
		datasets: [
			{
				label: "Répartition par tpye",
				data: Object.entries(datas).map(([, total]) => total),
				backgroundColor: "rgb(88, 160, 231)",
				borderColor: "rgba(88, 160, 231, 0.2)",
			},
		],
	}
}
export const buildAlertByMember = (alerts: newAlert[]): ChartDatas => {
	console.log(alerts)
	const datas = alerts.reduce<Record<string, number>>((acc, alert) => {
		if (!acc[alert.chief]) acc[alert.chief] = 0
		if (!acc[alert.pilot]) acc[alert.pilot] = 0
		if (!acc[alert.mecbo]) acc[alert.mecbo] = 0
		if (!acc[alert.radio]) acc[alert.radio] = 0
		if (!acc[alert.rdr]) acc[alert.rdr] = 0
		if (!acc[alert.nav]) acc[alert.nav] = 0
		if (!acc[alert.tech]) acc[alert.tech] = 0
		acc[alert.chief] += 1
		acc[alert.pilot] += 1
		acc[alert.mecbo] += 1
		acc[alert.radio] += 1
		acc[alert.rdr] += 1
		acc[alert.nav] += 1
		acc[alert.tech] += 1
		return acc
	}, {})
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
