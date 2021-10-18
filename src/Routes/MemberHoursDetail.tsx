/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { FlightTable } from "../Sections/FlightTable"
import { MainNavBar } from "../Sections/MainNavbar"
import { crewMembersFlights } from "../tools/buildFlightHours"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { CrewMember, Flight } from "../types/Objects"

export const MemberHoursDetail = ({
	match,
}: RouteComponentProps<{ name: string; startDate: string; endDate: string }>): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [crewMembersHours, setCrewMembersHours] = useState<Flight[]>([])
	const [member, setMember] = useState<CrewMember>()
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const allMembers = await getFetchRequest<CrewMember[]>(memberURL)
			const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate: new Date(match.params.startDate),
				endDate: new Date(match.params.endDate),
			})
			setMember(allMembers.find(({ trigram }) => trigram === match.params.name))
			const crewMembersHours = crewMembersFlights(
				allMembers,
				allDebriefedFlights
					.filter(({ done }) => done !== "CNL")
					.sort((f1, f2) => new Date(f1.departureDate).getTime() - new Date(f2.departureDate).getTime())
			).find(({ name }) => name === match.params.name)?.flight
			if (crewMembersHours) setCrewMembersHours(crewMembersHours)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<h4 className='text-center my-3'>{`Heures du ${member?.rank} ${member?.firstName} ${member?.surName}`}</h4>
			<FlightTable flights={crewMembersHours!} />
			<div className='row justify-content-center'>
				<Button
					size={3}
					buttonColor='danger'
					buttonContent='Retour'
					onClick={() => history.push("/flightHours")}
				/>
			</div>
		</div>
	)
}
