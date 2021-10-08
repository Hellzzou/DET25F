import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "../BasicComponents/Button"
import { AlertRowProps } from "../types/BasicComponents"

export const AlertRow = (props: AlertRowProps): JSX.Element => {
	const history = useHistory()
	return (
		<>
			{props.events ? (
				<div
					onClick={() => history.push(`/newAlert/${props.events._id}/modify/${props.week}`)}
					className='text-center bg-alert rounded pointer m-0 p-2 fullHeight'>
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
			) : (
				<Button
					size={12}
					buttonColor='primary'
					buttonContent='Ajouter une nouvelle alerte'
					onClick={() => history.push(`/newAlert/newOne/${props.date}/${props.week}`)}
				/>
			)}
		</>
	)
}
