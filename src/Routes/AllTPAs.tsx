/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DenaeMiniCard } from "../Articles/DenaeMiniCard"
import { MecboMiniCard } from "../Articles/MecboMiniCard"
import { PilotMiniCard } from "../Articles/PilotMiniCard"
import { RadioMiniCard } from "../Articles/RadioMiniCard"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { DebriefedflightDateFinderURL, memberURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { NavBarTPAEQA } from "../Sections/NavBarTPAEQA"
import { buildAllTPAs } from "../tools/buildMemberActions"
import { getEndOfMonth, getEndOfNextMonth, getEndOfPreviousMonth } from "../tools/dateManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"
import { CrewMember, DenaeDateTPA, Flight, MecboDateTPA, PilotDateTPA, RadioDateTPA } from "../types/Objects"

export const AllTPAs = (): JSX.Element => {
	const endOfMonth = getEndOfMonth()
	const [token, setToken] = useState(true)
	const [dateTocompare, setDateToCompare] = useState(endOfMonth)
	const [pilotTPA, setPilotTPA] = useState<{ name: string; TPA: PilotDateTPA }[]>([])
	const [mecboTPA, setMecboTPA] = useState<{ name: string; TPA: MecboDateTPA }[]>([])
	const [radioTPA, setRadioTPA] = useState<{ name: string; TPA: RadioDateTPA }[]>([])
	const [denaeTPA, setDenaeTPA] = useState<{ name: string; TPA: DenaeDateTPA }[]>([])
	const [cdt, setCdt] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [second, setSecond] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [ops, setOps] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [csve, setCsve] = useState<CrewMember>(INITIAL_CREWMEMBER)

	const nextMonthClick = () => setDateToCompare(getEndOfNextMonth(dateTocompare))
	const previousMonthClick = () => setDateToCompare(getEndOfPreviousMonth(dateTocompare))

	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const endDate = new Date(dateTocompare.getFullYear(), dateTocompare.getMonth(), dateTocompare.getDate() + 1)
			const startDate = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const allDebriefedFlights = await postFetchRequest<Flight[]>(DebriefedflightDateFinderURL, {
				startDate,
				endDate,
			})
			const allMembers = await getFetchRequest<CrewMember[]>(memberURL)
			if (typeof allMembers !== "string") {
				setCdt(allMembers.find(({ groundFunction }) => groundFunction === "Commandant")!)
				setSecond(allMembers.find(({ groundFunction }) => groundFunction === "Commandant en second")!)
				setOps(allMembers.find(({ groundFunction }) => groundFunction === "CSO")!)
				setCsve(allMembers.find(({ groundFunction }) => groundFunction === "CSVE")!)
			}
			if (typeof allMembers !== "string" && typeof allDebriefedFlights !== "string") {
				const TPAs = buildAllTPAs(allMembers, allDebriefedFlights)
				setPilotTPA(TPAs.pilotTPA)
				setMecboTPA(TPAs.mecboTPA)
				setRadioTPA(TPAs.radioTPA)
				setDenaeTPA(TPAs.denaeTPA)
			}
		}
	}, [dateTocompare])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya' style={{ width: "100%" }}>
			<MainNavBar />
			<NavBarTPAEQA date={dateTocompare} next={nextMonthClick} prev={previousMonthClick} />
			<div className='row mt-2 m-0'>
				{pilotTPA.length > 0 && (
					<>
						<div className='col-lg-4 col-xl-3'>
							<PilotMiniCard
								pilot={pilotTPA.find((pilot) => pilot.name === cdt.trigram)!}
								date={dateTocompare}
							/>
						</div>
						<div className='col-lg-4 col-xl-3'>
							<PilotMiniCard
								pilot={pilotTPA.find((pilot) => pilot.name === second.trigram)!}
								date={dateTocompare}
							/>
						</div>
						<div className='col-lg-4 col-xl-3'>
							<PilotMiniCard
								pilot={pilotTPA.find((pilot) => pilot.name === ops.trigram)!}
								date={dateTocompare}
							/>
						</div>
						<div className='col-lg-4 col-xl-3'>
							<PilotMiniCard
								pilot={pilotTPA.find((pilot) => pilot.name === csve.trigram)!}
								date={dateTocompare}
							/>
						</div>{" "}
					</>
				)}
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
