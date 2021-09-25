import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "../BasicComponents/Button"

export const NewEventNavBar = (): JSX.Element => {
	const history = useHistory()
	const newFlightClick = () => history.push("/newFlight")
	const newEventClick = () => history.push("/newEvent/newOne")
	const newAlertClick = () => history.push("/newAlert/newOne")
	return (
		<div className='row justify-content-center p-2' style={{ width: "100%" }}>
			<Button size={3} buttonColor='primary' buttonContent='Nouveau vol' onClick={newFlightClick} />
			<div className='col-md-1'></div>
			<Button size={3} buttonColor='primary' buttonContent='Nouvel évènement' onClick={newEventClick} />
			<div className='col-md-1'></div>
			<Button size={3} buttonColor='primary' buttonContent='Nouvelle alerte' onClick={newAlertClick} />
		</div>
	)
}
