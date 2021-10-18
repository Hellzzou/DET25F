import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { CreditHolidayModal } from "../Articles/CreditHolidayModal"
import { Button } from "../BasicComponents/Button"
import { INITIAL_CREWMEMBER } from "../Datas/initialObjects"
import { creditHolidayURL, memberURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { getFetchRequest, postFetchRequest, putFetchRequest } from "../tools/fetch"
import { CrewMember } from "../types/Objects"

export const HolidayManager = (): JSX.Element => {
	const history = useHistory()
	const [members, setMembers] = useState<CrewMember[]>([])
	const [member, setMember] = useState<CrewMember>(INITIAL_CREWMEMBER)
	const [show, setShow] = useState(false)
	const showModal = (member: CrewMember) => {
		setMember(member)
		setShow(true)
	}
	const creditHoliday = async (type: string, number: string, reason: string) => {
		const updatedMember = {
			_id: member._id,
			firstName: member.firstName,
			surName: member.surName,
			rank: member.rank,
			crew: member.crew,
			onBoardFunction: member.onBoardFunction,
			groundFunction: member.groundFunction,
			trigram: member.trigram,
			tel: member.tel,
			registration: member.registration,
			holidays: type === "Perm" ? (member.holidays += parseInt(number)) : member.holidays,
			recoveries: type === "Recup" ? (member.recoveries += parseInt(number)) : member.recoveries,
		}
		const modified = await putFetchRequest(memberURL, updatedMember)
		if (modified === "success") {
			const saved = await postFetchRequest(creditHolidayURL, {
				creditHoliday: { date: new Date(), type, number: parseInt(number), reason, trigram: member.trigram },
			})
			if (saved === "success") setShow(false)
		}
	}
	useAsyncEffect(async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		setMembers(members)
	}, [])
	return (
		<>
			<MainNavBar />
			<CreditHolidayModal
				show={show}
				handleClose={() => setShow(false)}
				creditHoliday={creditHoliday}
				member={member.rank + " " + member.firstName + " " + member.surName}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-10 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div className='text-danger'>
						- Attention ici chaque clique sur les boutons modifie directement la base de données.
					</div>
					<div>
						- En cliquant sur &apos;Modifier cet utlisateur&apos; vous modifiez les 4 informations présentes
						sur cette page mais pas son login/mot de passe
					</div>
					<div>
						- Si un utilsateur souhaite réinitialiser ses login/mot de passe il suffit de cliquer sur
						&apos;Réinitialiser ses accès&apos;. Son login sera par défaut son email et son mot de passe :
						Azerty01!
					</div>
					<div>
						- En cliquant sur &apos;Ajouter un nouvel utilisateur&apos;, vous allez devoir remplir les 4
						infos présentes sur cette page puis valider, ce qui créera un nouvel utlisateur avec des
						login/mot de passe par défaut.
					</div>
					<div>
						- Le nouvel utilisateur pourrra ensuite modifier ses login/mot de passe via la rubrique :
						&apos;mon compte&apos;.
					</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-10 card-body-color rounded'>
					<div className='row'>
						<span className='col-md-2 text-center'>Prénom</span>
						<span className='col-md-2 text-center'>Nom</span>
						<span className='col-md-2 text-center'>Perms</span>
						<span className='col-md-2 text-center'>Recups</span>
					</div>
					{members.map((member) => (
						<div key={members.indexOf(member)} className='row my-1'>
							<span className='col-md-2 text-center'>{member.firstName}</span>
							<span className='col-md-2 text-center'>{member.surName}</span>
							<span className='col-md-2 text-center'>{member.holidays}</span>
							<span className='col-md-2 text-center'>{member.recoveries}</span>
							<div className='col-md-2'>
								<Button
									size={12}
									buttonColor='primary'
									buttonContent='Créditer'
									onClick={() => showModal(member)}
								/>
							</div>
							<div className='col-md-2'>
								<Button
									size={12}
									buttonColor='primary'
									buttonContent="Voir l'historique"
									onClick={() => history.push(`/holidayHistory/${member._id}/manageDB`)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={3}
					buttonColor='danger'
					buttonContent='Retour'
					onClick={() => history.push("/manageDB")}
				/>
			</div>
		</>
	)
}
