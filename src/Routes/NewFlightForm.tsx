import React from "react"
import { useState } from "react"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { Legend } from "../BasicComponents/Legend"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { INITIAL_FALSE_CONTROL, INITIAL_FALSE_SELECT } from "../Datas/initialHooks"
import { CrewFieldset } from "../Sections/CrewFieldset"
import { MissionFieldset } from "../Sections/MissionFieldset"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { arrayIsNotEmpty, formValidity } from "../tools/validators"
import { Redirect, useHistory } from "react-router-dom"
import { buildNewFlight } from "../tools/saveToDatabase"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { controlArray, Nights } from "../types/Objects"
import { getTrigrams, removeAnEntry } from "../tools/tools"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { DB_URL } from "../Datas/datas"
import { useEffect } from "react"
import { manageAddableList, manageCrewMembers, manageNCAreas } from "../tools/form"
import { tokenCheck } from "../tools/user"

export const NewFlightForm = (): JSX.Element => {
	const history = useHistory()
	const [jAero, setJAero] = useState("")
	const [nAero, setNAero] = useState("")
	const [nights, setNights] = useState<Nights>([[]])
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_CONTROL)
	const [fuel, setFuel] = useState(INITIAL_FALSE_CONTROL)
	const [config, setConfig] = useState(INITIAL_FALSE_CONTROL)
	const [type, setType] = useState(INITIAL_FALSE_CONTROL)
	const [mission, setMission] = useState(INITIAL_FALSE_CONTROL)
	const [area, setArea] = useState(INITIAL_FALSE_CONTROL)
	const [NCArea, setNCArea] = useState(INITIAL_FALSE_SELECT)
	const [chief, setChief] = useState(INITIAL_FALSE_CONTROL)
	const [CDAlist, setCDAList] = useState<Array<string>>([])
	const [pilot, setPilot] = useState(INITIAL_FALSE_CONTROL)
	const [pilotList, setPilotList] = useState<Array<string>>([])
	const [addableCrewMembers, setAddableCrewMembers] = useState<Array<string>>([])
	const [crewMembers, setCrewMembers] = useState<controlArray>({ value: [], validity: false, disabled: false })
	const [deleteMemberSelect, setDeleteMemberSelect] = useState(INITIAL_FALSE_CONTROL)
	const [addMemberSelect, setAddMemberSelect] = useState(INITIAL_FALSE_CONTROL)
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
	]
	const addCrewMember = () => {
		setCrewMembers({
			value: [...crewMembers.value, addMemberSelect.value],
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		setAddableCrewMembers(removeAnEntry(addableCrewMembers, addMemberSelect.value))
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
		setAddMemberSelect(INITIAL_FALSE_SELECT)
	}
	const deleteCrewMember = () => {
		setCrewMembers({
			value: removeAnEntry(crewMembers.value, deleteMemberSelect.value),
			validity: arrayIsNotEmpty(crewMembers.value),
			disabled: false,
		})
		addableCrewMembers.push(deleteMemberSelect.value)
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
		setAddMemberSelect(INITIAL_FALSE_SELECT)
	}
	const returnClick = () => history.push("/activities")
	async function addFlightClick() {
		const newFlight = await buildNewFlight(hooks, crewMembers)
		const res = await postFetchRequest(DB_URL + "flights/save", { newFlight: newFlight })
		if (res === "success") history.push("/activities")
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const nights = await getFetchRequest(DB_URL + "nights")
			const crewMembers = await getFetchRequest(DB_URL + "crewMembers")
			const CDA = await postFetchRequest(DB_URL + "crewMembers/findByOnboardFunction", { function: "CDA" })
			const pilots = await postFetchRequest(DB_URL + "crewMembers/findByOnboardFunction", {
				function: "pilote",
			})
			setNights(nights[0])
			setAddableCrewMembers(getTrigrams(crewMembers))
			setCDAList(getTrigrams(CDA))
			setPilotList(getTrigrams(pilots))
		}
	}, [])
	useEffect(() => {
		setAddableCrewMembers(manageAddableList(addableCrewMembers, CDAlist, chief.value))
		manageCrewMembers(crewMembers, setCrewMembers, chief.value)
	}, [chief.value])
	useEffect(() => {
		setAddableCrewMembers(manageAddableList(addableCrewMembers, pilotList, pilot.value))
		manageCrewMembers(crewMembers, setCrewMembers, pilot.value)
	}, [pilot.value])
	useEffect(() => {
		manageNCAreas(area.value, setNCArea, NCArea.value)
	}, [area.value])
	useAsyncEffect(async () => {
		if (departureDate.validity) {
			const departure = new Date(departureDate.value)
			const jAero = nights[departure.getMonth()][departure.getDate() - 1].jour + "L"
			const nAero = nights[departure.getMonth()][departure.getDate() - 1].nuit + "L"
			setJAero(jAero)
			setNAero(nAero)
		}
	}, [departureDate.value])
	return !token ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<NewEventNavBar />
			<form className='bg-white rounded text-dark row justify-content-center' style={{ width: "100%" }}>
				<Legend title='Nouveau vol' />
				<div className='col-md-6 m-1 justify-content-center'>
					<TimingFieldset
						startDate={departureDate}
						setStartDate={setDepartureDate}
						startTime={departureTime}
						setStartTime={setDepartureTime}
						endDate={arrivalDate}
						setEndDate={setArrivalDate}
						endTime={arrivalTime}
						setEndTime={setArrivalTime}
						jAero={jAero}
						nAero={nAero}
					/>
				</div>
				<div className='col-md-6 m-1 justify-content-center'>
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
				<div className='col-md-6 m-1 justify-content-center'>
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
			</form>
			<AddOrReturnButtons
				validity={formValidity(hooks)}
				addContent='Ajouter'
				addClick={addFlightClick}
				returnClick={returnClick}
			/>
		</>
	)
}
