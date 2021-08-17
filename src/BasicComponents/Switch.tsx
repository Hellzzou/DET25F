import React from "react"
import { switchProps } from "../types/BasicComponents"

export const Switch = (props: switchProps): JSX.Element => {
	return (
		<div className={`form-check form-switch col-md-${props.size}`}>
			<input
				className='form-check-input'
				type='checkbox'
				checked={props.control.value}
				onChange={() => props.handleChange(props.control)}
			/>
			<label className='form-check-label'>{props.control.name}</label>
		</div>
	)
}
