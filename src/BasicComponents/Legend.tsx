import React from "react"
import { LegendProps } from "../types/BasicComponents"

export const Legend = (props: LegendProps): JSX.Element => (
	<legend className='text-center fw-bold'>{props.title}</legend>
)
