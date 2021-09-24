import React, { useState } from "react"
import { Link } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { getOneUserURL } from "../Datas/urls"
import plane from "../images/whiteAircraft.png"
import { getFetchRequest } from "../tools/fetch"
import { user } from "../types/Objects"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { INITIAL_USER } from "../Datas/initialObjects"

export const MainNavBar = (): JSX.Element => {
	const [user, setUser] = useState<user>(INITIAL_USER)
	useAsyncEffect(async () => {
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setUser(user)
	}, [])
	return (
		<Navbar bg='dark' className='px-2' variant='dark'>
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
					<Nav.Link className='text-primary mx-2' href='/stats'>
						Statistiques
					</Nav.Link>
					<Nav.Link
						className='text-primary mx-2'
						href='/manageDB'
						disabled={user.responsability === "Utilisateur"}>
						Gérer la DB
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<div className='justify-content-end'>
				<Nav className='text-white'>
					<NavDropdown id='' title={user.rank + " " + user.name} menuVariant='dark'>
						<NavDropdown.Item>
							<Link to='/myAccount' className='text-primary text-decoration-none mx-2'>
								mon compte
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item>
							<Link to='/' className='text-warning text-decoration-none text-end mx-2'>
								déconnexion
							</Link>
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</div>
		</Navbar>
	)
}
