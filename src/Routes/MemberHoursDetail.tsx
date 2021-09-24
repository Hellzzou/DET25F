/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { Redirect, RouteComponentProps } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { FlightTable } from "../Sections/FlightTable"
import { MainNavBar } from "../Sections/MainNavbar"
import { crewMembersFlights } from "../tools/buildFlightHours"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { crewMember, flight } from "../types/Objects"

export const MemberHoursDetail = ({
	match,
}: RouteComponentProps<{ name: string; startDate: string; endDate: string }>): JSX.Element => {
	const [token, setToken] = useState(true)
	const [crewMembersHours, setCrewMembersHours] = useState<flight[]>([])
	const [member, setMember] = useState<crewMember>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const allMembers = await getFetchRequest<crewMember[]>(memberURL)
			const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
				startDate: new Date(match.params.startDate),
				endDate: new Date(match.params.endDate),
			})
			if (typeof allMembers !== "string" && typeof allDebriefedFlights !== "string") {
				setMember(allMembers.find(({ trigram }) => trigram === match.params.name))
				const crewMembersHours = crewMembersFlights(allMembers, allDebriefedFlights).find(
					({ name }) => name === match.params.name
				)?.flight
				if (typeof crewMembersHours !== "undefined") setCrewMembersHours(crewMembersHours)
			}
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<h4 className='text-center my-3'>{`Heures du ${member?.rank} ${member?.firstName} ${member?.surName}`}</h4>
			<FlightTable flights={crewMembersHours!} />
		</div>
	)
}
