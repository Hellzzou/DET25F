import React from "react"
import { NavButton } from "../BasicComponents/NavButton"

export const Navbar = (): JSX.Element => {
	return (
		<nav className='p-2 mb-1 navbar navbar-expand-lg navbar-light bg-dark'>
			<div className='container-fluid'>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNavAltMarkup'
					aria-controls='navbarNavAltMarkup'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse justify-content-center' id='navbarNavAltMarkup'>
					<div className='navbar-nav'>
						<NavButton content='Planchette' link='/activities' />
						<NavButton content='TPA' link='/AllTPAs' />
						<NavButton content='EQA' link='/pilotEQA' />
						<NavButton content='HDV' link='/flightHours' />
						<NavButton content='Recherche' link='/flightSearch' />
						<NavButton content='C/R Mensuel' link='/QOG' />
						<NavButton content='C/R Hebdo' link='/crHebdo' />
						<NavButton content='GERER LA DB' link='/manageDB' />
					</div>
				</div>
			</div>
		</nav>
	)
}
