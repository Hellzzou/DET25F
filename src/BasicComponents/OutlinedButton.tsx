import React from "react"
import { ButtonProps } from "../types/BasicComponents"

export const OutlinedButton = (props: ButtonProps): JSX.Element => {
	return (
		<div className={`col-md-${props.size} text-end`}>
			<button
				type='button'
				className={`col-md-${props.size} btn btn-outline-${props.buttonColor}`}
				onClick={props.onClick}
				disabled={props.disabled}
				data-bs-toggle='button'>
				{props.buttonContent}
			</button>
		</div>
	)
}
