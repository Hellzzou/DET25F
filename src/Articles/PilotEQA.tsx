import React from "react"
import { Label } from "../BasicComponents/Label"
import { PilotEQAProps } from "../types/Articles"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { Switch } from "../BasicComponents/Switch"
import { returnZeroOrValue } from "../tools/maths"

export const PilotEQA = (props: PilotEQAProps): JSX.Element => {
	const handleSwitchChange = (TPA: { name: string; value: boolean }) => {
		const pilotEQAMod = props.pilotEQAs.map((pilotEQA) => {
			if (pilotEQA !== props.pilotEQA) return pilotEQA
			else {
				return {
					name: pilotEQA.name,
					EQA: {
						PILJ: pilotEQA.EQA.PILJ,
						PILN: pilotEQA.EQA.PILN,
						ATTJ: pilotEQA.EQA.ATTJ,
						BAN: pilotEQA.EQA.BAN,
						ATTN1: TPA.name === "att n-1" ? { name: "att n-1", value: !TPA.value } : pilotEQA.EQA.ATTN1,
						ATTN: TPA.name === "att nuit" ? { name: "att nuit", value: !TPA.value } : pilotEQA.EQA.ATTN,
						AMVPADV:
							TPA.name === "AMV PA DV jour"
								? { name: "AMV PA DV jour", value: !TPA.value }
								: pilotEQA.EQA.AMVPADV,
						AMVM: TPA.name === "AMV manu" ? { name: "AMV manu", value: !TPA.value } : pilotEQA.EQA.AMVM,
						AMVN: TPA.name === "AMV nuit" ? { name: "AMV nuit", value: !TPA.value } : pilotEQA.EQA.AMVN,
						STAND: TPA.name === "stand" ? { name: "stand", value: !TPA.value } : pilotEQA.EQA.STAND,
						ERGTR:
							TPA.name === "EXT/RAL GTR"
								? { name: "EXT/RAL GTR", value: !TPA.value }
								: pilotEQA.EQA.ERGTR,
					},
				}
			}
		})
		props.setPilotEQA(pilotEQAMod)
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, TPA: { name: string; value: string }) => {
		let day = 0
		let night = 0
		if (props.pilotEQAs.length > 0) {
			if (TPA.name === "pil jour") {
				day = props.pilotEQAs.reduce((acc, pilotEQA) => {
					if (pilotEQA !== props.pilotEQA) acc += returnZeroOrValue(pilotEQA.EQA.PILJ.value)
					return acc
				}, 0)
				day += returnZeroOrValue(e.target.value)
			} else
				day = props.pilotEQAs
					.map((eqa) => returnZeroOrValue(eqa.EQA.PILJ.value))
					.reduce((previous, current) => previous + current)
			if (TPA.name === "pil nuit") {
				night = props.pilotEQAs.reduce((acc, pilotEQA) => {
					if (pilotEQA !== props.pilotEQA) acc += returnZeroOrValue(pilotEQA.EQA.PILN.value)
					return acc
				}, 0)
				night += returnZeroOrValue(e.target.value)
			} else
				night = props.pilotEQAs
					.map((eqa) => returnZeroOrValue(eqa.EQA.PILN.value))
					.reduce((previous, current) => previous + current)
		}
		props.setDayDuration({
			value: props.dayDuration.value,
			validity: 2 * parseFloat(props.dayDuration.value) === day,
			disabled: false,
		})
		props.setNightDuration({
			value: props.nightDuration.value,
			validity: 2 * parseFloat(props.nightDuration.value) === night,
			disabled: false,
		})
		const pilotEQAMod = props.pilotEQAs.map((pilotEQA) => {
			if (pilotEQA !== props.pilotEQA) return pilotEQA
			else {
				return {
					name: pilotEQA.name,
					EQA: {
						PILJ:
							TPA.name === "pil jour"
								? { name: "pil jour", value: e.target.value, validity: pilotEQA.EQA.PILJ.validity }
								: pilotEQA.EQA.PILJ,
						PILN:
							TPA.name === "pil nuit"
								? { name: "pil nuit", value: e.target.value, validity: pilotEQA.EQA.PILN.validity }
								: pilotEQA.EQA.PILN,
						ATTJ: TPA.name === "att jour" ? { name: "att jour", value: e.target.value } : pilotEQA.EQA.ATTJ,
						BAN: TPA.name === "ba nuit" ? { name: "ba nuit", value: e.target.value } : pilotEQA.EQA.BAN,
						ATTN1: pilotEQA.EQA.ATTN1,
						ATTN: pilotEQA.EQA.ATTN,
						AMVPADV: pilotEQA.EQA.AMVPADV,
						AMVM: pilotEQA.EQA.AMVM,
						AMVN: pilotEQA.EQA.AMVN,
						STAND: pilotEQA.EQA.STAND,
						ERGTR: pilotEQA.EQA.ERGTR,
					},
				}
			}
		})
		props.setPilotEQA(
			pilotEQAMod.map((eqa) => {
				return {
					name: eqa.name,
					EQA: {
						PILJ: {
							name: "pil jour",
							value: eqa.EQA.PILJ.value,
							validity: 2 * parseFloat(props.dayDuration.value) === day,
						},
						PILN: {
							name: "pil nuit",
							value: eqa.EQA.PILN.value,
							validity: 2 * parseFloat(props.nightDuration.value) === night,
						},
						ATTJ: { name: "att jour", value: eqa.EQA.ATTJ.value },
						BAN: { name: "ba nuit", value: eqa.EQA.BAN.value },
						ATTN1: { name: "att n-1", value: eqa.EQA.ATTN1.value },
						ATTN: { name: "att nuit", value: eqa.EQA.ATTN.value },
						AMVPADV: { name: "AMV PA DV jour", value: eqa.EQA.AMVPADV.value },
						AMVM: { name: "AMV manu", value: eqa.EQA.AMVM.value },
						AMVN: { name: "AMV nuit", value: eqa.EQA.AMVN.value },
						STAND: { name: "stand", value: eqa.EQA.STAND.value },
						ERGTR: { name: "EXT/RAL GTR", value: eqa.EQA.ERGTR.value },
					},
				}
			})
		)
	}
	return (
		<div className='row border rounded border-dark m-1 p-1'>
			<Label title={props.pilotEQA.name} size={1} />
			<div className='col-md-11'>
				<div className='row'>
					<div className='form-check form-switch col-md-3'>
						<div className='row'>
							<Label title='Pil jour' size={5} />
							<UnvalidateInput
								size={7}
								backgroundColor='dark'
								textColor='light'
								type='number'
								control={props.pilotEQA.EQA.PILJ}
								handleChange={handleInputChange}
							/>
						</div>
					</div>
					<div className='form-check form-switch col-md-3'>
						<div className='row'>
							<Label title='Pil nuit' size={6} />
							<UnvalidateInput
								size={6}
								backgroundColor='dark'
								textColor='light'
								type='number'
								control={props.pilotEQA.EQA.PILN}
								handleChange={handleInputChange}
							/>
						</div>
					</div>
					<div className='form-check form-switch col-md-3'>
						<div className='row'>
							<Label title='Att jour' size={6} />
							<UnvalidateInput
								size={6}
								backgroundColor='dark'
								textColor='light'
								type='number'
								control={props.pilotEQA.EQA.ATTJ}
								handleChange={handleInputChange}
							/>
						</div>
					</div>
					<div className='form-check form-switch col-md-3'>
						<div className='row'>
							<Label title='BA nuit' size={6} />
							<UnvalidateInput
								size={6}
								backgroundColor='dark'
								textColor='light'
								type='number'
								control={props.pilotEQA.EQA.BAN}
								handleChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<Switch control={props.pilotEQA.EQA.ATTN1} size={3} handleChange={handleSwitchChange} />
					<Switch control={props.pilotEQA.EQA.ATTN} size={3} handleChange={handleSwitchChange} />
					<Switch control={props.pilotEQA.EQA.AMVPADV} size={3} handleChange={handleSwitchChange} />
					<Switch control={props.pilotEQA.EQA.AMVM} size={3} handleChange={handleSwitchChange} />
					<Switch control={props.pilotEQA.EQA.AMVN} size={3} handleChange={handleSwitchChange} />
					<Switch control={props.pilotEQA.EQA.STAND} size={3} handleChange={handleSwitchChange} />
					<Switch control={props.pilotEQA.EQA.ERGTR} size={3} handleChange={handleSwitchChange} />
				</div>
			</div>
		</div>
	)
}
