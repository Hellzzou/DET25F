import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { CrewMembersCards } from "../Sections/CrewMembersCards"
import { DateChoiceNavbar } from "../Sections/DateChoiceNavbar"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { crewMembersFlights } from "../tools/buildAllHours"
import { INITIAL_ENDDATE_CONTROL, INITIAL_STARTDATE_CONTROL } from "../tools/date"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { flight } from "../types/Objects"

export const FlightHours = (): JSX.Element => {
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEnDate] = useState(INITIAL_ENDDATE_CONTROL)
	const [crewMembersHours, setCrewMembersHours] = useState<{ name: string; flight: flight[] }[]>()
	useAsyncEffect(async () => {
		const allMembers = await getFetchRequest(DB_URL + "crewMembers")
		const allDebriefedFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
			startDate: new Date(startDate.value),
			endDate: new Date(endDate.value),
		})
		const crewMembersHours = crewMembersFlights(allMembers, allDebriefedFlights)
		setCrewMembersHours(crewMembersHours)
		console.log(crewMembersHours)
	}, [startDate.value, endDate.value])
	return (
		<>
			<Header />
			<Navbar />
			<DateChoiceNavbar
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEnDate}
			/>
			<CrewMembersCards
				crewMembersHours={crewMembersHours!}
				startDate={startDate.value}
				endDate={endDate.value}
			/>
		</>
	)
}
