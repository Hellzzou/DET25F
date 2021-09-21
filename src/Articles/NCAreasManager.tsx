import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { NCAreaURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { NCArea } from "../types/Objects"

export const NCAreasManager = (): JSX.Element => {
	const history = useHistory()
	const [show, setShow] = useState(false)
	const [NCAreas, setNCAreas] = useState<{ name: string; value: string }[]>([])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, NCAreaTarget: { name: string; value: string }) => {
		const NCAreasMod = NCAreas.map((NCArea) => {
			if (NCArea !== NCAreaTarget) return NCArea
			else return { name: e.target.name, value: e.target.value }
		})
		setNCAreas(NCAreasMod)
	}
	const Delete = (NCAreaTarget: { name: string; value: string }) =>
		setNCAreas(NCAreas.filter((NCArea) => NCArea !== NCAreaTarget))
	const addNew = () => setNCAreas([...NCAreas, { name: "", value: "" }])
	const allNonNull = () => NCAreas.reduce((acc, NCArea) => NCArea.value !== "", true)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(NCAreaURL, {})
		if (deleted === "deleted") {
			NCAreas.map(async (NCArea) => {
				await postFetchRequest(NCAreaURL, { NCArea: { name: NCArea.value } })
			})
		}
		setShow(true)
	}
	useAsyncEffect(async () => {
		const NCAreas = await getFetchRequest<NCArea[]>(NCAreaURL)
		if (typeof NCAreas !== "string") {
			setNCAreas(
				NCAreas.map((NCArea) => {
					return { name: NCArea.name, value: NCArea.name }
				})
			)
		}
	}, [])
	return (
		<>
			<Navbar />
			<AlertToast
				color='primary'
				info='La liste des zones en ZEE a bien été sauvegardée'
				show={show}
				onClose={() => setShow(false)}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div>
						- Vous pouvez modifier la liste apparaissant sur cette page tant que vous ne cliquez pas sur
						&apos;Enregistrer la liste&apos;, la base de donnée ne sera pas modifiée.
					</div>
					<div>- Pour enregistrer la liste des zones en ZEE, elles doivent toutes avoir un nom.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded'>
					<div className='row'>
						<h4 className='col-md-8 text-center'>Liste des zones en ZEE</h4>
						<Button
							size={3}
							buttonColor='primary'
							buttonContent='Ajouter une nouvelle zone'
							onClick={() => addNew()}
						/>
					</div>
					{NCAreas &&
						NCAreas.map((NCArea) => (
							<div key={NCAreas.indexOf(NCArea)} className='row my-2'>
								<Label title='Nom de la zone : ' size={4} />
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={NCArea}
									handleChange={(e) => handleChange(e, NCArea)}
								/>
								<div className='col-md-1'></div>
								<Button
									size={3}
									buttonColor='danger'
									buttonContent='Supprimer cette zone'
									onClick={() => Delete(NCArea)}
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
