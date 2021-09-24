import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { areaURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Area } from "../types/Objects"

export const AreasManager = (): JSX.Element => {
	const history = useHistory()
	const [show, setShow] = useState(false)
	const [areas, setAreas] = useState<{ name: string; value: string }[]>([])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, areaTarget: { name: string; value: string }) => {
		const areasMod = areas.map((area) => {
			if (area !== areaTarget) return area
			else return { name: e.target.name, value: e.target.value }
		})
		setAreas(areasMod)
	}
	const Delete = (areaTarget: { name: string; value: string }) =>
		setAreas(areas.filter((area) => area !== areaTarget))
	const addNew = () => setAreas([...areas, { name: "", value: "" }])
	const allNonNull = () => areas.reduce((acc, area) => area.value !== "", true)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(areaURL, {})
		if (deleted === "deleted") {
			areas.map(async (area) => {
				await postFetchRequest(areaURL, { area: { name: area.value } })
			})
		}
		setShow(true)
	}
	useAsyncEffect(async () => {
		const areas = await getFetchRequest<Area[]>(areaURL)
		if (typeof areas !== "string") {
			setAreas(
				areas.map((area) => {
					return { name: area.name, value: area.name }
				})
			)
		}
	}, [])
	return (
		<>
			<MainNavBar />
			<AlertToast
				color='primary'
				info='La liste des zones a bien été sauvegardée'
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
					<div>- Pour enregistrer la liste des zones, elles doivent toutes avoir un nom.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded'>
					<div className='row'>
						<h4 className='col-md-8 text-center'>Liste des zones géographiques</h4>
						<Button
							size={3}
							buttonColor='primary'
							buttonContent='Ajouter une nouvelle zone'
							onClick={() => addNew()}
						/>
					</div>
					{areas &&
						areas.map((area) => (
							<div key={areas.indexOf(area)} className='row my-2'>
								<Label title='Nom de la zone : ' size={4} />
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={area}
									handleChange={(e) => handleChange(e, area)}
								/>
								<div className='col-md-1'></div>
								<Button
									size={3}
									buttonColor='danger'
									buttonContent='Supprimer cette zone'
									onClick={() => Delete(area)}
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
