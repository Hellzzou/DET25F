import React, { useState } from "react"
import { Card } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { DB_URL } from "../Datas/datas"
import { EQADurations } from "../Datas/EQADurations"
import { getDone, getDurationsValidity, getMonthly, getQuadri } from "../tools/date"
import { getFetchRequest } from "../tools/fetch"
import { pilotEQAMiniCArdProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const PilotEQAMiniCArd = (props: pilotEQAMiniCArdProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const members = await getFetchRequest(DB_URL + "crewMembers")
		sertFullName(members.find((member: crewMember) => member.trigram === props.pilot.name))
	}, [])
	return (
		<Card className='text-center'>
			<Card.Header className='p-1'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</Card.Header>
			<Card.Body className='p-2'>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT JOUR : </div>
					<div
						className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.ATTJ[0], props.date)}`}>
						{props.pilot.EQA.ATTJ[0].toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT JOUR : </div>
					<div
						className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.ATTJ[1], props.date)}`}>
						{props.pilot.EQA.ATTJ[1].toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT N-1 : </div>
					<div className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.ATTN1, props.date)}`}>
						{props.pilot.EQA.ATTN1.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT NUIT : </div>
					<div className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.ATTN, props.date)}`}>
						{props.pilot.EQA.ATTN.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>AMV PA DV : </div>
					<div
						className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.AMVPADV, props.date)}`}>
						{props.pilot.EQA.AMVPADV.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>AMV MANU : </div>
					<div className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.AMVM, props.date)}`}>
						{props.pilot.EQA.AMVM.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>AMV NUIT : </div>
					<div className={`col-md-6 text-end fw-bold text-${getMonthly(props.pilot.EQA.AMVN, props.date)}`}>
						{props.pilot.EQA.AMVN.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>BA NUIT : </div>
					<div
						className={`col-md-6 text-end fw-bold text-${getDurationsValidity(
							props.pilot.EQA.BAN,
							EQADurations.BAN
						)}`}>
						{props.pilot.EQA.BAN.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>STAND : </div>
					<div className={`col-md-6 text-end fw-bold text-${getQuadri(props.pilot.EQA.STAND, props.date)}`}>
						{props.pilot.EQA.STAND.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>EXT / RALL GTR : </div>
					<div className={`col-md-6 text-end fw-bold text-${getDone(props.pilot.EQA.ERGTR)}`}>
						{props.pilot.EQA.ERGTR.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV 12mois : </div>
					<div className={"col-md-6 text-end fw-bold"}>{props.pilot.EQA.lastYear.toFixed(1)}</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV 4 mois J+N : </div>
					<div
						className={`col-md-6 text-end fw-bold text-${getDurationsValidity(
							props.pilot.EQA.fourMonths,
							EQADurations.fourMonths
						)}`}>
						{props.pilot.EQA.fourMonths.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV 4 mois N : </div>
					<div
						className={`col-md-6 text-end fw-bold text-${getDurationsValidity(
							props.pilot.EQA.fourMonthsNight,
							EQADurations.fourMonthsNight
						)}`}>
						{props.pilot.EQA.fourMonthsNight.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV mois J+N : </div>
					<div className={"col-md-6 text-end fw-bold"}>{props.pilot.EQA.lastMonth.toFixed(1)}</div>
				</div>
			</Card.Body>
		</Card>
	)
}
