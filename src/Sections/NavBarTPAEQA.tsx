import React from "react"
import { Button } from "../BasicComponents/Button"
import { months } from "../Datas/constants"
import { NavbarTPAEQAProps } from "../types/Sections"

export const NavBarTPAEQA = (props: NavbarTPAEQAProps): JSX.Element => {
	return (
		<div className='mt-2 row justify-content-center'>
			<Button
				size={4}
				buttonColor='primary'
				buttonContent={months[props.date.getMonth() - 1]}
				onClick={props.prev}
				disabled={
					new Date().getMonth() === props.date.getMonth() &&
					new Date().getFullYear() === props.date.getFullYear()
				}
			/>
			<div className='text-center fs-4 fw-bold col-md-2'>{`${
				months[props.date.getMonth()]
			} ${props.date.getFullYear()}`}</div>
			<Button
				size={4}
				buttonColor='primary'
				buttonContent={months[props.date.getMonth() + 1]}
				onClick={props.next}
			/>
		</div>
	)
}
