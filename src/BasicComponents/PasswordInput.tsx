import React from "react"
import { PasswordInputProps } from "../types/BasicComponents"

export const PasswordInput = (props: PasswordInputProps): JSX.Element => {
	return (
		<div className='col-md-8'>
			<input
				className={`form-control bg-dark text-center text-white ${
					props.password.validity ? "is-valid" : "is-invalid"
				}`}
				type={props.type}
				onChange={props.handleChange}
				value={props.password.value}
				disabled={false}
			/>
			<small className={`col-md-8 text-${props.info.color}`}>{props.info.value}</small>
		</div>
	)
}
