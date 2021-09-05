import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { AlertRow } from "../Articles/AlertRow"
import { FlightRow } from "../Articles/FlightRow"
import { OtherEvent } from "../Articles/OtherEventRow"
import { DB_URL } from "../Datas/datas"
import { currentMonday, days, inDays } from "../Datas/dates"
import { getSunsets } from "../tools/date"
import { getFetchRequest } from "../tools/fetch"
import { getWeekEvents } from "../tools/getWeekEvents"
import { newAlert, newEvent, flight, Nights } from "../types/Objects"
import { WeekNavBar } from "./WeekNavBar"
import sun from "../images/sun.png"
import moon from "../images/moon.png"

export const Week = (): JSX.Element => {
	const [monday, setMonday] = useState(currentMonday)
	const [weekFlights, setWeekFlights] = useState<Array<Array<flight>>>([])
	const [weekAlerts, setWeekAlerts] = useState<Array<Array<newAlert>>>([])
	const [weekEvents, setWeekEvents] = useState<Array<Array<newEvent>>>([])
	const [nights, setNights] = useState<Nights>([[]])
	const history = useHistory()
	const nextWeekClick = () => {
		setMonday(monday + 7 * inDays)
	}
	const previousWeekClick = () => {
		setMonday(monday - 7 * inDays)
	}
	const thisWeekClick = () => {
		setMonday(currentMonday)
	}
	const newEventClick = () => {
		history.push("/newFlight")
	}
	useAsyncEffect(async () => {
		const weekFlights = await getWeekEvents(monday, monday + 7 * inDays, "flights")
		if (typeof weekFlights !== "string") setWeekFlights(weekFlights)
		else console.log(weekFlights)
		const weekEvents = await getWeekEvents(monday, monday + 7 * inDays, "events")
		if (typeof weekEvents !== "string") setWeekEvents(weekEvents)
		else console.log(weekEvents)
		const weekAlerts = await getWeekEvents(monday, monday + 7 * inDays, "alerts")
		if (typeof weekAlerts !== "string") setWeekAlerts(weekAlerts)
		else console.log(weekAlerts)
		const nights = await getFetchRequest(DB_URL + "nights")
		setNights(nights[0])
	}, [monday])
	return (
		<div className='row m-1'>
			<WeekNavBar
				nextClick={nextWeekClick}
				previousClick={previousWeekClick}
				nowClick={thisWeekClick}
				newEventClick={newEventClick}
				firstDay={monday}
			/>
			<table className='col-md-12 table table-secondary table-sm table-striped align-middle caption-top'>
				<colgroup>
					<col width='11%'></col>
					<col width='82%'></col>
					<col width='7%'></col>
				</colgroup>
				<thead>
					<tr>
						<th>
							<div className='row'>
								<div className='col-md-6 text-center'>Date</div>
								<div className='col-md-6 text-center'>Jour / Nuit</div>
							</div>
						</th>
						<th></th>
						<th className='text-center'>Alerte</th>
					</tr>
				</thead>
				<tbody>
					{days.map((day) => (
						<tr key={days.indexOf(day)}>
							<td>
								<div className='row'>
									<div className='col-md-6'>
										<div className='text-center'>{day}</div>
										<div className='text-center'>
											{new Date(monday + days.indexOf(day) * inDays).toLocaleDateString()}
										</div>
									</div>
									<div className='col-md-6'>
										<div className='row'>
											<div className='col-md-4'>
												<img src={sun} className='d-inline mx-1 align-bottom' />
											</div>
											<div className='col-md-8'>
												{getSunsets(nights, monday, days.indexOf(day), "jour")}
											</div>
										</div>
										<div className='row'>
											<div className='col-md-4'>
												<img src={moon} className='d-inline mx-1 align-bottom' />
											</div>
											<div className='col-md-8'>
												{getSunsets(nights, monday, days.indexOf(day), "nuit")}
											</div>
										</div>
									</div>
								</div>
							</td>
							<td className='text-center'>
								<table width='100%'>
									<colgroup>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
										<col width='6.8%'></col>
									</colgroup>
									<FlightRow
										events={
											typeof weekFlights !== "undefined" ? weekFlights[days.indexOf(day)] : []
										}
										jAero={getSunsets(nights, monday, days.indexOf(day), "jour")}
										nAero={getSunsets(nights, monday, days.indexOf(day), "nuit")}
									/>
									<OtherEvent
										events={typeof weekEvents !== "undefined" ? weekEvents[days.indexOf(day)] : []}
									/>
								</table>
							</td>
							<td className='p-0'>
								<AlertRow
									events={typeof weekAlerts !== "undefined" ? weekAlerts[days.indexOf(day)] : []}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
