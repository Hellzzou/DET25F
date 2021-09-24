import React from "react"
import { TPALineProps } from "../types/BasicComponents"

export const TPALine = (props: TPALineProps): JSX.Element => {
	return (
		<div className='row'>
			<div className='col-md-6 text-start'>{props.title}</div>
			<div className={`col-md-6 text-end text-${props.color}`}>{props.value}</div>
		</div>
	)
}
