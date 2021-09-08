import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { DB_URL } from "../Datas/datas"
import { getFetchRequest } from "../tools/fetch"
import { getName, getNumber, getQuantity } from "../tools/tools"
import { selectChoiceIsDone, textIsNotNull } from "../tools/validators"
import { Group } from "../types/Objects"
import { missionFieldsetProps } from "../types/Sections"

export const MissionFieldset = (props: missionFieldsetProps): JSX.Element => {
	const [aircraft, setAircraft] = useState<Array<string>>([])
	const [fuel, setFuel] = useState<Array<string>>([])
	const [type, setType] = useState<Array<string>>([])
	const [areas, setAreas] = useState<Array<string>>([])
	const [NCAreas, setNCAreas] = useState<Array<string>>([])
	const [groups, setGroups] = useState<Array<string>>([])
	const belongings = ["DET25F", "HORS DET25F"]
	const [config, setConfig] = useState<Array<string>>([])
	useAsyncEffect(async () => {
		const fuels = await getFetchRequest(DB_URL + "fuel")
		setFuel(getQuantity(fuels))
		const aircraft = await getFetchRequest(DB_URL + "aircraft")
		setAircraft(getNumber(aircraft))
		const types = await getFetchRequest(DB_URL + "type")
		setType(getName(types))
		const areas = await getFetchRequest(DB_URL + "area")
		setAreas(getName(areas))
		const NCAreas = await getFetchRequest(DB_URL + "NCArea")
		setNCAreas(getName(NCAreas))
		const configs = await getFetchRequest(DB_URL + "config")
		setConfig(getName(configs))
		const allGroups = await getFetchRequest(DB_URL + "groups")
		setGroups(allGroups.map((group: Group) => group.underGroup))
	}, [])
	return (
		<fieldset className='bg-light rounded py-1'>
			<Legend title='Mission' />
			<div className='row form-group m-1'>
				<Label title='Avion/pleins/config :' size={4} />
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.aircraft}
					setControl={props.setAircraft}
					options={aircraft}
					validator={selectChoiceIsDone}
				/>
				<Select
					size={2}
					backgroundColor='dark'
					textColor='white'
					control={props.fuel}
					setControl={props.setFuel}
					options={fuel}
					validator={selectChoiceIsDone}
				/>
				<Select
					size={2}
					backgroundColor='dark'
					textColor='white'
					control={props.config}
					setControl={props.setConfig}
					options={config}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Type/intitulé :' size={4} />
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.type}
					setControl={props.setType}
					options={type}
					validator={selectChoiceIsDone}
				/>
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.mission}
					setControl={props.setMission}
					validator={textIsNotNull}
					type='text'
					min={0}
					max={0}
					placeholder='mission...'
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Zone :' size={4} />
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.area}
					setControl={props.setArea}
					options={areas}
					validator={selectChoiceIsDone}
				/>
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.NCArea}
					setControl={props.setNCArea}
					options={NCAreas}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='row form-group m-1'>
				<Label title='Groupe :' size={4} />
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.group}
					setControl={props.setGroup}
					options={groups}
					validator={selectChoiceIsDone}
				/>
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.belonging}
					setControl={props.setBelonging}
					options={belongings}
					validator={selectChoiceIsDone}
				/>
			</div>
		</fieldset>
	)
}
