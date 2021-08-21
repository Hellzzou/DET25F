import React from "react"
import { Button } from "../BasicComponents/Button"
import { months } from "../Datas/dates"
import { NavbarTPAEQAProps } from "../types/Sections"

export const NavBarTPAEQA = (props: NavbarTPAEQAProps): JSX.Element => {
	return (
		<div className='row justify-content-center'>
			<Button size={4} buttonColor='primary' buttonContent={months[new Date().getMonth()]} onClick={props.prev} />
			<div className='text-center fs-4 fw-bold col-md-2'>{months[props.date]}</div>
			<Button
				size={4}
				buttonColor='primary'
				buttonContent={months[new Date().getMonth() + 1]}
				onClick={props.next}
			/>
		</div>
	)
}
