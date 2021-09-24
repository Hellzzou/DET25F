import React, { useState } from "react"
import { Nav } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { INITIAL_USER } from "../Datas/initialObjects"
import { getOneUserURL } from "../Datas/urls"
import { getFetchRequest } from "../tools/fetch"
import { user } from "../types/Objects"
import { DBCardProps } from "../types/Sections"

export const DBCard = (props: DBCardProps): JSX.Element => {
	const [user, setUser] = useState<user>(INITIAL_USER)
	useAsyncEffect(async () => {
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setUser(user)
	}, [])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<h5 className='card-title text-center py-0'>{props.title}</h5>
				<hr className='m-2'></hr>
				<div className='text-center'>{props.infos}</div>
				<div className='mutedWarning'>{props.warning}</div>
			</div>
			<Nav.Link
				href={props.url}
				className='text-decoration-none card-body-color text-center'
				disabled={props.title === "UTILISATEURS" && user.responsability !== "Admin"}>
				Modifier
			</Nav.Link>
		</div>
	)
}
