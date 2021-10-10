import React, { useState } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { HolidayHistoryDetails } from "../Articles/HolidayHistoryDetails"
import { Button } from "../BasicComponents/Button"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { getCreditTrigramURL, holidayURL, memberWithIDURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { buildPermHistory } from "../tools/buildPermHistory"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { CreditHoliday, CrewMember, Holiday, PermHistory } from "../types/Objects"

export const HolidayHistory = ({ match }: RouteComponentProps<{ id: string; where: string }>): JSX.Element => {
	const history = useHistory()
	const [permHistory, setPermHistory] = useState<PermHistory[]>([])
	const [recupHistory, setRecupHistory] = useState<PermHistory[]>([])
	const [choice, setChoice] = useState("Perm")
	const [member, setMember] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const back = () =>
		match.params.where === "manageDB" ? history.push("/holiday") : history.push("/activities/null/null")
	useAsyncEffect(async () => {
		const member = await postFetchRequest<CrewMember>(memberWithIDURL, { id: match.params.id })
		if (typeof member !== "string") {
			setMember(member)
			const perms = await getFetchRequest<Holiday[]>(holidayURL)
			const credits = await postFetchRequest<CreditHoliday[]>(getCreditTrigramURL, { trigram: member.trigram })
			if (typeof perms !== "string" && typeof credits !== "string") {
				console.log(buildPermHistory(perms, credits, member, "Perm"))
				console.log(buildPermHistory(perms, credits, member, "Recup"))
				setPermHistory(buildPermHistory(perms, credits, member, "Perm"))
				setRecupHistory(buildPermHistory(perms, credits, member, "Recup"))
			}
		}
	}, [])
	return (
		<>
			<MainNavBar />
			<div className='row mt-2 justify-content-center'>
				<h4 className='col-md-6 text-center'>{`${
					member.rank + " " + member.firstName + " " + member.surName
				}`}</h4>
			</div>
			<div className='row mt-2 justify-content-center'>
				<Button size={3} buttonColor='primary' buttonContent='Permissions' onClick={() => setChoice("Perm")} />
				<div className='col-md-1'></div>
				<Button
					size={3}
					buttonColor='primary'
					buttonContent='Récupérations'
					onClick={() => setChoice("Recup")}
				/>
			</div>
			{choice === "Perm" ? (
				permHistory.length > 0 ? (
					<HolidayHistoryDetails holidayHistory={permHistory} />
				) : (
					<div className='row justify-content-center fs-3'>Aucun mouvement</div>
				)
			) : recupHistory.length > 0 ? (
				<HolidayHistoryDetails holidayHistory={recupHistory} />
			) : (
				<div className='row justify-content-center fs-3'>Aucun mouvement</div>
			)}
			<div className='row justify-content-center mt-2'>
				<Button size={3} buttonColor='danger' buttonContent='Retour' onClick={back} />
			</div>
		</>
	)
}
