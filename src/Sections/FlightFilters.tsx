import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Select } from "../BasicComponents/Select"
import { aircraftURL, areaURL, groupURL, NCAreaURL, typeURL } from "../Datas/datas"
import { getFetchRequest } from "../tools/fetch"
import { selectChoiceIsDone } from "../tools/validators"
import { Aircraft, Area, FlightType, Group, NCArea } from "../types/Objects"
import { FlightFiltersProps } from "../types/Sections"
import { DateChoiceNavbar } from "./DateChoiceNavbar"

export const FlightFilters = (props: FlightFiltersProps): JSX.Element => {
	const [aircraft, setAircraft] = useState<Array<string>>([])
	const [type, setType] = useState<Array<string>>([])
	const [areas, setAreas] = useState<Array<string>>([])
	const [NCAreas, setNCAreas] = useState<Array<string>>([])
	const crews = ["YE", "YF"]
	const [groups, setGroups] = useState<Array<string>>([])
	const belonging = ["DET25F", "HORS DET"]
	const done = ["ME", "MPE TECH", "MPE MTO", "MPE OPS", "CNL TECH", "CNL MTO", "CNL OPS"]
	const time = ["Jour", "Nuit"]
	useAsyncEffect(async () => {
		const allGroups = await getFetchRequest<Group[]>(groupURL)
		if (typeof allGroups !== "string") setGroups(allGroups.map(({ underGroup }) => underGroup))
		const aircraft = await getFetchRequest<Aircraft[]>(aircraftURL)
		if (typeof aircraft !== "string") setAircraft(aircraft.map(({ number }) => number))
		const types = await getFetchRequest<FlightType[]>(typeURL)
		if (typeof types !== "string") setType(types.map(({ name }) => name))
		const areas = await getFetchRequest<Area[]>(areaURL)
		if (typeof areas !== "string") setAreas(areas.map(({ name }) => name))
		const NCAreas = await getFetchRequest<NCArea[]>(NCAreaURL)
		if (typeof NCAreas !== "string") setNCAreas(NCAreas.map(({ name }) => name))
	}, [])
	return (
		<>
			<div className='card-body-color rounded p-2 m-1'>
				<div className='text-center fw-bold fs-3 py-0'>Ajuster les filtres pour la recherche</div>
				<hr className='m-1'></hr>
				<DateChoiceNavbar
					startDate={props.startDate}
					setStartDate={props.setStartDate}
					endDate={props.endDate}
					setEndDate={props.setEndDate}
				/>
				<div className='row'>
					<div className='col-md-1 fw-bold text-center'>Avion</div>
					<div className='col-md-1 fw-bold text-center'>Equipage</div>
					<div className='col-md-2 fw-bold text-center'>Type</div>
					<div className='col-md-1 fw-bold text-center'>Groupe</div>
					<div className='col-md-1 fw-bold text-center'>Appartenance</div>
					<div className='col-md-2 fw-bold text-center'>Zone</div>
					<div className='col-md-2 fw-bold text-center'>Zone NC</div>
					<div className='col-md-1 fw-bold text-center'>Exécuté</div>
					<div className='col-md-1 fw-bold text-center'>Période</div>
				</div>
				<div className='row'>
					<div className='col-md-1'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.aircraft}
							setControl={props.setAircraft}
							options={aircraft}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-1'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.crew}
							setControl={props.setCrew}
							options={crews}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-2'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.type}
							setControl={props.setType}
							options={type}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-1'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.group}
							setControl={props.setGroup}
							options={groups}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-1'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.belonging}
							setControl={props.setBelonging}
							options={belonging}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-2'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.area}
							setControl={props.setArea}
							options={areas}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-2'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.NCArea}
							setControl={props.setNCArea}
							options={NCAreas}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-1'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.done}
							setControl={props.setDone}
							options={done}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='col-md-1'>
						<Select
							size={12}
							backgroundColor='dark'
							textColor='light'
							control={props.time}
							setControl={props.setTime}
							options={time}
							validator={selectChoiceIsDone}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
