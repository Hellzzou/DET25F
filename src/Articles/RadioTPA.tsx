import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { radioTPAProps } from "../types/Articles"

export const RadioTPA = (props: radioTPAProps): JSX.Element => {
	const handleSwitchChange = (TPA: { name: string; value: boolean | string }) => {
		const radioTPAMod = props.radioTPAs.map((radioTPA) => {
			if (radioTPA !== props.radioTPA) return radioTPA
			else
				return {
					name: radioTPA.name,
					TPA: {
						IMINT: {
							name: radioTPA.TPA.IMINT.name,
							value: !TPA.value,
						},
						entCodage: radioTPA.TPA.entCodage,
					},
				}
		})
		props.setRadioTPa(radioTPAMod)
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const radioTPAMod = props.radioTPAs.map((radioTPA) => {
			if (radioTPA !== props.radioTPA) return radioTPA
			else
				return {
					name: radioTPA.name,
					TPA: {
						IMINT: radioTPA.TPA.IMINT,
						entCodage: {
							name: radioTPA.TPA.entCodage.name,
							value: e.target.value,
						},
					},
				}
		})
		props.setRadioTPa(radioTPAMod)
	}
	return (
		<div className='row'>
			<Label title={props.radioTPA.name} size={3} />
			<Switch control={props.radioTPA.TPA.IMINT} size={2} handleChange={handleSwitchChange} />
			<div className='form-check form-switch col-md-4'>
				<div className='row'>
					<Label title={props.radioTPA.TPA.entCodage.name} size={4} />
					<UnvalidateInput
						size={6}
						backgroundColor='dark'
						textColor='light'
						type='number'
						control={props.radioTPA.TPA.entCodage}
						handleChange={handleInputChange}
					/>
				</div>
			</div>
		</div>
	)
}
