import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { NewAlertForm } from "./Routes/NewAlertForm"
import { NewEventForm } from "./Routes/NewEventForm"
import { NewFlightForm } from "./Routes/NewFlightForm"
import { Activities } from "./Routes/Activities"
import { Login } from "./Routes/Login"
import { DebriefFlightForm } from "./Routes/DebriefFlightForm"
import { AllTPAs } from "./Routes/AllTPAs"
import { PilotEQA } from "./Routes/pilotEQA"
import { FlightHours } from "./Routes/FlightHours"
import { MemberHoursDetail } from "./Routes/MemberHoursDetail"
import { FlightSearch } from "./Routes/FlightSearch"
import { QOG } from "./Routes/QOG"
import { CRHebdo } from "./Routes/CRHebdo"

export const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/activities' component={Activities} />
				<Route path='/newFlight' component={NewFlightForm} />
				<Route path='/newEvent/:id' component={NewEventForm} />
				<Route path='/newAlert/:id' component={NewAlertForm} />
				<Route path='/debriefFlight/:id/:jAero/:nAero' component={DebriefFlightForm} />
				<Route path='/allTPAs' component={AllTPAs} />
				<Route path='/pilotEQA' component={PilotEQA} />
				<Route path='/flightHours' component={FlightHours} />
				<Route path='/memberDetails/:name/:startDate/:endDate' component={MemberHoursDetail} />
				<Route path='/flightSearch' component={FlightSearch} />
				<Route path='/QOG' component={QOG} />
				<Route path='/crHebdo' component={CRHebdo} />
			</Switch>
		</BrowserRouter>
	)
}
