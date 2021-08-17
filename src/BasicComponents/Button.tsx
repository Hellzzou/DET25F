import React from "react"
import { ButtonProps } from "../types/BasicComponents"

export const Button = (props: ButtonProps): JSX.Element => {
	return (
		<button
			type='button'
			className={`col-md-${props.size} btn btn-${props.buttonColor}`}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.buttonContent}
		</button>
	)
}
