import { Fragment } from "react";
import { AppBarComponent } from "../../components/AppBar/AppBarComponent";
import { EventCompletingPage } from "../event/EventCompletingPage";

export const Hompepage = () => {

    return (
        <Fragment>
            <AppBarComponent />
            <EventCompletingPage />
        </Fragment >
    )
}