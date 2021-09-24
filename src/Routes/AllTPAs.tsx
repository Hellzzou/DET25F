import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DenaeMiniCard } from "../Articles/DenaeMiniCard"
import { MecboMiniCard } from "../Articles/MecboMiniCard"
import { PilotMiniCard } from "../Articles/PilotMiniCard"
import { RadioMiniCard } from "../Articles/RadioMiniCard"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { NavBarTPAEQA } from "../Sections/NavBarTPAEQA"
import { buildAllTPAs } from "../tools/buildMemberActions"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { crewMember, denaeDateTPA, flight, mecboDateTPA, pilotDateTPA, radioDateTPA } from "../types/Objects"

export const AllTPAs = (): JSX.Element => {
	const [token, setToken] = useState(true)
	const [dateTocompare, setDateToCompare] = useState(new Date().getMonth())
	const [pilotTPA, setPilotTPA] = useState<{ name: string; TPA: pilotDateTPA }[]>([])
	const [mecboTPA, setMecboTPA] = useState<{ name: string; TPA: mecboDateTPA }[]>([])
	const [radioTPA, setRadioTPA] = useState<{ name: string; TPA: radioDateTPA }[]>([])
	const [denaeTPA, setDenaeTPA] = useState<{ name: string; TPA: denaeDateTPA }[]>([])

	const nextMonthClick = () => setDateToCompare(new Date().getMonth() + 1)
	const previousMonthClick = () => setDateToCompare(new Date().getMonth())

	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
			const startDate = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const allDebriefedFlights = await postFetchRequest<flight[]>(DebriefedflightDateFinderURL, {
				startDate,
				endDate,
			})
			const allMembers = await getFetchRequest<crewMember[]>(memberURL)
			if (typeof allMembers !== "string" && typeof allDebriefedFlights !== "string") {
				const TPAs = buildAllTPAs(allMembers, allDebriefedFlights)
				setPilotTPA(TPAs.pilotTPA)
				setMecboTPA(TPAs.mecboTPA)
				setRadioTPA(TPAs.radioTPA)
				setDenaeTPA(TPAs.denaeTPA)
			}
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya' style={{ width: "100%" }}>
			<MainNavBar />
			<NavBarTPAEQA date={dateTocompare} next={nextMonthClick} prev={previousMonthClick} />
			<div className='row mt-2 m-0'>
				{pilotTPA.map((pilot) => (
					<div key={pilotTPA.indexOf(pilot)} className='col-lg-4 col-xl-3'>
						<PilotMiniCard pilot={pilot} date={dateTocompare} />
					</div>
				))}
			</div>
			<div className='row mt-2 m-0'>
				{mecboTPA.map((mecbo) => (
					<div key={mecboTPA.indexOf(mecbo)} className='col-lg-4 col-xl-3'>
						<MecboMiniCard mecbo={mecbo} date={dateTocompare} />
					</div>
				))}
				{radioTPA.map((radio) => (
					<div key={radioTPA.indexOf(radio)} className='col-lg-4 col-xl-3'>
						<RadioMiniCard radio={radio} date={dateTocompare} />
					</div>
				))}
			</div>
			<div className='row mt-2 m-0'>
				{denaeTPA.map((denae) => (
					<div key={denaeTPA.indexOf(denae)} className='col-lg-4 col-xl-3'>
						<DenaeMiniCard denae={denae} date={dateTocompare} />
					</div>
				))}
			</div>
		</div>
	)
}
