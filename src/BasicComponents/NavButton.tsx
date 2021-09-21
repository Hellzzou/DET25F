import React from "react"
import { Link } from "react-router-dom"
import { NavButtonProps } from "../types/BasicComponents"

export const NavButton = (props: NavButtonProps): JSX.Element => {
	return (
		<Link className='text-decoration-none' to={props.link}>
			<span className='mx-3 fs-5 text-uppercase bg-dark alegreya'>{props.content}</span>
		</Link>
	)
}
