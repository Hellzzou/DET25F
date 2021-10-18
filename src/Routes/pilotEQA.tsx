/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { PilotEQAMiniCArd } from "../Articles/pilotEQAMiniCard"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { NavBarTPAEQA } from "../Sections/NavBarTPAEQA"
import { buildAllEQAs } from "../tools/buildsPilotsActions"
import { getEndOfMonth, getEndOfNextMonth, getEndOfPreviousMonth } from "../tools/dateManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { AllEQAs, CrewMember, Flight } from "../types/Objects"

export const PilotEQA = (): JSX.Element => {
	const endOfMonth = getEndOfMonth()
	const [token, setToken] = useState(true)
	const [dateTocompare, setDateToCompare] = useState(endOfMonth)
	const [pilotEQAs, setPilotEQAs] = useState<AllEQAs>([])
	const [cdt, setCdt] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [second, setSecond] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [ops, setOps] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [csve, setCsve] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const nextMonthClick = () => {
		console.log(dateTocompare)
		setDateToCompare(getEndOfNextMonth(dateTocompare))
	}
	const previousMonthClick = () => setDateToCompare(getEndOfPreviousMonth(dateTocompare))
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const endDate = new Date(dateTocompare.getFullYear(), dateTocompare.getMonth(), dateTocompare.getDate() + 1)
			const lastFourYears = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const lastFourYearsFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate: lastFourYears,
				endDate,
			})
			const allMembers = await getFetchRequest<CrewMember[]>(memberURL)
			const EQAs = buildAllEQAs(allMembers, lastFourYearsFlights, dateTocompare)
			setCdt(allMembers.find(({ groundFunction }) => groundFunction === "Commandant")!)
			setSecond(allMembers.find(({ groundFunction }) => groundFunction === "Commandant en second")!)
			setOps(allMembers.find(({ groundFunction }) => groundFunction === "CSO")!)
			setCsve(allMembers.find(({ groundFunction }) => groundFunction === "CSVE")!)
			setPilotEQAs(EQAs)
		}
	}, [dateTocompare])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<NavBarTPAEQA date={dateTocompare} next={nextMonthClick} prev={previousMonthClick} />
			<div className='row'>
				{pilotEQAs.length > 0 && (
					<>
						<div className='col-md-3 mt-2 m-0'>
							<PilotEQAMiniCArd
								pilot={pilotEQAs.find((pilot) => pilot.name === cdt.trigram)!}
								date={dateTocompare}
							/>
						</div>
						<div className='col-md-3 mt-2 m-0'>
							<PilotEQAMiniCArd
								pilot={pilotEQAs.find((pilot) => pilot.name === second.trigram)!}
								date={dateTocompare}
							/>
						</div>
						<div className='col-md-3 mt-2 m-0'>
							<PilotEQAMiniCArd
								pilot={pilotEQAs.find((pilot) => pilot.name === ops.trigram)!}
								date={dateTocompare}
							/>
						</div>
						<div className='col-md-3 mt-2 m-0'>
							<PilotEQAMiniCArd
								pilot={pilotEQAs.find((pilot) => pilot.name === csve.trigram)!}
								date={dateTocompare}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
