import React from "react"
import { useHistory } from "react-router-dom"
import { getBetweenColSpan, getColSpan } from "../tools/date"
import { printArray } from "../tools/tools"
import { flightCellProps } from "../types/BasicComponents"

export const FlightCell = (props: flightCellProps): JSX.Element => {
	const history = useHistory()
	const onFlightClick = () => {
		history.push(`/debriefFlight/${props.event._id}/${props.jAero}/${props.nAero}`)
	}
	return (
		<>
			{getBetweenColSpan(props.event, props.events) > 0 && (
				<td colSpan={getBetweenColSpan(props.event, props.events)}></td>
			)}
			<td
				key={props.events.indexOf(props.event)}
				className='rounded bg-primary align-middle container px-1'
				colSpan={getColSpan(props.event)}
				onClick={onFlightClick}>
				<div className='row justify-content-center'>
					<div className='col-md-3'>
						{props.event.departureDate.split("T")[1].split(":")[0] +
							":" +
							props.event.departureDate.split("T")[1].split(":")[1]}
					</div>
					<div className='col-md-6'>{props.event.mission}</div>
					<div className='col-md-3'>
						{props.event.arrivalDate.split("T")[1].split(":")[0] +
							":" +
							props.event.arrivalDate.split("T")[1].split(":")[1]}
					</div>
				</div>
				<div className='row text-center'>
					<div className='col-md-9'>
						{props.event.chief + " " + props.event.pilot + " " + printArray(props.event.crewMembers)}
					</div>
					<div className='col-md-3'>{props.event.aircraft}</div>
				</div>
			</td>
		</>
	)
}
