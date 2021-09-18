import React, { useEffect } from "react"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { manageCNL } from "../tools/formManager"
import { selectChoiceIsDone, timeIsCorrect } from "../tools/validators"
import { debriefTimingFieldsetProps } from "../types/Sections"

export const DebriefTimingFieldset = (props: debriefTimingFieldsetProps): JSX.Element => {
	const done = ["ME", "MPE", "CNL"]
	const cause = ["MTO", "TECH", "OPS"]
	useEffect(() => {
		manageCNL(
			props.done.value,
			props.cause,
			props.setCause,
			props.onDayDuration,
			props.setOnDayDuration,
			props.onNightDuration,
			props.setOnNightDuration
		)
	}, [props.done.value])
	return (
		<fieldset className=' card-body-color rounded py-1'>
			<Legend title='Debriefing' />
			<div className='form-group row m-1'>
				<Label size={4} title='Effectuée/Cause :' />
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.done}
					setControl={props.setDone}
					options={done}
					validator={selectChoiceIsDone}
				/>
				<Select
					size={4}
					backgroundColor='dark'
					textColor='white'
					control={props.cause}
					setControl={props.setCause}
					options={cause}
					validator={selectChoiceIsDone}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label size={4} title='Heures ON / OFF :' />
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					type='time'
					min={0}
					max={6}
					control={props.onDayDuration}
					setControl={props.setOnDayDuration}
					validator={timeIsCorrect}
				/>
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					type='time'
					min={0}
					max={6}
					control={props.onNightDuration}
					setControl={props.setOnNightDuration}
					validator={timeIsCorrect}
				/>
			</div>
		</fieldset>
	)
}
