import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { AlertRow } from "../Articles/AlertRow"
import { FlightRow } from "../Articles/FlightRow"
import { OtherEvent } from "../Articles/OtherEventRow"
import { alertDateFinderURL, eventDateFinderURL, flightDateFinderURL, nightURL } from "../Datas/urls"
import { currentMonday, days, inDays } from "../Datas/constants"
import { getSunsets } from "../tools/dateManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Alert, Event, Flight, Nights } from "../types/Objects"
import { WeekNavBar } from "./WeekNavBar"
import sun from "../images/sun.png"
import moon from "../images/moon.png"
import { Button } from "../BasicComponents/Button"
import { FDVButton } from "../BasicComponents/FDVButton"
import { buildWeekAlerts, buildWeekEvents, buildWeekFlights } from "../tools/buildWeekEvents"
import { INITIAL_ALERT } from "../Datas/initialObjects"
import { WeekProps } from "../types/Sections"

export const Week = (props: WeekProps): JSX.Element => {
	const colNumber = Array.from(Array(28), () => "3.4%")
	const [monday, setMonday] = useState(parseInt(props.date))
	const [weekFlights, setWeekFlights] = useState<Array<Array<Flight>>>([])
	const [weekAlerts, setWeekAlerts] = useState<Array<Alert>>([INITIAL_ALERT])
	const [weekEvents, setWeekEvents] = useState<Array<Array<Event>>>([])
	const [nights, setNights] = useState<Nights>([[]])
	const history = useHistory()
	useAsyncEffect(async () => {
		const flights = await postFetchRequest<Flight[]>(flightDateFinderURL, {
			start: new Date(monday),
			end: new Date(monday + 7 * inDays),
		})
		const alerts = await postFetchRequest<Alert[]>(alertDateFinderURL, {
			start: new Date(monday),
			end: new Date(monday + 7 * inDays),
		})
		const events = await postFetchRequest<Event[]>(eventDateFinderURL, {
			start: new Date(monday),
			end: new Date(monday + 7 * inDays),
		})
		if (typeof flights !== "string") setWeekFlights(buildWeekFlights(flights, monday))
		if (typeof alerts !== "string") setWeekAlerts(buildWeekAlerts(alerts, monday))
		if (typeof events !== "string") setWeekEvents(buildWeekEvents(events, monday))
		const nights = await getFetchRequest<Nights[]>(nightURL)
		if (typeof nights !== "string") setNights(nights[0])
	}, [monday])
	return (
		<>
			<div className='row m-1 my-0'>
				<WeekNavBar
					nextClick={() => setMonday(monday + 7 * inDays)}
					previousClick={() => setMonday(monday - 7 * inDays)}
					nowClick={() => setMonday(currentMonday)}
					newEventClick={() => history.push(`/newFlight/${monday}`)}
					firstDay={monday}
				/>
				<table className='col-md-12 table table-secondary table-sm align-middle my-1'>
					<colgroup>
						<col width='11%'></col>
						<col width='82%'></col>
						<col width='7%'></col>
					</colgroup>
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
											<div>
												<FDVButton
													date={new Date(monday + days.indexOf(day) * inDays)}
													size={12}
													buttonColor='primary'
													buttonContent='FDV'
													onClick={() =>
														history.push(
															`/fdv/${(monday + days.indexOf(day) * inDays).toString()}`
														)
													}
												/>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='row'>
												<div className='col-md-4'>
													<img src={sun} className='d-inline mx-1 align-bottom' />
												</div>
												<div className='col-md-8'>
													{getSunsets(nights, monday + days.indexOf(day) * inDays, "jour")}
												</div>
											</div>
											<div className='row'>
												<div className='col-md-4'>
													<img src={moon} className='d-inline mx-1 align-bottom' />
												</div>
												<div className='col-md-8'>
													{getSunsets(nights, monday + days.indexOf(day) * inDays, "nuit")}
												</div>
											</div>
										</div>
									</div>
								</td>
								<td className='text-center'>
									<table width='100%'>
										<colgroup>
											{colNumber.map((col, index) => (
												<col key={index} width={col}></col>
											))}
										</colgroup>
										<FlightRow
											events={weekFlights[days.indexOf(day)]}
											jAero={getSunsets(nights, monday + days.indexOf(day) * inDays, "jour")}
											nAero={getSunsets(nights, monday + days.indexOf(day) * inDays, "nuit")}
											date={monday}
										/>
										<OtherEvent events={weekEvents[days.indexOf(day)]} />
									</table>
								</td>
								<td className='p-0'>
									<AlertRow
										events={weekAlerts[days.indexOf(day) - 1]}
										date={monday + days.indexOf(day) * inDays}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonContent='ETAT 400'
					buttonColor='primary'
					onClick={() => history.push(`/etat400/${monday.toString()}`)}
				/>
			</div>
		</>
	)
}
