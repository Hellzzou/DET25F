import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { pilotTPAProps } from "../types/Articles"

export const PilotTPA = (props: pilotTPAProps): JSX.Element => {
	const handleChange = (TPA: { name: string; value: boolean }) => {
		const pilotTPAMod = props.pilotTPAs.map((pilotTPA) => {
			if (pilotTPA !== props.pilotTPA) return pilotTPA
			else {
				return {
					name: pilotTPA.name,
					TPA: {
						ATTPC: { name: "ATT PC", value: TPA.name === "ATT PC" ? !TPA.value : pilotTPA.TPA.ATTPC.value },
						IFR: { name: "IFR", value: TPA.name === "IFR" ? !TPA.value : pilotTPA.TPA.IFR.value },
						LCS: { name: "LCS", value: TPA.name === "LCS" ? !TPA.value : pilotTPA.TPA.LCS.value },
					},
				}
			}
		})
		props.setPilotTPA(pilotTPAMod)
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
