import React from "react"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { aircraftURL, areaURL, configURL, fuelURL, groupURL, NCAreaURL, typeURL } from "../Datas/urls"
import { getFetchRequest } from "../tools/fetch"
import { selectChoiceIsDone, textIsNotNull } from "../tools/validators"
import { Aircraft, Area, Config, FlightType, Fuel, Group, NCArea } from "../types/Objects"
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
		const fuels = await getFetchRequest<Fuel[]>(fuelURL)
		if (typeof fuels !== "string") setFuel(fuels.map(({ quantity }) => quantity))
		const aircraft = await getFetchRequest<Aircraft[]>(aircraftURL)
		if (typeof aircraft !== "string") setAircraft(aircraft.map(({ number }) => number))
		const types = await getFetchRequest<FlightType[]>(typeURL)
		if (typeof types !== "string") setType(types.map(({ name }) => name))
		const areas = await getFetchRequest<Area[]>(areaURL)
		if (typeof areas !== "string") setAreas(areas.map(({ name }) => name))
		const NCAreas = await getFetchRequest<NCArea[]>(NCAreaURL)
		if (typeof NCAreas !== "string") setNCAreas(NCAreas.map(({ name }) => name))
		const configs = await getFetchRequest<Config[]>(configURL)
		if (typeof configs !== "string") setConfig(configs.map(({ name }) => name))
		const allGroups = await getFetchRequest<Group[]>(groupURL)
		if (typeof allGroups !== "string") setGroups(allGroups.map(({ underGroup }) => underGroup))
	}, [])
	return (
		<fieldset className=' card-body-color rounded py-1'>
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
