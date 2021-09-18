import React from "react"
import { weekNavBarProps } from "../types/BasicComponents"
import { Button } from "../BasicComponents/Button"
import { getWeekNumber } from "../tools/dateManager"

export const WeekNavBar = (props: weekNavBarProps): JSX.Element => {
	return (
		<div className='row m-1 my-0 justify-content-center'>
			<Button size={2} buttonContent='Semaine précédente' buttonColor='primary' onClick={props.previousClick} />
			<div className='col-md-1'></div>
			<Button size={2} buttonContent='Nouvel évènement' buttonColor='primary' onClick={props.newEventClick} />
			<div className='col-md-2 text-center fw-bold fs-4'>{`Semaine ${getWeekNumber(props.firstDay)}`}</div>
			<Button size={2} buttonContent='Cette semaine' buttonColor='primary' onClick={props.nowClick} />
			<div className='col-md-1'></div>
			<Button size={2} buttonContent='Semaine suivante' buttonColor='primary' onClick={props.nextClick} />
		</div>
	)
}
