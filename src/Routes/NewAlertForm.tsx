import React from "react"
import { useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { alertDeleteURL, alertIDFinderURL, saveAlertURL } from "../Datas/urls"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialObjects"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { AlertFieldset } from "../Sections/AlertFieldset"
import { postFetchRequest } from "../tools/fetch"
import { fullfillAlert } from "../tools/fullfillForms"
import { buildNewAlert } from "../tools/buildEvents"
import { tokenCheck } from "../tools/user"
import { AtLeastOne, formValidity } from "../tools/validators"
import { Alert } from "../types/Objects"
import { MainNavBar } from "../Sections/MainNavbar"
import { getDateNumber, getMonthNumber } from "../tools/dateManager"

export const NewAlertForm = ({
	match,
}: RouteComponentProps<{ id: string; date: string; week: string }>): JSX.Element => {
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
	async function addEventClick() {
		const newAlert = buildNewAlert(hooks)
		const saved = await postFetchRequest(saveAlertURL, { newAlert })
		if (saved === "success") {
			sessionStorage.setItem("activitiesAlert", "newAlert")
			history.push(`/activities/${match.params.week}`)
		}
	}
	async function modifyAlertClick() {
		const newAlert = buildNewAlert(hooks)
		const deleted = await postFetchRequest<string>(alertDeleteURL, { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest<string>(saveAlertURL, { newAlert })
			if (res === "success") {
				sessionStorage.setItem("activitiesAlert", "modifyAlert")
				history.push(`/activities/${match.params.week}`)
			}
		}
	}
	async function deleteClick() {
		const deleted = await postFetchRequest<string>(alertDeleteURL, { id: match.params.id })
		if (deleted === "success") {
			sessionStorage.setItem("activitiesAlert", "deleteAlert")
			history.push(`/activities/${match.params.week}`)
		}
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (match.params.id !== "newOne") {
			const alert = await postFetchRequest<Alert[]>(alertIDFinderURL, { id: match.params.id })
			fullfillAlert(alert[0], setters)
		}
		if (match.params.date !== "modify") {
			setDepartureDate({
				value:
					new Date(parseInt(match.params.date)).getFullYear() +
					"-" +
					getMonthNumber(new Date(parseInt(match.params.date)).getMonth()) +
					"-" +
					getDateNumber(new Date(parseInt(match.params.date)).getDate()),
				validity: true,
				disabled: false,
			})
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
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
				<div className='row justify-content-center text-danger'>
					{formValidity([departureDate])
						? AtLeastOne([chief, pilot, mecbo, nav, radio, rdr, tech])
							? ""
							: "Vous devez au moins rentré un membre"
						: "La date doit être valide"}
				</div>
			</form>
			<AddOrReturnButtons
				validity={formValidity([departureDate]) && AtLeastOne([chief, pilot, mecbo, nav, radio, rdr, tech])}
				addContent={match.params.id !== "newOne" ? "Modifier" : "Ajouter"}
				addClick={match.params.id !== "newOne" ? modifyAlertClick : addEventClick}
				deleteClick={deleteClick}
				disableDelete={match.params.id === "newOne"}
				returnClick={() => history.push(`/activities/${match.params.week}`)}
			/>
		</div>
	)
}
