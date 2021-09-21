import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { aircraftURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Aircraft } from "../types/Objects"

export const AircraftManager = (): JSX.Element => {
	const [aircrafts, setAircrafts] = useState<{ name: string; value: string }[]>([])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, aircraftTarget: { name: string; value: string }) => {
		const aircraftsMod = aircrafts.map((aircraft) => {
			if (aircraft !== aircraftTarget) return aircraft
			else return { name: e.target.name, value: e.target.value }
		})
		setAircrafts(aircraftsMod)
	}
	const Delete = (aircraftTarget: { name: string; value: string }) =>
		setAircrafts(aircrafts.filter((aircraft) => aircraft !== aircraftTarget))
	const addNew = () => setAircrafts([...aircrafts, { name: "", value: "" }])
	const allNonNull = () => aircrafts.reduce((acc, aircraft) => aircraft.value !== "", true)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(aircraftURL, {})
		if (deleted === "deleted") {
			aircrafts.map(async (aircraft) => {
				await postFetchRequest(aircraftURL, { aircraft: { number: aircraft.value } })
			})
		}
	}
	useAsyncEffect(async () => {
		const aircrafts = await getFetchRequest<Aircraft[]>(aircraftURL)
		if (typeof aircrafts !== "string") {
			setAircrafts(
				aircrafts.map((aircraft) => {
					return { name: aircraft.number, value: aircraft.number }
				})
			)
		}
	}, [])
	return (
		<>
			<Navbar />
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div>
						- Vous pouvez modifier la liste apparaissant sur cette page tant que vous ne cliquez pas sur
						&apos;Enregistrer la liste&apos;, la base de donnée ne sera pas modifiée.
					</div>
					<div>- Pour enregistrer la liste des avions, ils doivent tous avoir un numéro.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded'>
					<h4 className='text-center'>Liste des avions disponibles</h4>
					{aircrafts &&
						aircrafts.map((aircraft) => (
							<div key={aircrafts.indexOf(aircraft)} className='row my-2'>
								<Label title="Numéro de l'avion : " size={4} />
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={aircraft}
									handleChange={(e) => handleChange(e, aircraft)}
								/>
								<div className='col-md-1'></div>
								<Button
									size={3}
									buttonColor='danger'
									buttonContent='Supprimer cet avion'
									onClick={() => Delete(aircraft)}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Ajouter un nouvel avion'
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
