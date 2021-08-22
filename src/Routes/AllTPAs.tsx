import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DenaeMiniCard } from "../Articles/DenaeMiniCard"
import { MecboMiniCard } from "../Articles/MecboMiniCard"
import { PilotMiniCard } from "../Articles/PilotMiniCard"
import { RadioMiniCard } from "../Articles/RadioMiniCard"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { NavBarTPAEQA } from "../Sections/NavBarTPAEQA"
import { buildAllTPAs } from "../tools/buildAllTPAs"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"

export const AllTPAs = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [dateTocompare, setDateToCompare] = useState(new Date().getMonth())
	const [pilotTPA, setPilotTPA] = useState([])
	const [mecboTPA, setMecboTPA] = useState([])
	const [radioTPA, setRadioTPA] = useState([])
	const [denaeTPA, setDenaeTPA] = useState([])
	const nextMonthClick = () => setDateToCompare(new Date().getMonth() + 1)
	const previousMonthClick = () => setDateToCompare(new Date().getMonth())
	useAsyncEffect(async () => {
		const endDate = new Date(Date.now())
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const startDate = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const allDebriefedFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: startDate,
				endDate: endDate,
			})
			const allMembers = await getFetchRequest(DB_URL + "crewMembers")
			const TPAs = buildAllTPAs(allMembers, allDebriefedFlights)
			setPilotTPA(TPAs.pilotTPA)
			setMecboTPA(TPAs.mecboTPA)
			setRadioTPA(TPAs.radioTPA)
			setDenaeTPA(TPAs.denaeTPA)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div style={{ width: "100%" }}>
			<Header />
			<Navbar />
			<NavBarTPAEQA date={dateTocompare} next={nextMonthClick} prev={previousMonthClick} />
			<div>
				<div className='row mt-2'>
					{pilotTPA.map((pilot) => (
						<div key={pilotTPA.indexOf(pilot)} className='col-md-3'>
							<PilotMiniCard pilot={pilot} date={dateTocompare} />
						</div>
					))}
				</div>
				<div className='row mt-2'>
					{mecboTPA.map((mecbo) => (
						<div key={mecboTPA.indexOf(mecbo)} className='col-md-3'>
							<MecboMiniCard mecbo={mecbo} date={dateTocompare} />
						</div>
					))}
					{radioTPA.map((radio) => (
						<div key={radioTPA.indexOf(radio)} className='col-md-3'>
							<RadioMiniCard radio={radio} date={dateTocompare} />
						</div>
					))}
				</div>
				<div className='row mt-2'>
					{denaeTPA.map((denae) => (
						<div key={denaeTPA.indexOf(denae)} className='col-md-3'>
							<DenaeMiniCard denae={denae} date={dateTocompare} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
