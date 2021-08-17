import React from "react"
import { legendProps } from "../types/BasicComponents"

export const Legend = (props: legendProps): JSX.Element => (
	<legend className='text-center fw-bold'>{props.title}</legend>
)
