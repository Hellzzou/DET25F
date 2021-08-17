import React from "react"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { dateIsCorrect, selectChoiceIsDone } from "../tools/validators"
import { alertFieldsetProps } from "../types/Sections"

export const AlertFieldset = (props: alertFieldsetProps): JSX.Element => {
	const CDA = ["PRS", "BCN"]
	const pilots = ["FNT", "SMT"]
	const members = ["LMR", "SMN", "BGN", "TRD", "PNL", "FMK", "MST", "AMD"]
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
					options={CDA}
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
					options={members}
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
					options={members}
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
					options={members}
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
					options={members}
					validator={selectChoiceIsDone}
				/>
			</div>
		</fieldset>
	)
}
