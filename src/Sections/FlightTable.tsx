import React from "react"
import { returnZeroOrValue } from "../tools/maths"
import { FlightTableProps } from "../types/Sections"

export const FlightTable = (props: FlightTableProps): JSX.Element => {
	return (
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
						<tr key={props.flights.indexOf(flight)}>
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
									returnZeroOrValue(flight.dayDuration) + returnZeroOrValue(flight.nightDuration)
								).toFixed(1)}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	)
}
