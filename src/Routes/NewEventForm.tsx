import React, { useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { eventDelete, eventIDFinder, saveEventURL } from "../Datas/urls"
import { INITIAL_FALSE_CONTROL, INITIAL_FALSE_SELECT } from "../Datas/initialObjects"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { EventFieldset } from "../Sections/EventFieldset"
import { MainNavBar } from "../Sections/MainNavbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { postFetchRequest } from "../tools/fetch"
import { fullfillEvent } from "../tools/fullfillForms"
import { buildNewEvent } from "../tools/buildEvents"
import { tokenCheck } from "../tools/user"
import { formValidity } from "../tools/validators"
import { Event } from "../types/Objects"

export const NewEventForm = ({ match }: RouteComponentProps<{ id: string; week: string }>): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [event, setEvent] = useState(INITIAL_FALSE_CONTROL)
	const [eventType, setEventType] = useState(INITIAL_FALSE_SELECT)
	const hooks = [departureDate, departureTime, arrivalDate, arrivalTime, event, eventType]
	const setters = [setDepartureDate, setDepartureTime, setArrivalDate, setArrivalTime, setEvent, setEventType]
	async function addEventClick() {
		const newEvent = buildNewEvent(hooks)
		const saved = await postFetchRequest<string>(saveEventURL, { newEvent })
		if (saved === "success") history.push(`/activities/newEvent/${match.params.week}`)
	}
	async function modifyEventClick() {
		const newEvent = buildNewEvent(hooks)
		const deleted = await postFetchRequest<string>(eventDelete, { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest<string>(saveEventURL, { newEvent })
			if (res === "success") history.push(`/activities/modifyEvent/${match.params.week}`)
		}
	}
	async function deleteClick() {
		const deleted = await postFetchRequest<string>(eventDelete, { id: match.params.id })
		if (deleted === "success") history.push(`/activities/deleteEvent/${match.params.week}`)
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (match.params.id !== "newOne") {
			const event = await postFetchRequest<Event[]>(eventIDFinder, { id: match.params.id })
			if (typeof event !== "string") fullfillEvent(event[0], setters)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<NewEventNavBar date={parseInt(match.params.week)} />
			<form className='bg-white m-1 rounded text-dark row justify-content-center'>
				<Legend title='Nouvel évènement' />
				<div className='col-md-6 m-1 justify-content-center'>
					<TimingFieldset
						startDate={departureDate}
						setStartDate={setDepartureDate}
						startTime={departureTime}
						setStartTime={setDepartureTime}
						endDate={arrivalDate}
						setEndDate={setArrivalDate}
						endTime={arrivalTime}
						setEndTime={setArrivalTime}
					/>
				</div>
				<div className='col-md-6 m-1 justify-content-center'>
					<EventFieldset
						event={event}
						setEvent={setEvent}
						eventType={eventType}
						setEventType={setEventType}
					/>
				</div>
			</form>
			<AddOrReturnButtons
				validity={formValidity(hooks)}
				addContent={match.params.id !== "newOne" ? "Modifier" : "Ajouter"}
				addClick={match.params.id !== "newOne" ? modifyEventClick : addEventClick}
				deleteClick={deleteClick}
				disableDelete={match.params.id === "newOne"}
				returnClick={() => history.push(`/activities/null/${match.params.week}`)}
			/>
		</div>
	)
}
