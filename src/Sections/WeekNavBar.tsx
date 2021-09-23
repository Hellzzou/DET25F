import React from "react"
import { weekNavBarProps } from "../types/BasicComponents"
import { getWeekNumber } from "../tools/dateManager"
import { Nav } from "react-bootstrap"

export const WeekNavBar = (props: weekNavBarProps): JSX.Element => {
	return (
		<div className='row m-1 my-0 justify-content-center'>
			<Nav.Link className='col-md-2'>
				<div
					className='text-primary border border-primary text-center rounded py-2'
					onClick={props.previousClick}>
					Semaine précédente
				</div>
			</Nav.Link>
			<div className='col-md-1'></div>
			<Nav.Link className='col-md-2'>
				<div
					className='text-dark bg-primary border border-primary text-center rounded py-2'
					onClick={props.newEventClick}>
					Nouvel évènement
				</div>
			</Nav.Link>
			<div className='col-md-2 text-center fw-bold fs-4'>{`Semaine ${getWeekNumber(props.firstDay)}`}</div>
			<Nav.Link className='col-md-2 text-end'>
				<div className='text-primary border border-primary text-center rounded py-2' onClick={props.nowClick}>
					Semaine actuelle
				</div>
			</Nav.Link>
			<div className='col-md-1'></div>
			<Nav.Link className='col-md-2 text-end'>
				<div className='text-primary border border-primary text-center rounded py-2' onClick={props.nextClick}>
					Semaine suivante
				</div>
			</Nav.Link>
		</div>
	)
}
