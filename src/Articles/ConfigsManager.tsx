import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { configURL } from "../Datas/datas"
import { Navbar } from "../Sections/Navbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { Config } from "../types/Objects"

export const ConfigsManager = (): JSX.Element => {
	const [configs, setConfigs] = useState<{ name: string; value: string }[]>([])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, configTarget: { name: string; value: string }) => {
		const configsMod = configs.map((config) => {
			if (config !== configTarget) return config
			else return { name: e.target.name, value: e.target.value }
		})
		setConfigs(configsMod)
	}
	const Delete = (configTarget: { name: string; value: string }) =>
		setConfigs(configs.filter((config) => config !== configTarget))
	const addNew = () => setConfigs([...configs, { name: "", value: "" }])
	const allNonNull = () => configs.reduce((acc, config) => config.value !== "", true)
	const saveAll = async () => {
		const deleted = await deleteFetchRequest(configURL, {})
		if (deleted === "deleted") {
			configs.map(async (config) => {
				await postFetchRequest(configURL, { config: { name: config.value } })
			})
		}
	}
	useAsyncEffect(async () => {
		const configs = await getFetchRequest<Config[]>(configURL)
		if (typeof configs !== "string") {
			setConfigs(
				configs.map((config) => {
					return { name: config.name, value: config.name }
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
					<div>- Pour enregistrer la liste des configurations, elles doivent toutes avoir un nom.</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-6 card-body-color rounded'>
					<h4 className='text-center'>Liste des configurations avion</h4>
					{configs &&
						configs.map((config) => (
							<div key={configs.indexOf(config)} className='row my-2'>
								<Label title='Nom de la la configuration : ' size={4} />
								<UnvalidateInput
									size={3}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={config}
									handleChange={(e) => handleChange(e, config)}
								/>
								<div className='col-md-1'></div>
								<Button
									size={3}
									buttonColor='danger'
									buttonContent='Supprimer cette config'
									onClick={() => Delete(config)}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonColor='primary'
					buttonContent='Ajouter une nouvelle config'
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
