import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { PasswordInput } from "../BasicComponents/PasswordInput"
import { Select } from "../BasicComponents/Select"
import { alertDateFinder, onBoardFunctionURL } from "../Datas/urls"
import { postFetchRequest } from "../tools/fetch"
import { dateIsCorrect, selectChoiceIsDone } from "../tools/validators"
import { CrewMember } from "../types/Objects"
import { alertFieldsetProps } from "../types/Sections"

export const AlertFieldset = (props: alertFieldsetProps): JSX.Element => {
	const [pilots, setPilots] = useState<Array<string>>(["Choix..."])
	const [mecbos, setMecbos] = useState<Array<string>>(["Choix..."])
	const [navs, setNavs] = useState<Array<string>>(["Choix..."])
	const [radios, setRadios] = useState<Array<string>>(["Choix..."])
	const [techs, setTechs] = useState<Array<string>>(["Choix..."])
	const [info, setInfo] = useState({ value: "", color: "" })
	useAsyncEffect(async () => {
		const cdas = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, {
			function: "CDA",
		})
		const pilots = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, {
			function: "pilote",
		})
		const mecbos = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, {
			function: "MECBO",
		})
		const navs = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, {
			function: "DENAE",
		})
		const radios = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, {
			function: "GETBO",
		})
		const techs = await postFetchRequest<CrewMember[]>(onBoardFunctionURL, {
			function: "TECH",
		})
		if (typeof cdas !== "string" && typeof pilots !== "string")
			setPilots([...cdas, ...pilots].map(({ trigram }) => trigram))
		if (typeof mecbos !== "string") setMecbos(mecbos.map(({ trigram }) => trigram))
		if (typeof navs !== "string") setNavs(navs.map(({ trigram }) => trigram))
		if (typeof radios !== "string") setRadios(radios.map(({ trigram }) => trigram))
		if (typeof techs !== "string") setTechs(techs.map(({ trigram }) => trigram))
	}, [])
	const dateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setDepartureDate({
			value: e.target.value,
			validity: dateIsCorrect(e.target.value),
			disabled: false,
		})
		const alert = await postFetchRequest(alertDateFinder, { departureDate: e.target.value })
		if (alert !== null) {
			setInfo({ value: "Il y a déjà une alerte à cette date", color: "danger" })
			props.setDepartureDate({
				value: e.target.value,
				validity: false,
				disabled: false,
			})
		} else setInfo({ value: "", color: "" })
	}
	return (
		<fieldset className='p-2 col-md-6  card-body-color rounded'>
			<Legend title='Alerte' />
			<div className='row form-group m-1'>
				<Label title='Date :' size={4} />
				<PasswordInput
					type='date'
					password={props.departureDate}
					info={info}
					handleChange={(e) => dateChange(e)}
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
