import React from "react"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { TextArea } from "../BasicComponents/TextArea"
import { UnvalidateSelect } from "../BasicComponents/UnvalidateSelect"
import { selectChoiceIsDone, textIsNotNull } from "../tools/validators"
import { CrewFieldsetProps } from "../types/Sections"

export const CrewFieldset = (props: CrewFieldsetProps): JSX.Element => {
	return (
		<fieldset className=' card-body-color rounded p-1'>
			<Legend title='Equipage' />
			<div className='form-group row m-1'>
				<Label size={4} title='CDA/pilote :' />
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.chief}
					setControl={props.setChief}
					options={props.CDAList}
					validator={selectChoiceIsDone}
				/>
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.pilot}
					setControl={props.setPilot}
					options={props.pilotList}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label size={4} title='' />
				<UnvalidateSelect
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.addMemberSelect}
					setControl={props.setAddMemberSelect}
					options={props.addableCrewMembers.sort()}
					validator={selectChoiceIsDone}
				/>
				<Button
					size={4}
					buttonContent="Ajouter un membre d'équipage"
					buttonColor='primary'
					onClick={props.addCrewMember}
					disabled={!props.addMemberSelect.validity}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label size={4} title="Membres d'équipage" />
				<TextArea
					size={8}
					backgroundColor='dark'
					textColor='white'
					control={props.crewMembers}
					setControl={props.setCrewMembers}
					validator={textIsNotNull}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label size={4} title='' />
				<UnvalidateSelect
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.deleteMemberSelect}
					setControl={props.setDeleteMemberSelect}
					options={props.crewMembers.value}
					validator={selectChoiceIsDone}
				/>
				<Button
					size={4}
					buttonContent="Retirer un membre d'équipage"
					buttonColor='danger'
					onClick={props.deleteCrewMember}
					disabled={!props.deleteMemberSelect.validity}
				/>
			</div>
		</fieldset>
	)
}
