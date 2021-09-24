/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { SimpleSelect } from "../BasicComponents/SimpleSelect"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { memberURL, saveMemberURL } from "../Datas/urls"
import { crews, groundFunction, ranks, specialities } from "../Datas/constants"
import { MainNavBar } from "../Sections/MainNavbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { crewMember } from "../types/Objects"

export const membersManager = (): JSX.Element => {
	const history = useHistory()
	const [show, setShow] = useState(false)
	const [members, setMembers] = useState<crewMember[]>([])
	const Delete = (memberTarget: crewMember) => setMembers(members.filter((member) => member !== memberTarget))
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
		memberTarget: crewMember,
		prop: string
	) => {
		const membersMod = members.map((member) => {
			if (member !== memberTarget) return member
			else
				return {
					rank: prop === "rank" ? e.target.value : member.rank,
					firstName: prop === "firstName" ? e.target.value : member.firstName,
					surName: prop === "surName" ? e.target.value : member.surName,
					registration: prop === "registration" ? e.target.value : member.registration,
					trigram: prop === "trigram" ? e.target.value : member.trigram,
					crew: prop === "crew" ? e.target.value : member.crew,
					onBoardFunction: prop === "onBoardFunction" ? e.target.value : member.onBoardFunction,
					groundFunction: prop === "groundFunction" ? e.target.value : member.groundFunction,
					tel: prop === "tel" ? e.target.value : member.tel,
				}
		})
		setMembers(membersMod)
	}
	const addNew = () =>
		setMembers([
			...members,
			{
				rank: "",
				firstName: "",
				surName: "",
				registration: "",
				trigram: "",
				crew: "",
				onBoardFunction: "",
				groundFunction: "",
				tel: "",
			},
		])
	const allNonNull = () => {
		return members.reduce(
			(acc, member) =>
				acc &&
				member.rank !== "" &&
				member.firstName !== "" &&
				member.surName !== "" &&
				member.onBoardFunction !== "" &&
				member.groundFunction !== "" &&
				member.trigram !== "" &&
				(member.onBoardFunction !== "CDA" || member.crew !== ""),
			true
		)
	}
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(memberURL, {})
		if (deleted === "deleted") {
			members.map(async (member) => {
				const { rank, firstName, surName, registration, trigram, crew, onBoardFunction, groundFunction, tel } =
					member
				await postFetchRequest(saveMemberURL, {
					newCrewMember: {
						rank,
						firstName,
						surName,
						registration: registration ? registration : "",
						trigram,
						crew: crew ? crew : "",
						onBoardFunction,
						groundFunction,
						tel: tel ? tel : "",
					},
				})
			})
			setShow(true)
		}
	}
	useAsyncEffect(async () => {
		const members = await getFetchRequest<crewMember[]>(memberURL)
		if (typeof members !== "string") setMembers(members)
	}, [])
	return (
		<>
			<MainNavBar />
			<AlertToast
				color='primary'
				info='La liste des membres a bien été sauvegardée'
				show={show}
				onClose={() => setShow(false)}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-11 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div>
						- Vous pouvez modifier la liste apparaissant sur cette page tant que vous ne cliquez pas sur
						&apos;Enregistrer la liste&apos;, la base de donnée ne sera pas modifiée.
					</div>
					<div>
						- Afin d&apos;enregistrer la liste des membres aucune des propriétés marquées d&apos;un * doit
						être vide.
					</div>
					<div>- Le champ équipage n&apos;est obligatoire que pour les CDA.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-11 card-body-color rounded'>
					<div className='row'>
						<h4 className='col-md-10 text-center'>Liste des membres de la flotille</h4>
						<Button
							size={2}
							buttonColor='primary'
							buttonContent='Ajouter un nouveau membre'
							onClick={() => addNew()}
						/>
					</div>
					<div className='row'>
						<div className='col-md-1 text-center'>Grade *</div>
						<div className='col-md-1 text-center'>Prénom *</div>
						<div className='col-md-1 text-center'>Nom *</div>
						<div className='col-md-1 text-center'>Matricule</div>
						<div className='col-md-1 text-center'>Trigramme *</div>
						<div className='col-md-1 text-center'>Equipage</div>
						<div className='col-md-1 text-center'>Spécialité *</div>
						<div className='col-md-2 text-center'>Fonction sol *</div>
						<div className='col-md-1 text-center'>Tél</div>
					</div>
					{members &&
						members.map((member) => (
							<div key={members.indexOf(member)} className='row my-1'>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									value={member.rank}
									handleChange={(event) => handleChange(event, member, "rank")}
									options={ranks}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: member.firstName, value: member.firstName }}
									handleChange={(e) => handleChange(e, member, "firstName")}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: member.surName, value: member.surName }}
									handleChange={(e) => handleChange(e, member, "surName")}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: member.registration!, value: member.registration! }}
									handleChange={(e) => handleChange(e, member, "registration")}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: member.trigram, value: member.trigram }}
									handleChange={(e) => handleChange(e, member, "trigram")}
								/>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									value={member.crew!}
									handleChange={(event) => handleChange(event, member, "crew")}
									options={crews}
								/>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									value={member.onBoardFunction}
									handleChange={(event) => handleChange(event, member, "onBoardFunction")}
									options={specialities}
								/>
								<SimpleSelect
									size={2}
									backgroundColor='dark'
									textColor='white'
									value={member.groundFunction}
									handleChange={(event) => handleChange(event, member, "groundFunction")}
									options={groundFunction}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: member.tel!, value: member.tel! }}
									handleChange={(e) => handleChange(e, member, "tel")}
								/>
								<Button
									size={2}
									buttonColor='danger'
									buttonContent='Supprimer ce membre'
									onClick={() => Delete(member)}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Enregistrer la liste'
					onClick={() => saveAll()}
					disabled={!allNonNull()}
				/>
				<div className='col-md-1'></div>
				<Button
					size={2}
					buttonColor='danger'
					buttonContent='Retour'
					onClick={() => history.push("/manageDB")}
				/>
			</div>
		</>
	)
}
