import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { nightURL } from "../Datas/urls"
import { getSunsets } from "../tools/dateManager"
import { getFetchRequest } from "../tools/fetch"
import { returnZeroOrValue } from "../tools/maths"
import { Flight, Nights } from "../types/Objects"
import { FlightTableProps } from "../types/Sections"

export const FlightTable = (props: FlightTableProps): JSX.Element => {
	const [nights, setNights] = useState<Nights>([[]])
	const history = useHistory()
	const onFlightClick = (flight: Flight) =>
		history.push(
			`/debriefFlight/${flight._id}/${getSunsets(nights, Date.parse(flight.departureDate), "jour")}/${getSunsets(
				nights,
				Date.parse(flight.departureDate),
				"nuit"
			)}`
		)
	useAsyncEffect(async () => {
		const nights = await getFetchRequest<Nights[]>(nightURL)
		if (typeof nights !== "string") setNights(nights[0])
	})
	return (
		<>
			{props.flights.length !== 0 && (
				<table className='table table-sm table-primary table-striped text-center'>
					<thead className='table-light card-body-color border border-secondary fs-5 table-bordered'>
						<th scope='col'>Date</th>
						<th>Avion</th>
						<th>CDA</th>
						<th>Groupe</th>
						<th>Type</th>
						<th>Mission</th>
						<th>Jour</th>
						<th>Nuit</th>
						<th>Total</th>
					</thead>
					<tbody>
						{props.flights &&
							props.flights.map((flight) => (
								<tr key={props.flights.indexOf(flight)} onClick={() => onFlightClick(flight)}>
									<td>{new Date(flight.departureDate).toLocaleDateString()}</td>
									<td>{flight.aircraft}</td>
									<td>{flight.chief}</td>
									<td>{flight.group}</td>
									<td>{flight.type}</td>
									<td>{flight.mission}</td>
									<td>{returnZeroOrValue(flight.dayDuration).toFixed(1)}</td>
									<td>{returnZeroOrValue(flight.nightDuration).toFixed(1)}</td>
									<td>
										{(
											returnZeroOrValue(flight.dayDuration) +
											returnZeroOrValue(flight.nightDuration)
										).toFixed(1)}
									</td>
								</tr>
							))}
					</tbody>
					<tfoot>
						<tr className='table-secondary'>
							<th colSpan={5} className='text-end'></th>
							<th>TOTAL</th>
							<th>
								{props.flights
									.reduce((acc, flight) => acc + parseFloat(flight.dayDuration), 0)
									.toFixed(1)}
							</th>
							<th>
								{props.flights
									.reduce((acc, flight) => acc + parseFloat(flight.nightDuration), 0)
									.toFixed(1)}
							</th>
							<th>
								{props.flights
									.reduce(
										(acc, flight) =>
											acc + parseFloat(flight.dayDuration) + parseFloat(flight.nightDuration),
										0
									)
									.toFixed(1)}
							</th>
						</tr>
					</tfoot>
				</table>
			)}
			{props.flights.length === 0 && (
				<div className='row justify-content-center'>
					<h4 className='col-md-12 text-center'>AUCUN VOL TROUVÉ</h4>
				</div>
			)}
		</>
	)
}
