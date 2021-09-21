import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { typeURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { FlightType } from "../types/Objects"

export const TypesManager = (): JSX.Element => {
	const [types, setTypes] = useState<{ name: string; value: string }[]>([])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, typesTarget: { name: string; value: string }) => {
		const typesMod = types.map((type) => {
			if (type !== typesTarget) return type
			else return { name: e.target.name, value: e.target.value }
		})
		setTypes(typesMod)
	}
	const Delete = (TypesTarget: { name: string; value: string }) =>
		setTypes(types.filter((type) => type !== TypesTarget))
	const addNew = () => setTypes([...types, { name: "", value: "" }])
	const allNonNull = () => types.reduce((acc, type) => type.value !== "", true)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(typeURL, {})
		if (deleted === "deleted") {
			types.map(async (type) => {
				await postFetchRequest(typeURL, { type: { name: type.value } })
			})
		}
	}
	useAsyncEffect(async () => {
		const types = await getFetchRequest<FlightType[]>(typeURL)
		if (typeof types !== "string") {
			setTypes(
				types.map((type) => {
					return { name: type.name, value: type.name }
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
					<div>- Pour enregistrer la liste des types de vol, ils doivent tous avoir un nom.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded'>
					<h4 className='text-center'>Liste des types de vol</h4>
					{types &&
						types.map((type) => (
							<div key={types.indexOf(type)} className='row my-2'>
								<Label title='Type de vol : ' size={4} />
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={type}
									handleChange={(e) => handleChange(e, type)}
								/>
								<div className='col-md-1'></div>
								<Button
									size={3}
									buttonColor='danger'
									buttonContent='Supprimer ce type'
									onClick={() => Delete(type)}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Ajouter un nouveau type'
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
