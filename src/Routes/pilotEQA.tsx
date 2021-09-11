import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { PilotEQAMiniCArd } from "../Articles/pilotEQAMiniCard"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { NavBarTPAEQA } from "../Sections/NavBarTPAEQA"
import { buildAllEQAs } from "../tools/buildsPilotsActions"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"

export const PilotEQA = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [dateTocompare, setDateToCompare] = useState(new Date().getMonth())
	const [pilotEQAs, setPilotEQAs] = useState<Array<any>>([])
	const nextMonthClick = () => setDateToCompare(new Date().getMonth() + 1)
	const previousMonthClick = () => setDateToCompare(new Date().getMonth())
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const endDate = new Date(Date.now())
			const lastFourYears = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const lastFourYearsFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: lastFourYears,
				endDate: endDate,
			})
			const allMembers = await getFetchRequest(DB_URL + "crewMembers")
			const EQAs = buildAllEQAs(allMembers, lastFourYearsFlights, dateTocompare)
			setPilotEQAs(EQAs)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div>
			<Header />
			<Navbar />
			<NavBarTPAEQA date={dateTocompare} next={nextMonthClick} prev={previousMonthClick} />
			<div className='row'>
				{pilotEQAs.map((pilot) => (
					<div key={pilotEQAs.indexOf(pilot)} className='col-md-3 mt-2'>
						<PilotEQAMiniCArd pilot={pilot} date={dateTocompare} />
					</div>
				))}
			</div>
		</div>
	)
}
