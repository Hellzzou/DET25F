import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { MecboTPAProps } from "../types/Articles"

export const MecboTPA = (props: MecboTPAProps): JSX.Element => {
	const handleSwitchChange = (TPA: { name: string; value: boolean }) => {
		const mecboTPAMod = props.mecboTPAs.map((mecboTPA) => {
			if (mecboTPA !== props.mecboTPA) return mecboTPA
			else
				return {
					name: mecboTPA.name,
					TPA: {
						LCS: TPA.name === "LCS" ? { name: "LCS", value: !TPA.value } : mecboTPA.TPA.LCS,
						PH: mecboTPA.TPA.PH,
						TRP: TPA.name === "Trappe manu" ? { name: "Trappe manu", value: !TPA.value } : mecboTPA.TPA.TRP,
					},
				}
		})
		props.setMecboTPA(mecboTPAMod)
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const mecboTPAMod = props.mecboTPAs.map((mecboTPA) => {
			if (mecboTPA !== props.mecboTPA) return mecboTPA
			else
				return {
					name: mecboTPA.name,
					TPA: {
						LCS: mecboTPA.TPA.LCS,
						PH: { name: mecboTPA.TPA.PH.name, value: e.target.value },
						TRP: mecboTPA.TPA.TRP,
					},
				}
		})
		props.setMecboTPA(mecboTPAMod)
	}
	return (
		<div className='row'>
			<Label title={props.mecboTPA.name} size={3} />
			<Switch size={2} control={props.mecboTPA.TPA.LCS} handleChange={handleSwitchChange} />
			<div className='form-check form-switch col-md-4'>
				<div className='row'>
					<Label title={props.mecboTPA.TPA.PH.name} size={4} />
					<UnvalidateInput
						size={6}
						backgroundColor='dark'
						textColor='light'
						type='number'
						control={props.mecboTPA.TPA.PH}
						handleChange={handleInputChange}
					/>
				</div>
			</div>
			<Switch size={2} control={props.mecboTPA.TPA.TRP} handleChange={handleSwitchChange} />
		</div>
	)
}
