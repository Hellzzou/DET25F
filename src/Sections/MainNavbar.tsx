import React, { useState } from "react"
import { Link } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { getOneUserURL } from "../Datas/datas"
import plane from "../images/whiteAircraft.png"
import { getFetchRequest } from "../tools/fetch"
import { user } from "../types/Objects"
import { Navbar, Nav } from "react-bootstrap"

export const MainNavBar = (): JSX.Element => {
	const [user, setUser] = useState("")
	useAsyncEffect(async () => {
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setUser(user.rank + " " + user.name)
	}, [])
	return (
		<Navbar bg='dark' className='mb-1'>
			<img src={plane} className='d-inline ms-2' />
			<div className='d-inline mx-3 text-white'>Activités DET 25F</div>
			<Navbar.Toggle aria-controls='navbarScroll' />
			<Navbar.Collapse id='navbarScroll'>
				<Nav className='mr-auto my-2 my-lg-0' style={{ maxHeight: "100px" }} navbarScroll>
					<Nav.Link className='text-primary' href='/activities/null'>
						Planchette
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/AllTPAs'>
						TPA
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/pilotEQA'>
						EQA
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/flightHours'>
						HDV
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/flightSearch'>
						Recherche
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/QOG'>
						C/R Mensuel
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/crHebdo'>
						C/R Hebdo
					</Nav.Link>
					<Nav.Link className='text-primary mx-2' href='/manageDB'>
						Gérer la DB
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<div className='justify-content-end'>
				<div className='text-white d-inline mx-2'>{user}</div>
				<Link to='/myAccount' className='text-primary text-decoration-none mx-2'>
					mon compte
				</Link>
				<Link to='/' className='text-warning text-decoration-none text-end mx-2'>
					déconnexion
				</Link>
			</div>
		</Navbar>
	)
}
