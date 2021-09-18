import React from "react"
import { useHistory } from "react-router-dom"
import { OutlinedButton } from "../BasicComponents/OutlinedButton"
import plane from "../images/whiteAircraft.png"

export const Header = (): JSX.Element => {
	const history = useHistory()
	const disconnect = () => history.push("/")
	return (
		<div className='pt-2 px-2 bg-dark text-white row'>
			<div className='col-md-4 text-start'>
				<img src={plane} className='d-inline mx-1 align-bottom' />
			</div>
			<div className='col-md-4 text-center align-bottom'>
				<h4 className='d-inline mx-3 align-bottom'>Activités DET 25F</h4>
			</div>
			<div className='row col-md-2 d-inline text-center align-bottom'>
				<h4 className='d-inline'>PM PIEDNOEL Grégory</h4>
			</div>
			<div className='row col-md-2 d-inline text-center align-bottom'>
				<OutlinedButton size={12} buttonColor='warning' buttonContent='Déconnexion' onClick={disconnect} />
			</div>
		</div>
	)
}
