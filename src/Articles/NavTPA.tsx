import React from "react"
import { Label } from "../BasicComponents/Label"
import { Switch } from "../BasicComponents/Switch"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { denaeTPAProps } from "../types/Articles"
import { denaeTPA } from "../types/Objects"

export const NavTPA = (props: denaeTPAProps): JSX.Element => {
	const handleSwitchChange = (TPA: { name: string; value: boolean }) => {
		const newControls: Array<denaeTPA> = []
		props.denaeTPAs.forEach((denaeTPA) => {
			if (props.denaeTPAs.indexOf(denaeTPA) !== props.index) newControls.push(denaeTPA)
			else {
				newControls.push({
					name: denaeTPA.name,
					TPA: {
						PGPS: { name: denaeTPA.TPA.PGPS.name, value: !TPA.value },
						appRDR: denaeTPA.TPA.appRDR,
					},
				})
			}
		})
		props.setDenaeTPA(newControls)
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newControls: Array<denaeTPA> = []
		props.denaeTPAs.forEach((denaeTPA) => {
			if (props.denaeTPAs.indexOf(denaeTPA) !== props.index) newControls.push(denaeTPA)
			else {
				newControls.push({
					name: denaeTPA.name,
					TPA: {
						PGPS: denaeTPA.TPA.PGPS,
						appRDR: { name: denaeTPA.TPA.appRDR.name, value: e.target.value },
					},
				})
			}
		})
		props.setDenaeTPA(newControls)
	}
	return (
		<div className='row'>
			<Label title={props.denaeTPA.name} size={3} />
			<Switch control={props.denaeTPA.TPA.PGPS} size={2} handleChange={handleSwitchChange} />
			<div className='form-check form-switch col-md-4'>
				<div className='row'>
					<Label title={props.denaeTPA.TPA.appRDR.name} size={4} />
					<UnvalidateInput
						size={6}
						backgroundColor='dark'
						textColor='light'
						type='number'
						control={props.denaeTPA.TPA.appRDR}
						handleChange={handleInputChange}
					/>
				</div>
			</div>
		</div>
	)
}
