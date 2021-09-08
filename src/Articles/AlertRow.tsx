import React from "react"
import { useHistory } from "react-router-dom"
import { alertRowProps } from "../types/BasicComponents"

export const AlertRow = (props: alertRowProps): JSX.Element => {
	const history = useHistory()
	const alertClick = () => {
		history.push(`/newAlert/${props.events[0]._id}`)
	}
	return (
		<div onClick={alertClick}>
			{typeof props.events !== "undefined" && typeof props.events[0] !== "undefined" && (
				<div className='text-center bg-success rounded'>
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
					<div className='row'>
						<div className='col-md-12'>{props.events[0].tech}</div>
					</div>
				</div>
			)}
		</div>
	)
}
