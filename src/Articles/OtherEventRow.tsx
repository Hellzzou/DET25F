import React from "react"
import { useHistory } from "react-router-dom"
import { sortEventByRow } from "../tools/buildWeekEvents"
import { getBetweenColSpan, getColSpan } from "../tools/spanManager"
import { OtherEventProps } from "../types/BasicComponents"

export const OtherEvent = (props: OtherEventProps): JSX.Element => {
	const history = useHistory()
	const eventClick = (id: string): void => history.push(`/newEvent/${id}`)
	return (
		<tbody>
			{typeof props.events !== "undefined" &&
				sortEventByRow(props.events).map((eventRow) => (
					<tr key={sortEventByRow(props.events).indexOf(eventRow)}>
						{eventRow.map((event) => (
							<>
								<td colSpan={getBetweenColSpan(event, eventRow)}></td>
								<td
									key={props.events.indexOf(event)}
									className='rounded bg-event align-middle container px-1'
									colSpan={getColSpan(event)}
									onClick={() => eventClick(event._id)}>
									<div className='row justify-content-center'>
										<div className='col-md-3'>
											{event.event === "REPOS"
												? ""
												: event.departureDate.split("T")[1].split(":")[0] +
												  ":" +
												  event.departureDate.split("T")[1].split(":")[1]}
										</div>
										<div className='col-md-6'>{event.event}</div>
										<div className='col-md-3'>
											{event.arrivalDate.split("T")[1].split(":")[0] +
												":" +
												event.arrivalDate.split("T")[1].split(":")[1]}
										</div>
									</div>
								</td>
							</>
						))}
					</tr>
				))}
		</tbody>
	)
}
