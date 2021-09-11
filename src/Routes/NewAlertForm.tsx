import React from "react"
import { useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { DB_URL } from "../Datas/datas"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { AlertFieldset } from "../Sections/AlertFieldset"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { postFetchRequest } from "../tools/fetch"
import { fullfillAlert } from "../tools/fullfillForms"
import { buildNewAlert } from "../tools/buildEvents"
import { tokenCheck } from "../tools/user"
import { formValidity } from "../tools/validators"

export const NewAlertForm = ({ match }: RouteComponentProps<{ id: string }>): JSX.Element => {
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [chief, setChief] = useState(INITIAL_FALSE_CONTROL)
	const [pilot, setPilot] = useState(INITIAL_FALSE_CONTROL)
	const [mecbo, setMecbo] = useState(INITIAL_FALSE_CONTROL)
	const [nav, setNav] = useState(INITIAL_FALSE_CONTROL)
	const [rdr, setRdr] = useState(INITIAL_FALSE_CONTROL)
	const [radio, setRadio] = useState(INITIAL_FALSE_CONTROL)
	const [tech, setTech] = useState(INITIAL_FALSE_CONTROL)
	const hooks = [departureDate, chief, pilot, mecbo, nav, rdr, radio, tech]
	const history = useHistory()
	const [token, setToken] = useState(true)
	const setters = [setDepartureDate, setChief, setPilot, setMecbo, setNav, setRdr, setRadio, setTech]
	const returnClick = () => history.push("/activities")
	async function addEventClick() {
		const newAlert = buildNewAlert(hooks)
		const saved = await postFetchRequest(DB_URL + "alerts/save", { newAlert })
		if (saved === "success") history.push("/activities")
	}
	async function modifyAlertClick() {
		const newAlert = buildNewAlert(hooks)
		const deleted = await postFetchRequest(DB_URL + "alerts/deleteOne", { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest(DB_URL + "alerts/save", { newAlert })
			if (res === "success") history.push("/activities")
		}
	}
	async function deleteClick() {
		const deleted = await postFetchRequest(DB_URL + "alerts/deleteOne", { id: match.params.id })
		if (deleted === "success") history.push("/activities")
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (match.params.id !== "newOne") {
			const alert = await postFetchRequest(DB_URL + "alerts/findWithId", { id: match.params.id })
			fullfillAlert(alert[0], setters)
		}
	}, [])
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
						tech={tech}
						setTech={setTech}
					/>
				</div>
			</form>
			<AddOrReturnButtons
				validity={formValidity([departureDate])}
				addContent={match.params.id !== "newOne" ? "Modifier" : "Ajouter"}
				addClick={match.params.id !== "newOne" ? modifyAlertClick : addEventClick}
				deleteClick={deleteClick}
				disableDelete={match.params.id === "newOne"}
				returnClick={returnClick}
			/>
		</>
	)
}
