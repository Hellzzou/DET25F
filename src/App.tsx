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

export const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/activities' component={Activities} />
				<Route path='/newFlight' component={NewFlightForm} />
				<Route path='/newEvent' component={NewEventForm} />
				<Route path='/newAlert' component={NewAlertForm} />
				<Route path='/debriefFlight/:id/:jAero/:nAero' component={DebriefFlightForm} />
				<Route path='/allTPAs' component={AllTPAs} />
				<Route path='/pilotEQA' component={PilotEQA} />
			</Switch>
		</BrowserRouter>
	)
}
