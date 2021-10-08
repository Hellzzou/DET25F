/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { CrewMemberCard } from "../Articles/CrewMemberCard"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { DebriefedflightDateFinderURL, memberURL, onBoardFunctionURL } from "../Datas/urls"
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
	const [cdt, setCdt] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [second, setSecond] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [ops, setOps] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [csve, setCsve] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [pilots, setPilots] = useState<string[]>([])
	const [mecbos, setMecbos] = useState<string[]>([])
	const [radios, setRadios] = useState<string[]>([])
	const [denaes, setDenaes] = useState<string[]>([])
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const allMembers = await getFetchRequest<CrewMember[]>(memberURL)
			const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate: new Date(startDate.value),
				endDate: new Date(endDate.value),
			})
			const cdas = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, { function: "CDA" })
			if (typeof cdas !== "string") setPilots([...pilots, ...cdas.map(({ trigram }) => trigram)])
			const allPilots = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, { function: "pilote" })
			if (typeof allPilots !== "string") setPilots([...pilots, ...allPilots.map(({ trigram }) => trigram)])
			const mecbos = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, { function: "MECBO" })
			if (typeof mecbos !== "string") setMecbos(mecbos.map(({ trigram }) => trigram))
			const radios = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, { function: "GETBO" })
			if (typeof radios !== "string") setRadios(radios.map(({ trigram }) => trigram))
			const denaes = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, { function: "DENAE" })
			if (typeof denaes !== "string") setDenaes(denaes.map(({ trigram }) => trigram))
			if (typeof allMembers !== "string") {
				setCdt(allMembers.find(({ groundFunction }) => groundFunction === "Commandant")!)
				setSecond(allMembers.find(({ groundFunction }) => groundFunction === "Commandant en second")!)
				setOps(allMembers.find(({ groundFunction }) => groundFunction === "CSO")!)
				setCsve(allMembers.find(({ groundFunction }) => groundFunction === "CSVE")!)
			}
			if (typeof allMembers !== "string" && typeof allDebriefedFlights !== "string") {
				const crewMembersHours = crewMembersFlights(
					allMembers.filter(({ onBoardFunction }) => onBoardFunction !== "TECH"),
					allDebriefedFlights.filter(({ done }) => done !== "CNL")
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
			<div className='row'>
				{crewMembersHours && (
					<>
						<div className='col-md-3 my-2'>
							<CrewMemberCard
								crewMemberName={crewMembersHours.find(({ name }) => name === cdt.trigram)!.name}
								crewMemberHours={crewMembersHours.find(({ name }) => name === cdt.trigram)!.flight}
								startDate={startDate.value}
								endDate={endDate.value}
							/>
						</div>
						<div className='col-md-3 my-2'>
							<CrewMemberCard
								crewMemberName={crewMembersHours.find(({ name }) => name === second.trigram)!.name}
								crewMemberHours={crewMembersHours.find(({ name }) => name === second.trigram)!.flight}
								startDate={startDate.value}
								endDate={endDate.value}
							/>
						</div>
						<div className='col-md-3 my-2'>
							<CrewMemberCard
								crewMemberName={crewMembersHours.find(({ name }) => name === ops.trigram)!.name}
								crewMemberHours={crewMembersHours.find(({ name }) => name === ops.trigram)!.flight}
								startDate={startDate.value}
								endDate={endDate.value}
							/>
						</div>
						<div className='col-md-3 my-2'>
							<CrewMemberCard
								crewMemberName={crewMembersHours.find(({ name }) => name === csve.trigram)!.name}
								crewMemberHours={crewMembersHours.find(({ name }) => name === csve.trigram)!.flight}
								startDate={startDate.value}
								endDate={endDate.value}
							/>
						</div>
						{crewMembersHours
							.filter(({ name }) => mecbos.includes(name))
							.map((crewMember) => (
								<div className='col-md-3 my-2' key={crewMembersHours.indexOf(crewMember)}>
									<CrewMemberCard
										crewMemberName={crewMember.name}
										crewMemberHours={crewMember.flight}
										startDate={startDate.value}
										endDate={endDate.value}
									/>
								</div>
							))}
						{crewMembersHours
							.filter(({ name }) => radios.includes(name))
							.map((crewMember) => (
								<div className='col-md-3 my-2' key={crewMembersHours.indexOf(crewMember)}>
									<CrewMemberCard
										crewMemberName={crewMember.name}
										crewMemberHours={crewMember.flight}
										startDate={startDate.value}
										endDate={endDate.value}
									/>
								</div>
							))}
						{crewMembersHours
							.filter(({ name }) => denaes.includes(name))
							.map((crewMember) => (
								<div className='col-md-3 my-2' key={crewMembersHours.indexOf(crewMember)}>
									<CrewMemberCard
										crewMemberName={crewMember.name}
										crewMemberHours={crewMember.flight}
										startDate={startDate.value}
										endDate={endDate.value}
									/>
								</div>
							))}
					</>
				)}
			</div>
		</div>
	)
}
