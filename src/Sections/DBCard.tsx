import React from "react"
import { Link } from "react-router-dom"
import { DBCardProps } from "../types/Sections"

export const DBCard = (props: DBCardProps): JSX.Element => {
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<h5 className='card-title text-center py-0'>{props.title}</h5>
				<hr className='m-2'></hr>
				<div className='text-center'>{props.infos}</div>
				<div className='mutedWarning'>{props.warning}</div>
			</div>
			<Link to={props.url} className='text-decoration-none card-body-color text-center'>
				<span>Modifier</span>
			</Link>
		</div>
	)
}
