/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { CrewMembersCards } from "../Sections/CrewMembersCards"
import { DateChoiceNavbar } from "../Sections/DateChoiceNavbar"
import { MainNavBar } from "../Sections/MainNavbar"
import { crewMembersFlights } from "../tools/buildFlightHours"
import { INITIAL_ENDDATE_CONTROL, INITIAL_STARTDATE_CONTROL } from "../tools/dateManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { CrewMember, Flight } from "../types/Objects"

export const FlightHours = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEnDate] = useState(INITIAL_ENDDATE_CONTROL)
	const [crewMembersHours, setCrewMembersHours] = useState<{ name: string; flight: Flight[] }[]>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const allMembers = await getFetchRequest<CrewMember[]>(memberURL)
			const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate: new Date(startDate.value),
				endDate: new Date(endDate.value),
			})
			if (typeof allMembers !== "string" && typeof allDebriefedFlights !== "string") {
				const crewMembersHours = crewMembersFlights(
					allMembers.filter(({ onBoardFunction }) => onBoardFunction !== "TECH"),
					allDebriefedFlights
				)
				setCrewMembersHours(crewMembersHours)
			}
		}
	}, [startDate.value, endDate.value])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
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
		</div>
	)
}
