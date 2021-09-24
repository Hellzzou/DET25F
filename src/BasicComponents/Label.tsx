import React from "react"
import { LabelProps } from "../types/BasicComponents"

export const Label = (props: LabelProps): JSX.Element => {
	return <label className={`col-md-${props.size} col-form-label fw-bold align-self-center`}>{props.title}</label>
}
