import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { memberURL } from "../Datas/datas"
import { EQADurations } from "../Datas/EQADurations"
import { buildPilotEQAPurcentage } from "../tools/buildsPilotsActions"
import { getDone, getDurationsValidity, getMonthly, getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { pilotEQAMiniCArdProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const PilotEQAMiniCArd = (props: pilotEQAMiniCArdProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	const [purcentage, setPurcentage] = useState({ value: "", color: "dark" })
	useAsyncEffect(async () => {
		const members = await getFetchRequest<crewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.pilot.name)
			if (member) sertFullName(member)
		}
		const purcentage = buildPilotEQAPurcentage(props.pilot.EQA, props.date)
		setPurcentage({
			value: purcentage + " %",
			color: purcentage < 66 ? (purcentage < 50 ? "danger" : "warning") : "success",
		})
	}, [])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<div className='row my-0'>
					<h5 className='col-md-9 text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
					<h5 className={`col-md-3 text-${purcentage.color} text-center py-0`}>{`${purcentage.value}`}</h5>
				</div>
				<hr className='m-2'></hr>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT JOUR : </div>
					<div className={`col-md-6 text-end text-${getMonthly(props.pilot.EQA.ATTJ[0], props.date)}`}>
						{props.pilot.EQA.ATTJ[0].toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT JOUR : </div>
					<div className={`col-md-6 text-end  text-${getMonthly(props.pilot.EQA.ATTJ[1], props.date)}`}>
						{props.pilot.EQA.ATTJ[1].toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT N-1 : </div>
					<div className={`col-md-6 text-end text-${getMonthly(props.pilot.EQA.ATTN1, props.date)}`}>
						{props.pilot.EQA.ATTN1.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>ATT NUIT : </div>
					<div className={`col-md-6 text-end text-${getMonthly(props.pilot.EQA.ATTN, props.date)}`}>
						{props.pilot.EQA.ATTN.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>AMV PA DV : </div>
					<div className={`col-md-6 text-end text-${getMonthly(props.pilot.EQA.AMVPADV, props.date)}`}>
						{props.pilot.EQA.AMVPADV.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>AMV MANU : </div>
					<div className={`col-md-6 text-end text-${getMonthly(props.pilot.EQA.AMVM, props.date)}`}>
						{props.pilot.EQA.AMVM.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>AMV NUIT : </div>
					<div className={`col-md-6 text-end  text-${getMonthly(props.pilot.EQA.AMVN, props.date)}`}>
						{props.pilot.EQA.AMVN.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>BA NUIT : </div>
					<div
						className={`col-md-6 text-end text-${getDurationsValidity(
							props.pilot.EQA.BAN,
							EQADurations.BAN
						)}`}>
						{props.pilot.EQA.BAN.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>STAND : </div>
					<div className={`col-md-6 text-end text-${getQuadri(props.pilot.EQA.STAND, props.date)}`}>
						{props.pilot.EQA.STAND.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>EXT / RALL GTR : </div>
					<div className={`col-md-6 text-end text-${getDone(props.pilot.EQA.ERGTR)}`}>
						{props.pilot.EQA.ERGTR.toLocaleDateString()}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV 12mois : </div>
					<div className={"col-md-6 text-end "}>{props.pilot.EQA.lastYear.toFixed(1)}</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV 4 mois J+N : </div>
					<div
						className={`col-md-6 text-end text-${getDurationsValidity(
							props.pilot.EQA.fourMonths,
							EQADurations.fourMonths
						)}`}>
						{props.pilot.EQA.fourMonths.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV 4 mois N : </div>
					<div
						className={`col-md-6 text-end text-${getDurationsValidity(
							props.pilot.EQA.fourMonthsNight,
							EQADurations.fourMonthsNight
						)}`}>
						{props.pilot.EQA.fourMonthsNight.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6 text-start'>HDV mois J+N : </div>
					<div className={"col-md-6 text-end "}>{props.pilot.EQA.lastMonth.toFixed(1)}</div>
				</div>
			</div>
		</div>
	)
}
