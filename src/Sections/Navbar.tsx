import React, { useState } from "react"
import { Link } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { NavButton } from "../BasicComponents/NavButton"
import { getOneUserURL } from "../Datas/datas"
import plane from "../images/whiteAircraft.png"
import { getFetchRequest } from "../tools/fetch"
import { user } from "../types/Objects"

export const Navbar = (): JSX.Element => {
	const [user, setUser] = useState("")
	useAsyncEffect(async () => {
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setUser(user.rank + " " + user.name)
	}, [])
	return (
		<nav className='p-3 mb-1 navbar navbar-expand-lg navbar-light bg-dark'>
			<div className='container-fluid'>
				<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
					<img src={plane} className='d-inline mx-1 align-bottom' />
					<div className='d-inline fs-5 mx-3 text-white'>Activités DET 25F</div>
					<div className='navbar-nav'>
						<NavButton content='Planchette' link='/activities/null' />
						<NavButton content='TPA' link='/AllTPAs' />
						<NavButton content='EQA' link='/pilotEQA' />
						<NavButton content='HDV' link='/flightHours' />
						<NavButton content='Recherche' link='/flightSearch' />
						<NavButton content='C/R Mensuel' link='/QOG' />
						<NavButton content='C/R Hebdo' link='/crHebdo' />
						<NavButton content='GERER LA DB' link='/manageDB' />
					</div>
					<div className='col-md-2'></div>
					<div className='text-white'>{user}</div>
					<Link className='text-decoration-none' to='/myAccount'>
						<span className='mx-3 text-primary bg-dark alegreya'>mon compte</span>
					</Link>
					<Link className='text-decoration-none' to='/'>
						<span className='mx-3 text-warning bg-dark alegreya'>déconnexion</span>
					</Link>
				</div>
			</div>
		</nav>
	)
}
