import React, { useState } from "react"
import { Nav } from "react-bootstrap"
import { DateChoiceNavbar } from "../Sections/DateChoiceNavbar"
import { MainNavBar } from "../Sections/MainNavbar"
import { INITIAL_ENDDATE_CONTROL } from "../tools/dateManager"
import { Line, Bar } from "react-chartjs-2"
import { ChartDatas, flight, Group, newAlert } from "../types/Objects"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { alertDateFinderURL, DebriefedflightDateFinderURL, groupURL } from "../Datas/datas"
import {
	buildAlertByMember,
	buildAreaNCRepartition,
	buildAreaRepartition,
	buildConsoChart,
	buildGroupRepartition,
	buildTypeRepartition,
} from "../tools/buildStats"
import { groupFilter } from "../tools/reportCalculator"

export const Stats = (): JSX.Element => {
	const [startDate, setStartDate] = useState({
		value: new Date().getFullYear() + "-01-01",
		validity: true,
		disabled: false,
	})
	const [endDate, setEndDate] = useState(INITIAL_ENDDATE_CONTROL)
	const [data, setData] = useState<ChartDatas>()
	const [chart, setChart] = useState("line")
	const Conso = async (group: string) => {
		const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
		const startDate = new Date(endDate.getFullYear(), 0, 1)
		const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
			startDate,
			endDate,
		})
		const groups = await getFetchRequest<Group[]>(groupURL)
		if (typeof groups !== "string" && typeof allDebriefedFlights !== "string")
			setData(buildConsoChart(groupFilter(groups, group), allDebriefedFlights))
		setChart("line")
	}
	const groupRepartition = async () => {
		const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setData(buildGroupRepartition(allDebriefedFlights))
		setChart("bar")
	}
	const areaRepartition = async () => {
		const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setData(buildAreaRepartition(allDebriefedFlights))
		setChart("bar")
	}
	const areaNCRepartition = async () => {
		const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setData(buildAreaNCRepartition(allDebriefedFlights))
		setChart("bar")
	}
	const typeRepartition = async () => {
		const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
			startDate: startDate.value,
			endDate: endDate.value,
		})
		if (typeof allDebriefedFlights !== "string") setData(buildTypeRepartition(allDebriefedFlights))
		setChart("bar")
	}
	const alertByMember = async () => {
		const alerts = await postFetchRequest<newAlert[]>(alertDateFinderURL, {
			start: startDate.value,
			end: endDate.value,
		})
		if (typeof alerts !== "string") setData(buildAlertByMember(alerts))
		setChart("bar")
	}
	useAsyncEffect(async () => {
		const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
		const startDate = new Date(endDate.getFullYear(), 0, 1)
		const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
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
							<Nav.Link onClick={() => Conso("1")}>Groupe 1</Nav.Link>
							<Nav.Link onClick={() => Conso("2")}>Groupe 2</Nav.Link>
							<Nav.Link onClick={() => Conso("3")}>Groupe 3</Nav.Link>
						</Nav>
						<li>Répartition</li>
						<Nav defaultActiveKey='/home' className='flex-column'>
							<Nav.Link onClick={groupRepartition}>heures par groupes</Nav.Link>
							<Nav.Link onClick={areaRepartition}>heures par zones</Nav.Link>
							<Nav.Link onClick={areaNCRepartition}>heures par zones NC</Nav.Link>
							<Nav.Link onClick={typeRepartition}>heures par types de vol</Nav.Link>
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
					{chart === "line" && <Line data={data!} />}
					{chart === "bar" && <Bar data={data!} />}
				</div>
			</div>
		</>
	)
}
