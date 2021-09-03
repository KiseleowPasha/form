import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import formsJSON from "../../db/forms.json";
import questionsJSON from "../../db/questions.json";
import "./form.css";

function Form(){
    const [forms, setForms] = useState(formsJSON);
    const [questions, setQuestions] = useState(questionsJSON);
    const [answer, setAnswer] = useState(""); 
    const [answersInLocalStorage, setAnswersInLocalStorage] = useState(sessionStorage);

    const {id} = useParams();

    const currentForm = forms.find(form => form.id === parseInt(id));
    const currentQuestions = questions.filter(question => question.formId === currentForm.id);
    const pageURL = parseInt(useLocation().pathname.split("/").join(""));


    const nav = () => {
        if(!pageURL) return <Link to="/1">Начать</Link>;
            else if(pageURL === 1) return   <div className="nav">
                                                <Link to={`/`}>Назад</Link> 
                                                <Link to={`/${pageURL+1}`} className={sessionStorage[`form${currentForm.id}`] ? "block" : "hidden"}>
                                                    Далее
                                                </Link>
                                            </div>;
                    else if(pageURL === forms.length) return    <div className="nav">
                                                                    <Link to={`/${pageURL-1}`}>Назад</Link>
                                                                    <Link to="/submitted" className={sessionStorage[`form${currentForm.id}`] ? "block" : "hidden"} onClick={submitForm}>Отправить данные</Link>
                                                                </div>;
                            else return     <div className="nav">
                                                <Link   to={`/${pageURL-1}`}>Назад</Link> 
                                                <Link   to={`/${pageURL+1}`} className={sessionStorage[`form${currentForm.id}`] ? "block" : "hidden"}>
                                                        Далее
                                                </Link> 
                                            </div>;
    }
    

    const onChangeInput = ({target}) => setAnswer(target.value);


    const onFocusInput = ({target}) => setAnswer(target.value);


    const onBlurInput = (id) => submitOneAnswer(id);


    const submitForm = () => {
        sessionStorage.clear();
        questions.forEach((question,index) => index !== 0 ? question.block = false : null);
    }


    const submitOneAnswer = (id, next, index) => {
        if(answer === "") return;
        if(next) id !== questions.length ? questions.find(question => question.questionId === id + 1).block = true : null;
        if(index === currentQuestions.length - 1) sessionStorage.setItem("form" + currentForm.id, true);
        sessionStorage.setItem(String(id), answer);
        setAnswersInLocalStorage(sessionStorage);
        setAnswer("");
    }

 
    const onEnterPress = ({code}, id, index) => code === "Enter" ? submitOneAnswer(id, true, index) : null;


    return  <>
                <h1>{currentForm.name}</h1> 
                <form>
                    {currentQuestions.map((currentQuestion, index) => 
                        <label  className = { currentQuestion.block || answersInLocalStorage[currentQuestion.questionId] ? "block" : "hidden"} 
                                key={currentQuestion.questionId}>{currentQuestion.question}
                                    <input  onChange={onChangeInput} 
                                            onKeyPress={event => onEnterPress(event, currentQuestion.questionId, index)}
                                            defaultValue={sessionStorage[currentQuestion.questionId]}
                                            onFocus={onFocusInput}
                                            onBlur={() => onBlurInput(currentQuestion.questionId)}>
                                    </input>
                        </label>
                    )}
                </form>
                {nav()}
            </>
}


export default Form;