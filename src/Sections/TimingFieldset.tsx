import React from "react"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { dateIsCorrect, timeIsCorrect } from "../tools/validators"
import { timingFieldsetProps } from "../types/Sections"
import sun from "../images/sun.png"
import moon from "../images/moon.png"

export const TimingFieldset = (props: timingFieldsetProps): JSX.Element => {
	return (
		<fieldset className='bg-light rounded py-1'>
			<legend className='row text-center'>
				<div className='text-success col-md-4'>
					<img src={sun} className='d-inline mx-1 align-middle' />
					{typeof props.jAero !== "undefined" ? props.jAero : ""}
				</div>
				<div className='col-md-4'>Toutes heures en locales</div>
				<div className='col-md-4 text-danger'>
					<img src={moon} className='d-inline mx-1 align-middle' />
					{typeof props.nAero !== "undefined" ? props.nAero : ""}
				</div>
			</legend>
			<div className='form-group row m-1'>
				<Label size={4} title='Date/heure de début :' />
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					type='date'
					min={0}
					max={0}
					control={props.startDate}
					setControl={props.setStartDate}
					validator={dateIsCorrect}
				/>
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					type='time'
					min={0}
					max={0}
					control={props.startTime}
					setControl={props.setStartTime}
					validator={timeIsCorrect}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label size={4} title='Date/heure de fin :' />
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					type='date'
					min={0}
					max={0}
					control={props.endDate}
					setControl={props.setEndDate}
					validator={dateIsCorrect}
				/>
				<Input
					size={4}
					backgroundColor='dark'
					textColor='white'
					type='time'
					min={0}
					max={0}
					control={props.endTime}
					setControl={props.setEndTime}
					validator={timeIsCorrect}
				/>
			</div>
		</fieldset>
	)
}
