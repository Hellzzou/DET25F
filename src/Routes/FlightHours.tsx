/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { CrewMembersCards } from "../Sections/CrewMembersCards"
import { DateChoiceNavbar } from "../Sections/DateChoiceNavbar"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { crewMembersFlights } from "../tools/buildFlightHours"
import { INITIAL_ENDDATE_CONTROL, INITIAL_STARTDATE_CONTROL } from "../tools/date"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { flight } from "../types/Objects"

export const FlightHours = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEnDate] = useState(INITIAL_ENDDATE_CONTROL)
	const [crewMembersHours, setCrewMembersHours] = useState<{ name: string; flight: flight[] }[]>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const allMembers = await getFetchRequest(DB_URL + "crewMembers")
			const allDebriefedFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: new Date(startDate.value),
				endDate: new Date(endDate.value),
			})
			const crewMembersHours = crewMembersFlights(allMembers, allDebriefedFlights)
			setCrewMembersHours(crewMembersHours)
		}
	}, [startDate.value, endDate.value])
	return !token ? (
		<Redirect to='/' />
	) : (
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
