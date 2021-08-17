import React from "react"
import { useHistory } from "react-router-dom"
import { OutlinedButton } from "../BasicComponents/OutlinedButton"
import plane from "../images/whiteAircraft.png"

export const Header = (): JSX.Element => {
	const history = useHistory()
	const disconnect = () => history.push("/")
	return (
		<div className='m-1 p-2 bg-dark text-white row rounded'>
			<div className='col-md-4 text-start'>
				<img src={plane} className='d-inline mx-1 align-bottom' />
				<h4 className='d-inline mx-3 align-bottom'>Activités DET 25F</h4>
			</div>
			<div className='col-md-4 text-center align-bottom'>
				<h4>PM PIEDNOEL Grégory</h4>
			</div>
			<OutlinedButton size={4} buttonColor='warning' buttonContent='Déconnexion' onClick={disconnect} />
		</div>
	)
}
