import React from "react"
import { NavButton } from "../BasicComponents/NavButton"

export const Navbar = (): JSX.Element => {
	return (
		<div className='m-1 bg-dark rounded'>
			<NavButton content='Planchette' link='/activities' />
			<NavButton content='TPA' link='/AllTPAs' />
			<NavButton content='EQA' link='/pilotEQA' />
			<NavButton content='HDV' link='/flightHours' />
			<NavButton content='Recherche' link='/flightSearch' />
			<NavButton content='C/R Mensuel' link='/QOG' />
			<NavButton content='C/R Hebdo' link='/crHebdo' />
		</div>
	)
}
