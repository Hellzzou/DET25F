import React from "react"
import { selectProps } from "../types/BasicComponents"

export const Select = (props: selectProps): JSX.Element => {
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.setControl({
			value: e.target.value,
			validity: props.validator(e.target.value),
			disabled: props.control.disabled,
		})
	}
	return (
		<div className={`col-md-${props.size}`}>
			<select
				className={`form-select bg-${props.backgroundColor} 
                    text-${props.textColor} 
                    ${props.control.validity ? "is-valid" : "is-invalid"}`}
				onChange={handleSelectChange}
				value={props.control.value}
				disabled={typeof props.control.disabled !== "undefined" ? props.control.disabled : false}>
				<option>Choix...</option>
				{props.options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	)
}
