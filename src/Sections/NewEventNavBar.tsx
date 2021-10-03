import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "../BasicComponents/Button"

export const NewEventNavBar = (): JSX.Element => {
	const history = useHistory()
	return (
		<div className='row justify-content-center p-2' style={{ width: "100%" }}>
			<Button
				size={3}
				buttonColor='primary'
				buttonContent='Nouveau vol'
				onClick={() => history.push("/newFlight")}
			/>
			<div className='col-md-1'></div>
			<Button
				size={3}
				buttonColor='primary'
				buttonContent='Nouvel évènement'
				onClick={() => history.push("/newEvent/newOne")}
			/>
		</div>
	)
}
