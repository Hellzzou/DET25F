import React from "react"
import { FDVButtonProps } from "../types/BasicComponents"

export const FDVButton = (props: FDVButtonProps): JSX.Element => {
	return (
		<button
			type='button'
			className={`col-md-${props.size} btn btn-${props.buttonColor} btn-sm`}
			onClick={() => props.onClick(props.date)}
			disabled={props.disabled}>
			{props.buttonContent}
		</button>
	)
}
