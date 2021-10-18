import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { AlertRow } from "../Articles/AlertRow"
import { FlightRow } from "../Articles/FlightRow"
import { OtherEvent } from "../Articles/OtherEventRow"
import { HolidaysRow } from "../Articles/HolidaysRow"
import {
	aircraftURL,
	alertDateFinderURL,
	eventDateFinderURL,
	flightDateFinderURL,
	holidayDateFinderURL,
	memberURL,
	nightURL,
} from "../Datas/urls"
import { currentMonday, days, inDays } from "../Datas/constants"
import { getSunsets } from "../tools/dateManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Aircraft, Alert, CrewMember, Event, Flight, Holiday, Nights } from "../types/Objects"
import { WeekNavBar } from "./WeekNavBar"
import sun from "../images/sun.png"
import moon from "../images/moon.png"
import { Button } from "../BasicComponents/Button"
import { FDVButton } from "../BasicComponents/FDVButton"
import {
	buildWeekAlerts,
	buildWeekConflicts,
	buildWeekEvents,
	buildWeekFlights,
	buildWeekHolidays,
	sortFlightByPlane,
} from "../tools/buildWeekEvents"
import { INITIAL_ALERT } from "../Datas/initialObjects"
import { WeekProps } from "../types/Sections"
import { ConflictsRow } from "../Articles/ConflictsRow"

export const Week = (props: WeekProps): JSX.Element => {
	const colNumber = Array.from(Array(34), () => "3.4%")
	const [monday, setMonday] = useState(parseInt(props.date))
	const [weekFlights, setWeekFlights] = useState<Flight[][]>([])
	const [weekAlerts, setWeekAlerts] = useState<Alert[]>([INITIAL_ALERT])
	const [weekEvents, setWeekEvents] = useState<Event[][]>([])
	const [weekHolidays, setWeekHolidays] = useState<Holiday[][]>([])
	const [weekConflicts, setWeekConflicts] = useState<Record<string, string[]>[]>([])
	const [aircrafts, setAircrafts] = useState<Aircraft[]>([])
	const [nights, setNights] = useState<Nights>([[]])
	const history = useHistory()
	useAsyncEffect(async () => {
		const start = new Date(monday)
		const end = new Date(monday + 7 * inDays)
		const flights = await postFetchRequest<Flight[]>(flightDateFinderURL, { start, end })
		const alerts = await postFetchRequest<Alert[]>(alertDateFinderURL, { start, end })
		const events = await postFetchRequest<Event[]>(eventDateFinderURL, { start, end })
		const holidays = await postFetchRequest<Holiday[]>(holidayDateFinderURL, { start, end })
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		const aircrafts = await getFetchRequest<Aircraft[]>(aircraftURL)
		const nights = await getFetchRequest<Nights[]>(nightURL)
		setNights(nights[0])
		setAircrafts(aircrafts)
		setWeekFlights(buildWeekFlights(flights, monday))
		setWeekAlerts(buildWeekAlerts(alerts, monday))
		setWeekEvents(buildWeekEvents(events, monday))
		setWeekHolidays(buildWeekHolidays(holidays, monday))
		setWeekConflicts(
			buildWeekConflicts(
				members,
				buildWeekFlights(flights, monday),
				buildWeekEvents(events, monday),
				buildWeekAlerts(alerts, monday),
				buildWeekHolidays(holidays, monday),
				aircrafts
			)
		)
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
				<table className='col-md-12 table table-secondary table-striped table-sm align-middle my-1'>
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
										<div className='col-md-5'>
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
										<div className='col-md-2'>
											{weekConflicts[days.indexOf(day)] && (
												<ConflictsRow
													conflicts={weekConflicts[days.indexOf(day)]}
													date={monday}
													day={day}
												/>
											)}
										</div>
										<div className='col-md-5'>
											<div className='row'>
												<div className='col-md-4'>
													<img src={sun} className='d-inline mx-1' />
												</div>
												<div className='col-md-8'>
													{getSunsets(nights, monday + days.indexOf(day) * inDays, "jour")}
												</div>
											</div>
											<div className='row'>
												<div className='col-md-4'>
													<img src={moon} className='d-inline mx-1' />
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
										{aircrafts &&
											weekFlights[days.indexOf(day)] &&
											sortFlightByPlane(weekFlights[days.indexOf(day)], aircrafts).map(
												(flights) => (
													<FlightRow
														key={sortFlightByPlane(
															weekFlights[days.indexOf(day)],
															aircrafts
														).indexOf(flights)}
														events={flights}
														jAero={getSunsets(
															nights,
															monday + days.indexOf(day) * inDays,
															"jour"
														)}
														nAero={getSunsets(
															nights,
															monday + days.indexOf(day) * inDays,
															"nuit"
														)}
														date={monday}
													/>
												)
											)}

										<OtherEvent events={weekEvents[days.indexOf(day)]} date={monday} />
										<HolidaysRow holidays={weekHolidays[days.indexOf(day)]} date={monday} />
									</table>
								</td>
								<td className='p-0'>
									<AlertRow
										events={weekAlerts[days.indexOf(day)]}
										date={monday + days.indexOf(day) * inDays}
										week={monday}
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
