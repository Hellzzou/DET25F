import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "../BasicComponents/Button"
import { NewEventNavBarProps } from "../types/Sections"

export const NewEventNavBar = (props: NewEventNavBarProps): JSX.Element => {
	const history = useHistory()
	return (
		<div className='row justify-content-center p-2' style={{ width: "100%" }}>
			<Button
				size={3}
				buttonColor='primary'
				buttonContent='Nouveau vol'
				onClick={() => history.push(`/newFlight/${props.date}`)}
			/>
			<div className='col-md-1'></div>
			<Button
				size={3}
				buttonColor='primary'
				buttonContent='Nouvel évènement'
				onClick={() => history.push(`/newEvent/newOne/${props.date}`)}
			/>
			<div className='col-md-1'></div>
			<Button
				size={3}
				buttonColor='primary'
				buttonContent='Nouvelle permission'
				onClick={() => history.push(`/newPerm/newOne/${props.date}`)}
			/>
		</div>
	)
}
