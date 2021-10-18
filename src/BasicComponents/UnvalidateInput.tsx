import React from "react"
import { UnvalidateInputProps } from "../types/BasicComponents"

export const UnvalidateInput = (props: UnvalidateInputProps): JSX.Element => {
	return (
		<div className={`col-md-${props.size}`}>
			<input
				className={`form-control bg-${props.backgroundColor} text-center text-${props.textColor} ${
					typeof props.control.validity !== "undefined"
						? props.control.validity
							? "is-valid"
							: "is-invalid"
						: ""
				}`}
				placeholder={props.placeholder}
				onChange={(e) => props.handleChange(e, props.control)}
				value={props.control.value}
				disabled={props.disabled ? props.disabled : false}
			/>
		</div>
	)
}
