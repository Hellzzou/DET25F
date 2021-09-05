import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { Select } from "../BasicComponents/Select"
import { DB_URL } from "../Datas/datas"
import { getFetchRequest } from "../tools/fetch"
import { getName, getNumber } from "../tools/tools"
import { selectChoiceIsDone } from "../tools/validators"
import { crewMember, Group } from "../types/Objects"
import { FlightFiltersProps } from "../types/Sections"

export const FlightFilters = (props: FlightFiltersProps): JSX.Element => {
	const [aircraft, setAircraft] = useState<Array<string>>([])
	const [type, setType] = useState<Array<string>>([])
	const [areas, setAreas] = useState<Array<string>>([])
	const [NCAreas, setNCAreas] = useState<Array<string>>([])
	const [crews, setCrews] = useState<Array<string>>([])
	const [groups, setGroups] = useState<Array<string>>([])
	const belonging = ["DET25F", "HORS DET"]
	const done = ["ME", "MPE TECH", "MPE MTO", "MPE OPS", "CNL TECH", "CNL MTO", "CNL OPS"]
	const time = ["Jour", "Nuit"]
	useAsyncEffect(async () => {
		const allMembers = await getFetchRequest(DB_URL + "crewMembers")
		setCrews(allMembers.map((member: crewMember) => member.crew).filter(Boolean))
		const allGroups = await getFetchRequest(DB_URL + "groups")
		setGroups(allGroups.map((group: Group) => group.underGroup))
		const aircraft = await getFetchRequest(DB_URL + "aircraft")
		setAircraft(getNumber(aircraft))
		const types = await getFetchRequest(DB_URL + "type")
		setType(getName(types))
		const areas = await getFetchRequest(DB_URL + "area")
		setAreas(getName(areas))
		const NCAreas = await getFetchRequest(DB_URL + "NCArea")
		setNCAreas(getName(NCAreas))
	}, [])
	return (
		<>
			<div className='border rounded border-dark p-2 mx-1'>
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
