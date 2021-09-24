import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { PilotEQAMiniCArd } from "../Articles/pilotEQAMiniCard"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { NavBarTPAEQA } from "../Sections/NavBarTPAEQA"
import { buildAllEQAs } from "../tools/buildsPilotsActions"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { AllEQAs, CrewMember, Flight } from "../types/Objects"

export const PilotEQA = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [dateTocompare, setDateToCompare] = useState(new Date().getMonth())
	const [pilotEQAs, setPilotEQAs] = useState<AllEQAs>([])
	const nextMonthClick = () => setDateToCompare(new Date().getMonth() + 1)
	const previousMonthClick = () => setDateToCompare(new Date().getMonth())
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
			const lastFourYears = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const lastFourYearsFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate: lastFourYears,
				endDate,
			})
			const allMembers = await getFetchRequest<CrewMember[]>(memberURL)
			if (typeof allMembers !== "string" && typeof lastFourYearsFlights !== "string") {
				const EQAs = buildAllEQAs(allMembers, lastFourYearsFlights, dateTocompare)
				setPilotEQAs(EQAs)
			}
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<NavBarTPAEQA date={dateTocompare} next={nextMonthClick} prev={previousMonthClick} />
			<div className='row'>
				{pilotEQAs.map((pilot) => (
					<div key={pilotEQAs.indexOf(pilot)} className='col-md-3 mt-2 m-0'>
						<PilotEQAMiniCArd pilot={pilot} date={dateTocompare} />
					</div>
				))}
			</div>
		</div>
	)
}
