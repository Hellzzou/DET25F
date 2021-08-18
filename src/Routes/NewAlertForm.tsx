import React from "react"
import { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { AlertFieldset } from "../Sections/AlertFieldset"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { saveNewAlert } from "../tools/saveToDatabase"
import { tokenCheck } from "../tools/user"
import { formValidity } from "../tools/validators"

export const NewAlertForm = (): JSX.Element => {
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [chief, setChief] = useState(INITIAL_FALSE_CONTROL)
	const [pilot, setPilot] = useState(INITIAL_FALSE_CONTROL)
	const [mecbo, setMecbo] = useState(INITIAL_FALSE_CONTROL)
	const [nav, setNav] = useState(INITIAL_FALSE_CONTROL)
	const [rdr, setRdr] = useState(INITIAL_FALSE_CONTROL)
	const [radio, setRadio] = useState(INITIAL_FALSE_CONTROL)
	const hooks = [departureDate, chief, pilot, mecbo, nav, rdr, radio]
	const history = useHistory()
	const [token, setToken] = useState(true)
	const returnClick = () => history.push("/activities")
	async function addEventClick() {
		const newEvent = await saveNewAlert(hooks)
		if (newEvent === "success") history.push("/activities")
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
	})
	return !token ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<NewEventNavBar />
			<form className='bg-white m-1 rounded text-dark row'>
				<Legend title='Nouveau alerte' />
				<div className='row m-1 justify-content-center'>
					<AlertFieldset
						departureDate={departureDate}
						setDepartureDate={setDepartureDate}
						chief={chief}
						setChief={setChief}
						pilot={pilot}
						setPilot={setPilot}
						mecbo={mecbo}
						setMecbo={setMecbo}
						nav={nav}
						setNav={setNav}
						rdr={rdr}
						setRdr={setRdr}
						radio={radio}
						setRadio={setRadio}
					/>
				</div>
			</form>
			<AddOrReturnButtons
				validity={formValidity(hooks)}
				addContent='Ajouter'
				addClick={addEventClick}
				returnClick={returnClick}
			/>
		</>
	)
}
