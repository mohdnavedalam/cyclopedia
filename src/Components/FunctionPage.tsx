import React, { useEffect, useState } from "react";
import { getRandomUser } from "../Utilities/Api";
import Instructor from "./Instructor";
import Student from "./Student";

const FunctionPage = () => {

    const [state, setState] = useState(() => {
        return {
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
        };
    });

    const [inputName, setInputName] = useState(() => {
        return { name: "" };
    });

    const [inputFeedback, setInputFeedback] = useState(() => {
        return "";
    });

    useEffect(() => {
        console.log("call on every render");
    });

    useEffect(() => {
        console.log("call on initial/first render/mount");
        const getUser = async () => {
            const response = await getRandomUser();
            setState((prevState: any) => {
                return {
                    ...prevState,
                    instructor: {
                        name: response.data.first_name + " " + response.data.last_name,
                        email: response.data.email,
                        phone: response.data.phone_number,
                    },
                };
            });
        };
        getUser();
    }, []);

    useEffect(() => {
        console.log("call only on value changes");
    }, [state.hideInstructor, inputFeedback]);

    useEffect(() => {
        console.log("call on first render");
        return () => {
            console.log("call on unmount");
        }
    }, [inputName]);

    // constructor(props: any) {
    //     super(props);
    //     //state = JSON.parse(localStorage.getItem("cyclopediaState") as string) || {
    //     state = JSON.parse(localStorage.getItem("cyclopediaState")!) || {
    //         instructor: undefined,
    //         studentList: [],
    //         studentCount: 0,
    //         hideInstructor: false,
    //         inputName: "",
    //         inputFeedback: "",
    //     };
    // }

    // componentDidMount = async () => {
    //     console.log("component did mount");
    //     if (JSON.parse(localStorage.getItem("cyclopediaState")!)) {
    //         setState(JSON.parse(localStorage.getItem("cyclopediaState")!));
    //     } else {
    //         const response = await getRandomUser();
    //         console.log(response);
    //         setState((prevState: any) => {
    //             return {
    //                 instructor: {
    //                     name: response.data.first_name + " " + response.data.last_name,
    //                     email: response.data.email,
    //                     phone: response.data.phone_number,
    //                 },
    //             };
    //         });
    //     }
    // };

    // componentDidUpdate = async (prevState: any, prevProps: any) => {
    //     console.log("component did update");
    //     if (state.hideInstructor == false)
    //         localStorage.setItem("cyclopediaState", JSON.stringify(state));
    //     else
    //         localStorage.removeItem("cyclopediaState");
    //     console.log(state.studentCount);
    //     console.log(prevProps.studentCount);
    //     if (prevProps.studentCount < state.studentCount) {
    //         const response = await getRandomUser();
    //         setState((prevState: any) => {
    //             return {
    //                 studentList: [
    //                     ...prevProps.studentList,
    //                     {
    //                         name: response.data.first_name + " " + response.data.last_name,
    //                     },
    //                 ],
    //             };
    //         });
    //     } else if (prevProps.studentCount > state.studentCount){
    //         setState((prevState: any) => {
    //             return {
    //                 studentList: [],
    //             }
    //         });
    //     }
    // };

    // componentWillUnmount = () => {
    //     console.log("component will unmount");
    // };

    const handleTextAreaChange = (e: any) => {
        setInputFeedback(e.target.value);
    };

    const handleToggleInstructor = () => {
        setState((prevState: any) => {
            return {
                ...prevState,
                hideInstructor: !prevState.hideInstructor,
            }
        });
    };

    // const handleStudentCountChange = (studentCount: number) => {
    //     setState((prevState: any) => {studentCount});
    // };

    // const handleStudentListChange = (studentList: []) => {
    //     setState({ studentList });
    // };

    // render() {
    //     console.log("render component");
    return (
        <div>
            <span className="h4 text-success">Instructor &nbsp;</span>
            <i className={`bi ${state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"} btn btn-success btn-sm`} onClick={handleToggleInstructor}></i>
            {
                !state.hideInstructor && state.instructor ? (
                    <Instructor instructor={state.instructor} />
                ) : null
            }
            <div className="p-3">
                <span className="h4 text-success">Feedback</span>
                <br />
                <input
                    type="text"
                    placeholder="Name.."
                    value={inputName.name}
                    onChange={(e: any) => {
                        setInputName({ name: e.target.value });
                    }}
                >
                </input>
                Value: {inputName.name}
                <br />
                <textarea
                    placeholder="Feedback..."
                    value={inputFeedback}
                    onChange={handleTextAreaChange}
                >
                </textarea>
                Value: {inputFeedback}
            </div>
            <Student
                studentList={state.studentList}
                //handleStudentListChange={handleStudentListChange}
                studentCount={state.studentCount}
            //handleStudentCountChange={handleStudentCountChange}
            />
        </div >
    );
    //};
}

export default FunctionPage;