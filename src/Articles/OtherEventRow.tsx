import React from "react"
import { getBetweenColSpan, getColSpan, getHour } from "../tools/date"
import { otherEventProps } from "../types/BasicComponents"

export const OtherEvent = (props: otherEventProps): JSX.Element => {
	return (
		<tbody>
			<tr>
				{typeof props.events !== "undefined" &&
					props.events.map((event) => (
						<>
							<td colSpan={getBetweenColSpan(event, props.events)}></td>
							<td
								key={props.events.indexOf(event)}
								className='rounded bg-warning align-middle container px-1'
								colSpan={getColSpan(event)}>
								<div className='row justify-content-center'>
									<div className='col-md-3'>{getHour(new Date(event.departureDate))}</div>
									<div className='col-md-6'>{event.event}</div>
									<div className='col-md-3'>{getHour(new Date(event.arrivalDate))}</div>
								</div>
							</td>
						</>
					))}
			</tr>
		</tbody>
	)
}
