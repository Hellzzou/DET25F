import React from "react"
import { labelProps } from "../types/BasicComponents"

export const Label = (props: labelProps): JSX.Element => {
	return <label className={`col-md-${props.size} col-form-label fw-bold align-self-center`}>{props.title}</label>
}
