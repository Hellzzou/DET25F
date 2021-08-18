import React, { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { EventFieldset } from "../Sections/EventFieldset"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { saveNewEvent } from "../tools/saveToDatabase"
import { tokenCheck } from "../tools/user"
import { formValidity } from "../tools/validators"

export const NewEventForm = (): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [event, setEvent] = useState(INITIAL_FALSE_CONTROL)
	const hooks = [departureDate, departureTime, arrivalDate, arrivalTime, event]
	const returnClick = () => history.push("/activities")
	async function addEventClick() {
		const newEvent = await saveNewEvent(hooks)
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
			<form className='bg-white m-1 rounded text-dark row justify-content-center'>
				<Legend title='Nouveau évènement' />
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
					<EventFieldset event={event} setEvent={setEvent} />
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
