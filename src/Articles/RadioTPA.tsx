import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { radioTPAProps } from "../types/Articles"

export const RadioTPA = (props: radioTPAProps): JSX.Element => {
	const handleChange = (TPA: { name: string; value: boolean | string }) => {
		const radioTPAMod = props.radioTPAs.map((radioTPA) => {
			if (radioTPA !== props.radioTPA) return radioTPA
			else
				return {
					name: radioTPA.name,
					TPA: {
						IMINT: {
							name: "dossier IMINT",
							value: TPA.name === "dossier IMINT" ? !TPA.value : radioTPA.TPA.IMINT.value,
						},
					},
				}
		})
		props.setRadioTPa(radioTPAMod)
	}

	return (
		<div className='row'>
			<Label title={props.radioTPA.name} size={3} />
			<Switch control={props.radioTPA.TPA.IMINT} size={2} handleChange={handleChange} />
		</div>
	)
}
