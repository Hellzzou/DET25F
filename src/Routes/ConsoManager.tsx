import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { SimpleSelect } from "../BasicComponents/SimpleSelect"
import { TextArea } from "../BasicComponents/TextArea"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { INITIAL_FALSE_SELECT } from "../Datas/initialObjects"
import { consoURL, distinctUnderGroupURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { selectChoiceIsDone, textIsNotNull } from "../tools/validators"
import { Conso, UpgradedConso } from "../types/Objects"

export const ConsoManager = (): JSX.Element => {
	const [show, setShow] = useState(false)
	const [consos, setConsos] = useState<UpgradedConso[]>([])
	const [underGroups, setUnderGroups] = useState<string[]>([])
	const history = useHistory()
	const Delete = (consoTarget: Conso) => setConsos(consos.filter((conso) => conso !== consoTarget))
	const allNonNull = () =>
		consos.reduce((acc, conso) => acc && conso.name !== "" && conso.underGroups.length !== 0, true)
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, consoTarget: Conso) => {
		const consosMod = consos.map((conso) => {
			if (conso !== consoTarget) return conso
			else
				return {
					name: e.target.value,
					underGroups: conso.underGroups,
					addableUnderGroups: conso.addableUnderGroups,
					addUnderGroup: conso.addUnderGroup,
					deleteUnderGroup: conso.deleteUnderGroup,
				}
		})
		setConsos(consosMod)
	}
	const selectChange = (e: React.ChangeEvent<HTMLSelectElement>, consoTarget: UpgradedConso, prop: string) => {
		const consosMod = consos.map((conso) => {
			if (conso !== consoTarget) return conso
			else
				return {
					name: conso.name,
					underGroups: conso.underGroups,
					addableUnderGroups: conso.addableUnderGroups,
					addUnderGroup:
						prop === "add"
							? { value: e.target.value, validity: selectChoiceIsDone(e.target.value), disabled: false }
							: conso.addUnderGroup,
					deleteUnderGroup:
						prop === "delete"
							? { value: e.target.value, validity: selectChoiceIsDone(e.target.value), disabled: false }
							: conso.deleteUnderGroup,
				}
		})
		setConsos(consosMod)
	}
	const addunderGroup = (consoTarget: UpgradedConso) => {
		const consosMod = consos.map((conso) => {
			if (conso !== consoTarget) return conso
			else
				return {
					name: conso.name,
					addableUnderGroups: conso.addableUnderGroups.filter(
						(underGroup) => underGroup !== consoTarget.addUnderGroup.value
					),
					underGroups: [...conso.underGroups, consoTarget.addUnderGroup.value],
					addUnderGroup: INITIAL_FALSE_SELECT,
					deleteUnderGroup: INITIAL_FALSE_SELECT,
				}
		})
		setConsos(consosMod)
	}
	const deleteUnderGroup = (consoTarget: UpgradedConso) => {
		const consosMod = consos.map((conso) => {
			if (conso !== consoTarget) return conso
			else
				return {
					name: conso.name,
					underGroups: conso.underGroups.filter(
						(underGroup) => underGroup !== consoTarget.deleteUnderGroup.value
					),
					addableUnderGroups: [...conso.addableUnderGroups, consoTarget.deleteUnderGroup.value],
					addUnderGroup: INITIAL_FALSE_SELECT,
					deleteUnderGroup: INITIAL_FALSE_SELECT,
				}
		})
		setConsos(consosMod)
	}
	const addNew = () =>
		setConsos([
			...consos,
			{
				name: "",
				underGroups: [],
				addableUnderGroups: underGroups,
				addUnderGroup: INITIAL_FALSE_SELECT,
				deleteUnderGroup: INITIAL_FALSE_SELECT,
			},
		])
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(consoURL, {})
		if (deleted === "deleted") {
			consos.map(async (conso) => {
				await postFetchRequest(consoURL, {
					conso: {
						name: conso.name,
						underGroups: conso.underGroups,
					},
				})
			})
			setShow(true)
		}
	}
	useAsyncEffect(async () => {
		const underGroups = await getFetchRequest<string[]>(distinctUnderGroupURL)
		const consos = await getFetchRequest<Conso[]>(consoURL)
		if (typeof consos !== "string" && typeof underGroups !== "string") {
			setConsos(
				consos.map((conso) => {
					return {
						name: conso.name,
						underGroups: conso.underGroups,
						addableUnderGroups: underGroups.filter((underGroup) => !conso.underGroups.includes(underGroup)),
						addUnderGroup: INITIAL_FALSE_SELECT,
						deleteUnderGroup: INITIAL_FALSE_SELECT,
					}
				})
			)
			setUnderGroups(underGroups)
		}
	}, [])
	return (
		<>
			<MainNavBar />
			<AlertToast
				color='primary'
				info='La liste des groupement a bien été sauvegardée'
				show={show}
				onClose={() => setShow(false)}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-10 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div>
						- Vous pouvez modifier la liste apparaissant sur cette page tant que vous ne cliquez pas sur
						&apos;Enregistrer la liste&apos;, la base de donnée ne sera pas modifiée.
					</div>
					<div>
						- Pour enregistrer la liste des courbes de consommation, elles doivent toutes avoir un nom et
						une liste de groupes non vide.
					</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-10 card-body-color rounded'>
					<div className='row'>
						<h4 className='col-md-8 text-center'>Liste des courbes de consommation</h4>
						<Button
							size={3}
							buttonColor='primary'
							buttonContent='Ajouter un nouveau groupement'
							onClick={() => addNew()}
						/>
					</div>
					<div className='row'>
						<span className='col-md-3 text-center'>Nom du regroupement</span>
						<span className='col-md-2 text-center'>Ajouter un sous-groupe</span>
						<span className='col-md-3 text-center'>Liste des sous-groupes</span>
						<span className='col-md-2 text-center'>Supprimer un sous-groupe</span>
					</div>
					{consos &&
						consos.map((conso) => (
							<div key={consos.indexOf(conso)} className='row my-2'>
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: conso.name, value: conso.name }}
									handleChange={(e) => handleNameChange(e, conso)}
								/>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									value={conso.addUnderGroup.value}
									options={conso.addableUnderGroups.sort(
										(u1, u2) => parseInt(u1.replace("X", "0")) - parseInt(u2.replace("X", "0"))
									)}
									handleChange={(e) => selectChange(e, conso, "add")}
								/>
								<Button
									size={1}
									buttonColor='primary'
									buttonContent='+'
									onClick={() => addunderGroup(conso)}
									disabled={!conso.addUnderGroup.validity}
								/>
								<TextArea
									size={3}
									backgroundColor='dark'
									textColor='white'
									control={{
										value: conso.underGroups,
										validity: conso.underGroups.length !== 0,
										disabled: false,
									}}
									validator={textIsNotNull}
								/>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									value={conso.deleteUnderGroup.value}
									options={conso.underGroups}
									handleChange={(e) => selectChange(e, conso, "delete")}
								/>
								<Button
									size={1}
									buttonColor='danger'
									buttonContent='-'
									onClick={() => deleteUnderGroup(conso)}
									disabled={!conso.deleteUnderGroup.validity}
								/>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='danger'
										buttonContent='Supprimer ce groupement'
										onClick={() => Delete(conso)}
									/>
								</div>
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
