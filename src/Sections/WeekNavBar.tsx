import React from "react"
import { weekNavBarProps } from "../types/BasicComponents"
import { Button } from "../BasicComponents/Button"

export const WeekNavBar = (props: weekNavBarProps): JSX.Element => {
	return (
		<div className='row m-1 mt-2 justify-content-center'>
			<Button size={2} buttonContent='Semaine précédente' buttonColor='warning' onClick={props.previousClick} />
			<div className='col-md-1'></div>
			<Button size={2} buttonContent='Nouvel évènement' buttonColor='primary' onClick={props.newEventClick} />
			<div className='col-md-1'></div>
			<Button size={2} buttonContent='Cette semaine' buttonColor='warning' onClick={props.nowClick} />
			<div className='col-md-1'></div>
			<Button size={2} buttonContent='Semaine suivante' buttonColor='warning' onClick={props.nextClick} />
		</div>
	)
}
