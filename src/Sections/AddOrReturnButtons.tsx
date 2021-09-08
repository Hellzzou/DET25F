import React from "react"
import { Button } from "../BasicComponents/Button"
import { addOrReturnButtonsProps } from "../types/Sections"

export const AddOrReturnButtons = (props: addOrReturnButtonsProps): JSX.Element => {
	return (
		<div className='row justify-content-center' style={{ width: "100%" }}>
			<div className='col-md-6 row justify-content-center'>
				<Button
					size={3}
					buttonColor='success'
					buttonContent={props.addContent}
					onClick={props.addClick}
					disabled={!props.validity}
				/>
				<div className='col-md-1'></div>
				<Button
					size={3}
					buttonColor='danger'
					buttonContent='Supprimer'
					onClick={props.deleteClick}
					disabled={props.disableDelete}
				/>
				<div className='col-md-1'></div>
				<Button size={3} buttonColor='danger' buttonContent='Annuler' onClick={props.returnClick} />
			</div>
		</div>
	)
}
