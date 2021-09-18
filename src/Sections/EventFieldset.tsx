import React from "react"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { textIsNotNull } from "../tools/validators"
import { eventFieldsetProps } from "../types/Sections"

export const EventFieldset = (props: eventFieldsetProps): JSX.Element => {
	return (
		<fieldset className=' card-body-color rounded'>
			<Legend title='Evènement' />
			<div className='row form-group m-1'>
				<Label title='Intitulé :' size={4} />
				<Input
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.event}
					setControl={props.setEvent}
					validator={textIsNotNull}
					type='text'
					min={0}
					max={0}
					placeholder='évènement...'
				/>
			</div>
		</fieldset>
	)
}
