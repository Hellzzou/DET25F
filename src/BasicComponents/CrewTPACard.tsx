import React from "react"
import { getAnnual, getQuadri } from "../tools/colorManager"
import { CrewTPACardProps } from "../types/BasicComponents"

export const CrewTPACard = (props: CrewTPACardProps): JSX.Element => {
	return (
		<>
			<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Equipage</h6>
			<div className='row'>
				<div className='col-md-6 text-start'>TMA HD:</div>
				<div className={`col-md-6 text-right  text-${getAnnual(props.member.TPA.TMAHD[0], props.date)}`}>
					{props.member.TPA.TMAHD[0].toLocaleDateString()}
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 text-start'>TMA HD:</div>
				<div className={`col-md-6 text-right  text-${getAnnual(props.member.TPA.TMAHD[1], props.date)}`}>
					{props.member.TPA.TMAHD[1].toLocaleDateString()}
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 text-start'>Coop Bat:</div>
				<div className={`col-md-6 text-right  text-${getAnnual(props.member.TPA.COOPBAT, props.date)}`}>
					{props.member.TPA.COOPBAT.toLocaleDateString()}
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 text-start'>SECMAR:</div>
				<div className={`col-md-6 text-right  text-${getAnnual(props.member.TPA.SAR, props.date)}`}>
					{props.member.TPA.SAR.toLocaleDateString()}
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 text-start'>Ditching:</div>
				<div className={`col-md-6 text-right  text-${getQuadri(props.member.TPA.DITCHING, props.date)}`}>
					{props.member.TPA.DITCHING.toLocaleDateString()}
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 text-start'>SIMAR:</div>
				<div className={`col-md-6 text-right  text-${getQuadri(props.member.TPA.SIMAR, props.date)}`}>
					{props.member.TPA.SIMAR.toLocaleDateString()}
				</div>
			</div>
		</>
	)
}
