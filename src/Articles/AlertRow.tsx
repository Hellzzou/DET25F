import React from "react"
import { useHistory } from "react-router-dom"
import { AlertRowProps } from "../types/BasicComponents"

export const AlertRow = (props: AlertRowProps): JSX.Element => {
	const history = useHistory()
	return (
		<div onClick={() => history.push(`/newAlert/${props.events._id}`)}>
			{!!props.events && !!props.events && (
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
