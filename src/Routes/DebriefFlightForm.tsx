import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { DB_URL } from "../Datas/datas"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import { INITIAL_CREWTPA } from "../Datas/TPA"
import { CrewFieldset } from "../Sections/CrewFieldset"
import { CrewTPAFieldset } from "../Sections/CrewTPAFieldset"
import { DebriefTimingFieldset } from "../Sections/DebriefTimingFieldset"
import { Header } from "../Sections/Header"
import { MissionFieldset } from "../Sections/MissionFieldset"
import { Navbar } from "../Sections/Navbar"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import {
	addTPA,
	changePilotsEQA,
	changePilotsTPA,
	fullfillFlightForm,
	manageAddableList,
	manageCrewMembers,
	manageDuration,
	manageNCAreas,
	removeCrewMembers,
	removeTPA,
} from "../tools/form"
import { buildDebriefedFlight, buildNewFlight } from "../tools/saveToDatabase"
import { getTrigrams, removeAnEntry, returnZeroOrValue } from "../tools/tools"
import { arrayIsNotEmpty, formValidity } from "../tools/validators"
import { controlArray, crewTPA, denaeTPA, mecboTPA, pilotEQA, pilotTPA, radioTPA } from "../types/Objects"

export const DebriefFlightForm = ({
	match,
}: RouteComponentProps<{ id: string; jAero: string; nAero: string }>): JSX.Element => {
	const history = useHistory()
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [dayDuration, setDayDuration] = useState({ value: 0, validity: true })
	const [nightDuration, setNightDuration] = useState({ value: 0, validity: true })
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_CONTROL)
	const [fuel, setFuel] = useState(INITIAL_FALSE_CONTROL)
	const [config, setConfig] = useState(INITIAL_FALSE_CONTROL)
	const [type, setType] = useState(INITIAL_FALSE_CONTROL)
	const [mission, setMission] = useState(INITIAL_FALSE_CONTROL)
	const [area, setArea] = useState(INITIAL_FALSE_CONTROL)
	const [NCArea, setNCArea] = useState(INITIAL_FALSE_CONTROL)
	const [group, setGroup] = useState(INITIAL_FALSE_CONTROL)
	const [belonging, setBelonging] = useState(INITIAL_FALSE_CONTROL)
	const [chief, setChief] = useState(INITIAL_FALSE_CONTROL)
	const [CDAlist, setCDAList] = useState<Array<string>>([])
	const [pilot, setPilot] = useState(INITIAL_FALSE_CONTROL)
	const [pilotList, setPilotList] = useState<Array<string>>([])
	const [addableCrewMembers, setAddableCrewMembers] = useState<Array<string>>([])
	const [crewMembers, setCrewMembers] = useState<controlArray>({ value: [], validity: false, disabled: false })
	const [deleteMemberSelect, setDeleteMemberSelect] = useState(INITIAL_FALSE_CONTROL)
	const [addMemberSelect, setAddMemberSelect] = useState(INITIAL_FALSE_CONTROL)
	const [onDayDuration, setOnDayDuration] = useState(INITIAL_FALSE_CONTROL)
	const [onNightDuration, setOnNightDuration] = useState(INITIAL_FALSE_CONTROL)
	const [done, setDone] = useState(INITIAL_FALSE_CONTROL)
	const [cause, setCause] = useState(INITIAL_FALSE_CONTROL)
	const [crewTPA, setCrewTPA] = useState<crewTPA>(INITIAL_CREWTPA)
	const [pilotTPA, setPilotTPA] = useState<Array<pilotTPA>>([])
	const [mecboTPA, setMecboTPA] = useState<Array<mecboTPA>>([])
	const [radioTPA, setRadioTPA] = useState<Array<radioTPA>>([])
	const [denaeTPA, setDenaeTPA] = useState<Array<denaeTPA>>([])
	const [pilotEQA, setPilotEQA] = useState<Array<pilotEQA>>([])
	const modifyHooks = [
		departureDate,
		departureTime,
		arrivalDate,
		arrivalTime,
		aircraft,
		fuel,
		config,
		type,
		mission,
		area,
		NCArea,
		chief,
		pilot,
	]
	const hooks = [
		departureDate,
		departureTime,
		arrivalDate,
		arrivalTime,
		aircraft,
		fuel,
		config,
		type,
		mission,
		area,
		NCArea,
		chief,
		pilot,
		onDayDuration,
		onNightDuration,
		done,
		cause,
		group,
		belonging,
		dayDuration,
		nightDuration,
	]
	const setters = [
		setDepartureDate,
		setDepartureTime,
		setArrivalDate,
		setArrivalTime,
		setAircraft,
		setFuel,
		setConfig,
		setType,
		setMission,
		setArea,
		setNCArea,
		setGroup,
		setBelonging,
		setChief,
		setPilot,
		setCrewMembers,
		setOnDayDuration,
		setOnNightDuration,
		setDone,
		setCause,
		setCrewTPA,
		setPilotTPA,
		setMecboTPA,
		setRadioTPA,
		setDenaeTPA,
		setPilotEQA,
		setDayDuration,
		setNightDuration,
	]
	async function addCrewMember() {
		setCrewMembers({
			value: [...crewMembers.value, addMemberSelect.value],
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		setAddableCrewMembers(removeAnEntry(addableCrewMembers, addMemberSelect.value))
		setDeleteMemberSelect({ value: "Choix...", validity: false, disabled: false })
		setAddMemberSelect({ value: "Choix...", validity: false, disabled: false })
		addTPA(
			addMemberSelect.value,
			pilotTPA,
			mecboTPA,
			radioTPA,
			denaeTPA,
			pilotEQA,
			setPilotTPA,
			setMecboTPA,
			setRadioTPA,
			setDenaeTPA,
			setPilotEQA
		)
	}
	const deleteCrewMember = () => {
		setCrewMembers({
			value: removeAnEntry(crewMembers.value, deleteMemberSelect.value),
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		addableCrewMembers.push(deleteMemberSelect.value)
		setDeleteMemberSelect({ value: "Choix...", validity: false, disabled: false })
		setAddMemberSelect({ value: "Choix...", validity: false, disabled: false })
		removeTPA(
			deleteMemberSelect.value,
			pilotTPA,
			mecboTPA,
			radioTPA,
			denaeTPA,
			pilotEQA,
			setPilotTPA,
			setMecboTPA,
			setRadioTPA,
			setDenaeTPA,
			setPilotEQA
		)
	}
	const returnClick = () => history.push("/activities")
	async function modifyFlightClick() {
		const newFlight = await buildNewFlight(modifyHooks, crewMembers)
		const deleted = await postFetchRequest(DB_URL + "flights/deleteOne", { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest(DB_URL + "flights/save", { newFlight: newFlight })
			if (res === "success") history.push("/activities")
		}
	}
	async function addFlightClick() {
		const debriefedFlight = buildDebriefedFlight(
			hooks,
			crewMembers,
			crewTPA,
			pilotTPA,
			mecboTPA,
			radioTPA,
			denaeTPA,
			pilotEQA,
			match.params.jAero,
			match.params.nAero
		)
		const saved = await postFetchRequest(DB_URL + "flights/save", { newFlight: debriefedFlight })
		if (saved === "success") {
			const deleted = await postFetchRequest(DB_URL + "flights/deleteOne", { id: match.params.id })
			if (deleted === "success") history.push("/activities")
		}
	}
	useAsyncEffect(async () => {
		const flight = await postFetchRequest(DB_URL + "flights/getOne", { id: match.params.id })
		fullfillFlightForm(setters, flight[0])
		const CDA = await postFetchRequest(DB_URL + "crewMembers/findByOnboardFunction", { function: "CDA" })
		const pilots = await postFetchRequest(DB_URL + "crewMembers/findByOnboardFunction", { function: "pilote" })
		const crewMembers = await getFetchRequest(DB_URL + "crewMembers")
		setCDAList(getTrigrams(CDA))
		setPilotList(getTrigrams(pilots))
		setAddableCrewMembers(
			removeCrewMembers(getTrigrams(crewMembers), flight[0].crewMembers, flight[0].chief, flight[0].pilot)
		)
	}, [])
	useEffect(() => {
		setAddableCrewMembers(manageAddableList(addableCrewMembers, CDAlist, chief.value))
		manageCrewMembers(crewMembers, setCrewMembers, chief.value)
		setPilotTPA(changePilotsTPA(chief.value, pilotTPA, "chief"))
		setPilotEQA(changePilotsEQA(chief.value, pilotEQA, "chief"))
	}, [chief.value])
	useEffect(() => {
		setAddableCrewMembers(manageAddableList(addableCrewMembers, pilotList, pilot.value))
		manageCrewMembers(crewMembers, setCrewMembers, pilot.value)
		setPilotTPA(changePilotsTPA(pilot.value, pilotTPA, "pilot"))
		setPilotEQA(changePilotsEQA(pilot.value, pilotEQA, "pilot"))
	}, [pilot.value])
	useEffect(() => {
		manageNCAreas(area.value, setNCArea, NCArea.value)
	}, [area.value, NCArea.value])
	useEffect(() => {
		const durations = manageDuration(departureTime, arrivalTime, match.params.jAero, match.params.nAero, done.value)
		let day = 0
		let night = 0
		if (pilotEQA.length > 0) {
			day = pilotEQA
				.map((eqa) => returnZeroOrValue(eqa.EQA.PILJ.value))
				.reduce((previous, current) => previous + current)
			night = pilotEQA
				.map((eqa) => returnZeroOrValue(eqa.EQA.PILN.value))
				.reduce((previous, current) => previous + current)
		}
		setDayDuration({ value: durations.jour, validity: 2 * durations.jour === day })
		setNightDuration({ value: durations.nuit, validity: 2 * durations.nuit === night })
		setPilotEQA(
			pilotEQA.map((eqa) => {
				return {
					name: eqa.name,
					EQA: {
						PILJ: { name: "pil jour", value: eqa.EQA.PILJ.value, validity: 2 * durations.jour === day },
						PILN: { name: "pil nuit", value: eqa.EQA.PILN.value, validity: 2 * durations.nuit === night },
						ATTJ: { name: "att jour", value: eqa.EQA.ATTJ.value },
						BAN: { name: "ba nuit", value: eqa.EQA.BAN.value },
						ATTN1: { name: "att n-1", value: eqa.EQA.ATTN1.value },
						ATTN: { name: "att nuit", value: eqa.EQA.ATTN.value },
						AMVPADV: { name: "AMV PA DV jour", value: eqa.EQA.AMVPADV.value },
						AMVMANU: { name: "AMV manu", value: eqa.EQA.AMVMANU.value },
						AMVN: { name: "AMV nuit", value: eqa.EQA.AMVN.value },
						STAND: { name: "stand", value: eqa.EQA.STAND.value },
						ERGTR: { name: "EXT/RAL GTR", value: eqa.EQA.ERGTR.value },
					},
				}
			})
		)
	}, [departureTime.value, arrivalTime.value, done.value])
	return (
		<>
			<Header />
			<Navbar />
			<form className='bg-white rounded text-dark row m-1' style={{ width: "100%" }}>
				<div className='row'>
					<div className='col-md-6 justify-content-center border border-dark rounded p-0'>
						<div className='col-md-12'>
							<TimingFieldset
								startDate={departureDate}
								setStartDate={setDepartureDate}
								startTime={departureTime}
								setStartTime={setDepartureTime}
								endDate={arrivalDate}
								setEndDate={setArrivalDate}
								endTime={arrivalTime}
								setEndTime={setArrivalTime}
								jAero={match.params.jAero}
								nAero={match.params.nAero}
							/>
						</div>
						<div className='col-md-12'>
							<MissionFieldset
								aircraft={aircraft}
								setAircraft={setAircraft}
								fuel={fuel}
								setFuel={setFuel}
								config={config}
								setConfig={setConfig}
								type={type}
								setType={setType}
								mission={mission}
								setMission={setMission}
								area={area}
								setArea={setArea}
								NCArea={NCArea}
								setNCArea={setNCArea}
							/>
						</div>
						<div className='col-md-12'>
							<CrewFieldset
								chief={chief}
								setChief={setChief}
								CDAList={CDAlist}
								pilot={pilot}
								setPilot={setPilot}
								pilotList={pilotList}
								crewMembers={crewMembers}
								setCrewMembers={setCrewMembers}
								addableCrewMembers={addableCrewMembers}
								deleteMemberSelect={deleteMemberSelect}
								setDeleteMemberSelect={setDeleteMemberSelect}
								addMemberSelect={addMemberSelect}
								setAddMemberSelect={setAddMemberSelect}
								addCrewMember={addCrewMember}
								deleteCrewMember={deleteCrewMember}
							/>
						</div>
						<div className='col-md-12'>
							<DebriefTimingFieldset
								onDayDuration={onDayDuration}
								setOnDayDuration={setOnDayDuration}
								onNightDuration={onNightDuration}
								setOnNightDuration={setOnNightDuration}
								group={group}
								setGroup={setGroup}
								belonging={belonging}
								setBelonging={setBelonging}
								done={done}
								setDone={setDone}
								cause={cause}
								setCause={setCause}
							/>
						</div>
					</div>
					<div className='col-md-6 justify-content-center'>
						<div className='col-md-12'>
							<CrewTPAFieldset
								chief={chief}
								pilot={pilot}
								crewTPA={crewTPA}
								setCrewTPA={setCrewTPA}
								pilotTPA={pilotTPA}
								setPilotTPA={setPilotTPA}
								mecboTPA={mecboTPA}
								setMecboTPA={setMecboTPA}
								radioTPA={radioTPA}
								setRadioTPa={setRadioTPA}
								denaeTPA={denaeTPA}
								setDenaeTPA={setDenaeTPA}
								pilotEQA={pilotEQA}
								setPilotEQA={setPilotEQA}
								dayDuration={dayDuration}
								setDayDuration={setDayDuration}
								nightDuration={nightDuration}
								setNightDuration={setNightDuration}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className='row justify-content-center' style={{ width: "100%" }}>
				<Button
					size={3}
					buttonColor='primary'
					buttonContent='Modifier'
					onClick={modifyFlightClick}
					disabled={!formValidity(modifyHooks)}
				/>
				<div className='col-md-1'></div>
				<Button
					size={3}
					buttonColor='success'
					buttonContent='Debriefer'
					onClick={addFlightClick}
					disabled={!formValidity(hooks)}
				/>
				<div className='col-md-1'></div>
				<Button size={3} buttonColor='danger' buttonContent='Annuler' onClick={returnClick} />
			</div>
		</>
	)
}
