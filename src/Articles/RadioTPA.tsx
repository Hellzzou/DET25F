import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { radioTPAProps } from "../types/Articles"
import { radioTPA } from "../types/Objects"

export const RadioTPA = (props: radioTPAProps): JSX.Element => {
	const handleChange = (TPA: { name: string; value: boolean | string }) => {
		const newControls: Array<radioTPA> = []
		props.radioTPAs.forEach((radioTPA) => {
			if (props.radioTPAs.indexOf(radioTPA) !== props.index) newControls.push(radioTPA)
			else {
				const tempControl: radioTPA = {
					name: radioTPA.name,
					TPA: {
						IMINT: {
							name: "dossier IMINT",
							value: TPA.name === "dossier IMINT" ? !TPA.value : radioTPA.TPA.IMINT.value,
						},
					},
				}
				newControls.push(tempControl)
			}
			props.setRadioTPa(newControls)
		})
	}

	return (
		<div className='row'>
			<Label title={props.radioTPA.name} size={3} />
			<Switch control={props.radioTPA.TPA.IMINT} size={2} handleChange={handleChange} />
		</div>
	)
}
