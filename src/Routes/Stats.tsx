import React, { useState } from "react"
import { Nav } from "react-bootstrap"
import { DateChoiceNavbar } from "../Sections/DateChoiceNavbar"
import { MainNavBar } from "../Sections/MainNavbar"
import { INITIAL_ENDDATE_CONTROL } from "../tools/dateManager"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { ChartDatas, CrewMember, Flight, Group, Alert, Conso } from "../types/Objects"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { alertDateFinderURL, consoURL, DebriefedflightDateFinderURL, groupURL, memberURL } from "../Datas/urls"
import { buildAlertByMember, buildConsoChart, buildFlightNumber, buildRepartition } from "../tools/buildStats"
import { INITIAL_CHART_DATA } from "../Datas/initialObjects"

export const Stats = (): JSX.Element => {
	const [startDate, setStartDate] = useState({
		value: new Date().getFullYear() + "-01-01",
		validity: true,
		disabled: false,
	})
	const [endDate, setEndDate] = useState(INITIAL_ENDDATE_CONTROL)
	const [data, setData] = useState<ChartDatas>(INITIAL_CHART_DATA)
	const [chart, setChart] = useState("line")
	const [consos, setConsos] = useState<Conso[]>([])
	const [groups, setGroups] = useState<Group[]>([])
	const [members, setMembers] = useState<CrewMember[]>([])
	const [alerts, setAlerts] = useState<Alert[]>([])
	const [flights, setFlights] = useState<Flight[]>([])
	const Conso = async (underGroups?: string[]) => {
		const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
		const startDate = new Date(endDate.getFullYear(), 0, 1)
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate,
			endDate,
		})
		const groups = await getFetchRequest<Group[]>(groupURL)
		if (typeof groups !== "string" && typeof allDebriefedFlights !== "string")
			setData(
				buildConsoChart(
					groups.filter(({ underGroup }) => underGroups?.includes(underGroup)),
					allDebriefedFlights
				)
			)
		setChart("line")
	}
	const repartition = (prop: "NCArea" | "type") => {
		setData(buildRepartition(flights, prop))
		setChart("bar")
	}
	const flightNumber = () => {
		setData(buildFlightNumber(flights))
		setChart("doughnut")
	}
	const alertByMember = async () => {
		setData(buildAlertByMember(alerts, members))
		setChart("bar")
	}
	useAsyncEffect(async () => {
		const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
		const startDate = new Date(endDate.getFullYear(), 0, 1)
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate,
			endDate,
		})
		if (typeof allDebriefedFlights !== "string") setFlights(allDebriefedFlights)
		const groups = await getFetchRequest<Group[]>(groupURL)
		if (typeof groups !== "string") setGroups(groups)
		if (typeof groups !== "string" && typeof allDebriefedFlights !== "string")
			setData(buildConsoChart(groups, allDebriefedFlights))
		const consos = await getFetchRequest<Conso[]>(consoURL)
		if (typeof consos !== "string") {
			setConsos(
				consos.sort(
					(conso1, conso2) => parseInt(conso1.name.split(" ")[1]) - parseInt(conso2.name.split(" ")[1])
				)
			)
		}
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof members !== "string") setMembers(members)
		const alerts = await postFetchRequest<Alert[]>(alertDateFinderURL, {
			start: startDate,
			end: endDate,
		})
		if (typeof alerts !== "string") setAlerts(alerts)
		setChart("line")
	}, [])
	useAsyncEffect(async () => {
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setFlights(allDebriefedFlights)
		const alerts = await postFetchRequest<Alert[]>(alertDateFinderURL, {
			start: startDate.value,
			end: endDate.value,
		})
		if (typeof alerts !== "string") setAlerts(alerts)
	}, [startDate.value, endDate.value])
	return (
		<>
			<MainNavBar />
			<div className='row mx-0' style={{ height: "94vh" }}>
				<div className='col-md-2 card-body-color'>
					<h4 className='text-center pt-2'>Statistiques</h4>
					<hr />
					<ul>
						<li>Consomation</li>
						<Nav defaultActiveKey='/home' className='flex-column'>
							<Nav.Link onClick={() => Conso(groups.map(({ underGroup }) => underGroup))}>Total</Nav.Link>
							{consos.sort().map((conso) => (
								<Nav.Link key={consos.indexOf(conso)} onClick={() => Conso(conso.underGroups)}>
									{conso.name}
								</Nav.Link>
							))}
						</Nav>
						<li>Répartition</li>
						<Nav defaultActiveKey='/home' className='flex-column'>
							<Nav.Link onClick={() => flightNumber()}>Vols annulés</Nav.Link>
							<Nav.Link onClick={() => repartition("NCArea")}>heures par zones NC</Nav.Link>
							<Nav.Link onClick={() => repartition("type")}>heures par types de vol</Nav.Link>
						</Nav>
						<li>Crevardomètre</li>
						<Nav defaultActiveKey='/home' className='flex-column'>
							<Nav.Link onClick={alertByMember}>Alertes par personne</Nav.Link>
						</Nav>
					</ul>
				</div>
				<div className='col-md-10'>
					<DateChoiceNavbar
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
					/>
					{chart === "line" && <Line data={data} />}
					{chart === "bar" && <Bar data={data} />}
					{chart === "doughnut" && (
						<div style={{ height: "85vh" }}>
							<Doughnut
								options={{
									responsive: true,
									maintainAspectRatio: false,
								}}
								data={data}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
