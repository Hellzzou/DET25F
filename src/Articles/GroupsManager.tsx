import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { groupURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Group } from "../types/Objects"

export const GroupsManager = (): JSX.Element => {
	const [groups, setGroups] = useState<Group[]>([])
	const Delete = (groupTarget: Group) => setGroups(groups.filter((group) => group !== groupTarget))
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, groupTarget: Group, prop: string) => {
		const groupsMod = groups.map((group) => {
			if (group !== groupTarget) return group
			else
				return {
					group: prop === "group" ? e.target.value : group.group,
					underGroup: prop === "underGroup" ? e.target.value : group.underGroup,
					description: prop === "description" ? e.target.value : group.description,
					manager: prop === "manager" ? e.target.value : group.manager,
					client: prop === "client" ? e.target.value : group.client,
					allocation: prop === "allocation" ? parseInt(e.target.value) : group.allocation,
				}
		})
		setGroups(groupsMod)
	}
	const addNew = () =>
		setGroups([...groups, { group: "", underGroup: "", description: "", manager: "", client: "", allocation: 0 }])
	const allNonNull = () =>
		groups.reduce(
			(acc, group) =>
				acc &&
				group.group !== "" &&
				group.underGroup !== "" &&
				group.description !== "" &&
				group.manager !== "" &&
				group.client !== "",
			true
		)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(groupURL, {})
		if (deleted === "deleted") {
			groups.map(async (group) => {
				const { underGroup, description, manager, client, allocation } = group
				await postFetchRequest(groupURL, {
					group: { group: group.group, underGroup, description, manager, client, allocation },
				})
			})
		}
	}
	useAsyncEffect(async () => {
		const groups = await getFetchRequest<Group[]>(groupURL)
		if (typeof groups !== "string") setGroups(groups)
	}, [])
	return (
		<>
			<Navbar />
			<div className='row justify-content-center m-2'>
				<div className='col-md-11 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div>
						- Vous pouvez modifier la liste apparaissant sur cette page tant que vous ne cliquez pas sur
						&apos;Enregistrer la liste&apos;, la base de donnée ne sera pas modifiée.
					</div>
					<div>
						- Afin d&apos;enregistrer la liste des groupes aucune des propriétés des groupes doit être vide.
					</div>
					<div>
						- Pour les allocations, si plusieurs allocations sont groupées, mettez l&apos;allocation au
						premier groupe concerné, puis -1 aux suivants
					</div>
					<div>
						- L&apos;ordre dans lequel sont rentrés les groupes ici, sera le même que pour les compte-rendus
					</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-11 card-body-color rounded'>
					<h4 className='text-center'>Liste des groupes de vol</h4>
					<div className='row'>
						<div className='col-md-1 text-center'>Groupes</div>
						<div className='col-md-1 text-center'>Sous-groupes</div>
						<div className='col-md-2 text-center'>Descriptions</div>
						<div className='col-md-2 text-center'>Gestionnaires</div>
						<div className='col-md-2 text-center'>Clients</div>
						<div className='col-md-2 text-center'>Allocations</div>
					</div>
					{groups &&
						groups.map((group) => (
							<div key={groups.indexOf(group)} className='row my-1'>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: group.group, value: group.group }}
									handleChange={(e) => handleChange(e, group, "group")}
								/>
								<UnvalidateInput
									size={1}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: group.underGroup, value: group.underGroup }}
									handleChange={(e) => handleChange(e, group, "underGroup")}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: group.description, value: group.description }}
									handleChange={(e) => handleChange(e, group, "description")}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: group.manager, value: group.manager }}
									handleChange={(e) => handleChange(e, group, "manager")}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: group.client, value: group.client }}
									handleChange={(e) => handleChange(e, group, "client")}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: group.allocation.toString(), value: group.allocation.toString() }}
									handleChange={(e) => handleChange(e, group, "allocation")}
								/>
								<Button
									size={2}
									buttonColor='danger'
									buttonContent='Supprimer ce groupe'
									onClick={() => Delete(group)}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Ajouter un nouveau groupe'
					onClick={() => addNew()}
				/>
				<div className='col-md-1'></div>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Enregistrer la liste'
					onClick={() => saveAll()}
					disabled={!allNonNull()}
				/>
			</div>
		</>
	)
}
