import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import Form from "../form/form";
import "./questionnaire.css";


function Questionnaire(){

    const pageURL = useLocation().pathname;


    return  <>
                <Link to="/1" className={pageURL === "/" ? "block center" : "hidden"}>Начать</Link>
                <Switch>
                    <Route path="/submitted">
                        <Link to="/1" className="center">Заполнить ещё одну анкету</Link>
                    </Route>
                    <Route path="/:id">
                        <Form/>
                    </Route>
                </Switch>
            </>
}


export default Questionnaire;