import React, { useState } from "react"
import { Nav } from "react-bootstrap"
import { DateChoiceNavbar } from "../Sections/DateChoiceNavbar"
import { MainNavBar } from "../Sections/MainNavbar"
import { INITIAL_ENDDATE_CONTROL } from "../tools/dateManager"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { ChartDatas, CrewMember, Flight, Group, Alert } from "../types/Objects"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { alertDateFinderURL, DebriefedflightDateFinderURL, groupURL, memberURL } from "../Datas/urls"
import { buildAlertByMember, buildConsoChart, buildFlightNumber, buildRepartition } from "../tools/buildStats"
import { clientUndergroupFilter } from "../tools/reportCalculator"
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
	const Conso = async (group: string, clients?: string[]) => {
		const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
		const startDate = new Date(endDate.getFullYear(), 0, 1)
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate,
			endDate,
		})
		const groups = await getFetchRequest<Group[]>(groupURL)
		if (typeof groups !== "string" && typeof allDebriefedFlights !== "string")
			setData(buildConsoChart(clientUndergroupFilter(groups, group, clients), allDebriefedFlights))
		setChart("line")
	}
	const repartition = async (prop: "NCArea" | "type") => {
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setData(buildRepartition(allDebriefedFlights, prop))
		setChart("bar")
	}
	const flightNumber = async () => {
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setData(buildFlightNumber(allDebriefedFlights))
		setChart("doughnut")
	}
	const alertByMember = async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		const alerts = await postFetchRequest<Alert[]>(alertDateFinderURL, {
			start: startDate.value,
			end: endDate.value,
		})
		if (typeof alerts !== "string" && typeof members !== "string") setData(buildAlertByMember(alerts, members))
		setChart("bar")
	}
	useAsyncEffect(async () => {
		const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
		const startDate = new Date(endDate.getFullYear(), 0, 1)
		const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
			startDate,
			endDate,
		})
		const groups = await getFetchRequest<Group[]>(groupURL)
		if (typeof groups !== "string" && typeof allDebriefedFlights !== "string")
			setData(buildConsoChart(groups, allDebriefedFlights))
		setChart("line")
	}, [])
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
							<Nav.Link onClick={() => Conso("[1-2-3]")}>Total</Nav.Link>
							<Nav.Link onClick={() => Conso("1", ["25F"])}>Groupe 1</Nav.Link>
							<Nav.Link onClick={() => Conso("2", ["25F"])}>Groupe 2 ( 25F )</Nav.Link>
							<Nav.Link onClick={() => Conso("2", ["EMMXX"])}>Groupe 2 ( EMM )</Nav.Link>
							<Nav.Link onClick={() => Conso("2", ["COSUPNO"])}>Groupe 2 ( EMIA )</Nav.Link>
							<Nav.Link onClick={() => Conso("3", ["25F"])}>Groupe 3 ( 25F )</Nav.Link>
							<Nav.Link onClick={() => Conso("3", ["COSUPNO", "ALFAN"])}>Groupe 3 ( EMM )</Nav.Link>
							<Nav.Link onClick={() => Conso("3", ["EMMXX", "CEPA"])}>Groupe 3 ( EMIA )</Nav.Link>
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
