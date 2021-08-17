import React from "react"
import { inputProps } from "../types/BasicComponents"

export const Input = (props: inputProps): JSX.Element => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setControl({
			value: e.target.value,
			validity: props.validator(e.target.value),
			disabled: props.control.disabled,
		})
	}
	return (
		<div className={`col-md-${props.size}`}>
			<input
				className={`form-control bg-${props.backgroundColor} 
                    text-center text-${props.textColor} 
                    ${props.control.validity ? "is-valid" : "is-invalid"}`}
				type={props.type}
				min={props.min}
				max={props.max}
				placeholder={props.placeholder}
				onChange={handleInputChange}
				value={props.control.value}
				disabled={typeof props.control.disabled !== "undefined" ? props.control.disabled : false}
			/>
		</div>
	)
}
