import React from "react"
import { alertRowProps } from "../types/BasicComponents"

export const AlertRow = (props: alertRowProps): JSX.Element => {
	return (
		<>
			{typeof props.events !== "undefined" && typeof props.events[0] !== "undefined" && (
				<div className='text-center'>
					<div className='row'>
						<div className='col-md-6'>{props.events[0].chief}</div>
						<div className='col-md-6'>{props.events[0].pilot}</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>{props.events[0].mecbo}</div>
						<div className='col-md-6'>{props.events[0].radio}</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>{props.events[0].nav}</div>
						<div className='col-md-6'>{props.events[0].rdr}</div>
					</div>
				</div>
			)}
		</>
	)
}
