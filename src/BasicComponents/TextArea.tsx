import React from "react"
import { textAreaProps } from "../types/BasicComponents"

export const TextArea = (props: textAreaProps): JSX.Element => {
	const printCrewMembers = (): string => {
		let members = ""
		props.control.value.forEach((member) => (members = members + " " + member))
		return members
	}
	return (
		<div className={`col-md-${props.size}`}>
			<textarea
				className={`form-control bg-${props.backgroundColor} color-${props.textColor}${
					props.control.validity ? "is-valid" : "is-invalid"
				}`}
				style={{ color: props.textColor }}
				rows={1}
				readOnly
				value={printCrewMembers()}></textarea>
		</div>
	)
}
