import React from "react"
import { useHistory } from "react-router-dom"
import { alertRowProps } from "../types/BasicComponents"

export const AlertRow = (props: alertRowProps): JSX.Element => {
	const history = useHistory()
	const alertClick = () => history.push(`/newAlert/${props.events._id}`)
	return (
		<div onClick={alertClick}>
			{typeof props.events !== "undefined" && typeof props.events !== "undefined" && (
				<div className='text-center bg-alert rounded'>
					<div className='row'>
						<div className='col-md-6'>{props.events.chief}</div>
						<div className='col-md-6'>{props.events.pilot}</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>{props.events.mecbo}</div>
						<div className='col-md-6'>{props.events.radio}</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>{props.events.nav}</div>
						<div className='col-md-6'>{props.events.rdr}</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>{props.events.tech}</div>
					</div>
				</div>
			)}
		</div>
	)
}
