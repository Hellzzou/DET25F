import React from "react"
import { NavButton } from "../BasicComponents/NavButton"

export const Navbar = (): JSX.Element => {
	return (
		<div className='m-1 bg-dark rounded'>
			<NavButton content='Planchette' link='/activities' />
			<NavButton content='TPA' link='/AllTPAs' />
			<NavButton content='EQA' link='/pilotEQA' />
		</div>
	)
}
