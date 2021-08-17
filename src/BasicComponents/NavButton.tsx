import React from "react"
import { Link } from "react-router-dom"
import { NavButtonProps } from "../types/BasicComponents"

export const NavButton = (props: NavButtonProps): JSX.Element => {
	return (
		<Link to={props.link}>
			<button className='btn btn-outline-primary border-dark fs-5 text-uppercase'>{props.content}</button>
		</Link>
	)
}
