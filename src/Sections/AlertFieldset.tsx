import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { DB_URL } from "../Datas/datas"
import { postFetchRequest } from "../tools/fetch"
import { dateIsCorrect, selectChoiceIsDone } from "../tools/validators"
import { crewMember } from "../types/Objects"
import { alertFieldsetProps } from "../types/Sections"

export const AlertFieldset = (props: alertFieldsetProps): JSX.Element => {
	const [pilots, setPilots] = useState<Array<string>>(["Choix..."])
	const [mecbos, setMecbos] = useState<Array<string>>(["Choix..."])
	const [navs, setNavs] = useState<Array<string>>(["Choix..."])
	const [radios, setRadios] = useState<Array<string>>(["Choix..."])
	const [techs, setTechs] = useState<Array<string>>(["Choix..."])
	useAsyncEffect(async () => {
		const cdas = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
			function: "CDA",
		})
		const pilots = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
			function: "pilote",
		})
		const mecbos = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
			function: "MECBO",
		})
		const navs = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
			function: "DENAE",
		})
		const radios = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
			function: "GETBO",
		})
		const techs = await postFetchRequest<crewMember[]>(DB_URL + "crewMembers/findByOnboardFunction", {
			function: "TECH",
		})
		if (typeof cdas !== "string" && typeof pilots !== "string")
			setPilots([
				...cdas.map((cda: crewMember) => cda.trigram),
				...pilots.map((pilot: crewMember) => pilot.trigram),
			])
		if (typeof mecbos !== "string") setMecbos(mecbos.map((cda: crewMember) => cda.trigram))
		if (typeof navs !== "string") setNavs(navs.map((cda: crewMember) => cda.trigram))
		if (typeof radios !== "string") setRadios(radios.map((cda: crewMember) => cda.trigram))
		if (typeof techs !== "string") setTechs(techs.map((cda: crewMember) => cda.trigram))
	}, [])
	return (
		<fieldset className='col-md-6 border border-dark rounded'>
			<Legend title='Alerte' />
			<div className='row form-group m-1'>
				<Label title='Date :' size={4} />
				<Input
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.departureDate}
					setControl={props.setDepartureDate}
					validator={dateIsCorrect}
					type='date'
					min={0}
					max={0}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='CDA :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.chief}
					setControl={props.setChief}
					options={pilots}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='pilote :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.pilot}
					setControl={props.setPilot}
					options={pilots}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Mecbo :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.mecbo}
					setControl={props.setMecbo}
					options={mecbos}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Nav :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.nav}
					setControl={props.setNav}
					options={navs}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Radariste :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.rdr}
					setControl={props.setRdr}
					options={navs}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Radio :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.radio}
					setControl={props.setRadio}
					options={radios}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Tech :' size={4} />
				<Select
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.tech}
					setControl={props.setTech}
					options={techs}
					validator={selectChoiceIsDone}
				/>
			</div>
		</fieldset>
	)
}
