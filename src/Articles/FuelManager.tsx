import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { fuelURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Fuel } from "../types/Objects"

export const FuelManager = (): JSX.Element => {
	const history = useHistory()
	const [show, setShow] = useState(false)
	const [fuels, setFuels] = useState<{ name: string; value: string }[]>([])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fuelTarget: { name: string; value: string }) => {
		const fuelsMod = fuels.map((fuel) => {
			if (fuel !== fuelTarget) return fuel
			else return { name: e.target.name, value: e.target.value }
		})
		setFuels(fuelsMod)
	}
	const Delete = (fuelTarget: { name: string; value: string }) =>
		setFuels(fuels.filter((fuel) => fuel !== fuelTarget))
	const addNew = () => setFuels([...fuels, { name: "", value: "" }])
	const allNonNull = () => fuels.reduce((acc, fuel) => fuel.value !== "", true)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(fuelURL, {})
		if (deleted === "deleted") {
			fuels.map(async (fuel) => {
				await postFetchRequest(fuelURL, { fuel: { quantity: fuel.value } })
			})
		}
		setShow(true)
	}
	useAsyncEffect(async () => {
		const fuels = await getFetchRequest<Fuel[]>(fuelURL)
		if (typeof fuels !== "string") {
			setFuels(
				fuels.map((fuel) => {
					return { name: fuel.quantity, value: fuel.quantity }
				})
			)
		}
	}, [])
	return (
		<>
			<Navbar />
			<AlertToast
				color='primary'
				info='La liste des quantité a bien été sauvegardée'
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
					<div>- Pour enregistrer la liste des quantités, elles doivent toutes être remplies.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded'>
					<div className='row'>
						<h4 className='col-md-8 text-center'>Liste des quantités embarquables</h4>
						<Button
							size={3}
							buttonColor='primary'
							buttonContent='Ajouter une nouvelle quantité'
							onClick={() => addNew()}
						/>
					</div>
					{fuels &&
						fuels.map((fuel) => (
							<div key={fuels.indexOf(fuel)} className='row my-2'>
								<Label title='Quantité embarquable : ' size={4} />
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={fuel}
									handleChange={(e) => handleChange(e, fuel)}
								/>
								<div className='col-md-1'></div>
								<Button
									size={3}
									buttonColor='danger'
									buttonContent='Supprimer cette quantité'
									onClick={() => Delete(fuel)}
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
