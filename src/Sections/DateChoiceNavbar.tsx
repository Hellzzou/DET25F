import React from "react"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { dateIsCorrect } from "../tools/validators"
import { DateChoiceNavbarProps } from "../types/Sections"

export const DateChoiceNavbar = (props: DateChoiceNavbarProps): JSX.Element => {
	return (
		<div className='form-group row mx-1 justify-content-center card-body-color p-1 rounded'>
			<Label size={1} title='Date de début :' />
			<Input
				size={2}
				backgroundColor='dark'
				textColor='white'
				type='date'
				min={0}
				max={0}
				control={props.startDate}
				setControl={props.setStartDate}
				validator={dateIsCorrect}
			/>
			<Label size={1} title='Date de fin :' />
			<Input
				size={2}
				backgroundColor='dark'
				textColor='white'
				type='date'
				min={0}
				max={0}
				control={props.endDate}
				setControl={props.setEndDate}
				validator={dateIsCorrect}
			/>
		</div>
	)
}
