import React from "react"
import { Switch } from "../BasicComponents/Switch"
import { crewTPAProps } from "../types/Articles"

export const CrewTPA = (props: crewTPAProps): JSX.Element => {
	const handleChange = (TPA: { name: string; value: boolean }) => {
		props.setCrewTPA({
			TMAHD: { name: "TMA HD", value: TPA.name === "TMA HD" ? !TPA.value : props.crewTPA.TMAHD.value },
			COOPBAT: { name: "coop BAT", value: TPA.name === "coop BAT" ? !TPA.value : props.crewTPA.COOPBAT.value },
			SAR: { name: "SAR/SECMAR", value: TPA.name === "SAR/SECMAR" ? !TPA.value : props.crewTPA.SAR.value },
			DITCHING: { name: "Ditching", value: TPA.name === "Ditching" ? !TPA.value : props.crewTPA.DITCHING.value },
			SIMAR: { name: "SIMAR", value: TPA.name === "SIMAR" ? !TPA.value : props.crewTPA.SIMAR.value },
		})
	}
	return (
		<div className='row justify-content-center'>
			<Switch control={props.crewTPA.TMAHD} size={2} handleChange={handleChange} />
			<Switch control={props.crewTPA.COOPBAT} size={2} handleChange={handleChange} />
			<Switch control={props.crewTPA.SAR} size={2} handleChange={handleChange} />
			<Switch control={props.crewTPA.DITCHING} size={2} handleChange={handleChange} />
			<Switch control={props.crewTPA.SIMAR} size={2} handleChange={handleChange} />
		</div>
	)
}
