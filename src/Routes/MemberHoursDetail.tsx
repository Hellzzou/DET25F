import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { FlightTable } from "../Sections/FlightTable"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { crewMembersFlights } from "../tools/buildAllHours"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { returnZeroOrValue } from "../tools/tools"
import { crewMember, flight } from "../types/Objects"

export const MemberHoursDetail = ({
	match,
}: RouteComponentProps<{ name: string; startDate: string; endDate: string }>): JSX.Element => {
	const [crewMembersHours, setCrewMembersHours] = useState<flight[]>()
	const [member, setMember] = useState<crewMember>()
	useAsyncEffect(async () => {
		const allMembers = await getFetchRequest(DB_URL + "crewMembers")
		const allDebriefedFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
			startDate: new Date(match.params.startDate),
			endDate: new Date(match.params.endDate),
		})
		setMember(allMembers.find((member: crewMember) => member.trigram === match.params.name))
		const crewMembersHours = crewMembersFlights(allMembers, allDebriefedFlights)
		setCrewMembersHours(crewMembersHours.find((member) => member.name === match.params.name)?.flight)
	}, [])
	return (
		<>
			<Header />
			<Navbar />
			<h4 className='text-center my-3'>{`Heures du ${member?.rank} ${member?.firstName} ${member?.surName}`}</h4>
			<FlightTable flights={crewMembersHours!} />
		</>
	)
}
