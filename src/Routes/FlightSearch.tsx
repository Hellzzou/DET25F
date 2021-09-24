import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { CDAURL, DB_URL } from "../Datas/urls"
import { INITIAL_FALSE_SELECT } from "../Datas/initialObjects"
import { FlightFilters } from "../Sections/FlightFilters"
import { FlightTable } from "../Sections/FlightTable"
import { MainNavBar } from "../Sections/MainNavbar"
import { INITIAL_ENDDATE_CONTROL, INITIAL_STARTDATE_CONTROL } from "../tools/dateManager"
import { postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { CrewMember, Flight } from "../types/Objects"

export const FlightSearch = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEnDate] = useState(INITIAL_ENDDATE_CONTROL)
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_SELECT)
	const [crew, setCrew] = useState(INITIAL_FALSE_SELECT)
	const [type, setType] = useState(INITIAL_FALSE_SELECT)
	const [group, setGroup] = useState(INITIAL_FALSE_SELECT)
	const [belonging, setBelonging] = useState(INITIAL_FALSE_SELECT)
	const [area, setArea] = useState(INITIAL_FALSE_SELECT)
	const [NCArea, setNCArea] = useState(INITIAL_FALSE_SELECT)
	const [done, setDone] = useState(INITIAL_FALSE_SELECT)
	const [time, setTime] = useState(INITIAL_FALSE_SELECT)
	const [flights, setFlights] = useState<Array<Flight>>([])
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			let CDAName = "Choix..."
			if (crew.value !== "Choix...") {
				const CDA = await postFetchRequest<CrewMember[]>(CDAURL, { crew: crew.value })
				if (typeof CDA !== "string") CDAName = CDA[0].trigram
			}
			const filteredFlights = await postFetchRequest<Flight[]>(DB_URL + "flights/filteredFlights", {
				date: { startDate: new Date(startDate.value), endDate: new Date(endDate.value) },
				aircraft: aircraft.value,
				chief: CDAName,
				type: type.value,
				group: group.value,
				belonging: belonging.value,
				area: area.value,
				NCArea: NCArea.value,
				done: done.value,
				time: time.value,
			})
			if (typeof filteredFlights !== "string")
				setFlights(filteredFlights.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))
		}
	}, [
		startDate.value,
		endDate.value,
		aircraft.value,
		crew.value,
		type.value,
		group.value,
		belonging.value,
		area.value,
		NCArea.value,
		done.value,
		time.value,
	])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<FlightFilters
				aircraft={aircraft}
				setAircraft={setAircraft}
				crew={crew}
				setCrew={setCrew}
				type={type}
				setType={setType}
				group={group}
				setGroup={setGroup}
				belonging={belonging}
				setBelonging={setBelonging}
				area={area}
				setArea={setArea}
				NCArea={NCArea}
				setNCArea={setNCArea}
				done={done}
				setDone={setDone}
				time={time}
				setTime={setTime}
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEnDate}
			/>
			<FlightTable flights={flights} />
		</div>
	)
}
