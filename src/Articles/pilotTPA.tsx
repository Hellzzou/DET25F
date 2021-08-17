import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { pilotTPAProps } from "../types/Articles"
import { pilotTPA } from "../types/Objects"

export const PilotTPA = (props: pilotTPAProps): JSX.Element => {
	const handleChange = (TPA: { name: string; value: boolean }) => {
		const newControls: Array<pilotTPA> = []
		props.pilotTPAs.forEach((pilotTPA) => {
			if (props.pilotTPAs.indexOf(pilotTPA) !== props.index) newControls.push(pilotTPA)
			else {
				const tempControl: pilotTPA = {
					name: pilotTPA.name,
					TPA: {
						ATTPC: { name: "ATT PC", value: TPA.name === "ATT PC" ? !TPA.value : pilotTPA.TPA.ATTPC.value },
						IFR: { name: "IFR", value: TPA.name === "IFR" ? !TPA.value : pilotTPA.TPA.IFR.value },
						LCS: { name: "LCS", value: TPA.name === "LCS" ? !TPA.value : pilotTPA.TPA.LCS.value },
					},
				}
				newControls.push(tempControl)
			}
		})
		props.setPilotTPA(newControls)
	}
	return (
		<div className='row'>
			<Label title={props.pilotTPA.name} size={3} />
			<Switch control={props.pilotTPA.TPA.ATTPC} size={2} handleChange={handleChange} />
			<Switch control={props.pilotTPA.TPA.IFR} size={2} handleChange={handleChange} />
			<Switch control={props.pilotTPA.TPA.LCS} size={2} handleChange={handleChange} />
		</div>
	)
}
