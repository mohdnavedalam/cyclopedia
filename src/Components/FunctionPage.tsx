import { useEffect, useRef, useState } from "react";
import { getRandomUser } from "../Utilities/Api";
import InstructorFunc from "./InstructorFunc";
import StudentFunc from "./StudentFunc";
import { get } from "http";

const FunctionPage = () => {

    // const [totalRender, setTotalRender] = useState(() => {
    //     return 0;
    // });

    const totalRender = useRef(0);
    const prevStudentCount = useRef(0);

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

    // useEffect(() => {
    //     //console.log("call on every render");
    // });

    useEffect(() => {
        //console.log("call on first/initial render/mount");
        state.hideInstructor = false;
    }, []);

    // useEffect(() => {
    //     setTotalRender((prevState: any) => prevState + 1);
    //     console.log("render" + " " + totalRender);
    // }, [state.hideInstructor]);

    useEffect(() => {
        totalRender.current++;
        console.log("render" + " " + totalRender.current);
    }, [state.hideInstructor]);

    // useEffect(() => {
    //     prevStudentCount.current++;
    //     //console.log("student render" + " " + prevStudentCount.current);
    //     console.log("Prev count" + prevStudentCount.current);
    //     console.log("Current Count" + state.studentCount);
    //     prevStudentCount.current = state.studentCount;
    //     console.log("Prev count" + prevStudentCount.current);
    //     console.log("Current Count" + state.studentCount);
    // }, [state.studentCount]);

    useEffect(() => {
        //console.log("call on hideInstructor value changes");
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
        if (!state.hideInstructor) {
            getUser();
        }
    }, [state.hideInstructor]);

    useEffect(() => {
        const getStudent = async () => {
            const response = await getRandomUser();
            setState((prevState: any) => {
                return {
                    ...prevState,
                    studentList: [
                        ...prevState.studentList,
                        {
                            name: response.data.first_name + " " + response.data.last_name,
                        }
                    ]
                }
            })
        };
        if (prevStudentCount.current < state.studentCount) {
            getStudent();
        } else if (prevStudentCount.current > state.studentCount) {
            setState((prevState: any) => {
                return {
                    ...prevState,
                    studentList: []
                };
            });
        }
    }, [state.studentCount]);

    useEffect(() => {
        prevStudentCount.current++;
        // console.log("Prev count" + prevStudentCount.current);
        // console.log("Current Count" + state.studentCount);
        prevStudentCount.current = state.studentCount;
        // console.log("Prev count" + prevStudentCount.current);
        // console.log("Current Count" + state.studentCount);
    }, [state.studentCount]);

    useEffect(() => {
        //console.log("call only on value changes");
    }, [state.hideInstructor, inputFeedback]);

    useEffect(() => {
        //console.log("call on first render");
        return () => {
            //console.log("call on unmount");
        }
    }, [inputName]);

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

    const handleStudentCountChange = (studentCount: number) => {
        setState((prevState: any) => {
            return {
                ...prevState,
                studentCount,
            }
        });
    };


    const handleStudentListChange = (studentList: []) => {
        setState((preveState: any) => {
            return {
                ...preveState,
                studentList,
            }
        });
    };

    return (
        <div>
            <span className="h4 text-success">Instructor &nbsp;</span>
            <i className={`bi ${state.hideInstructor ? "bi-toggle-on" : "bi-toggle-off"} btn btn-success btn-sm`} onClick={handleToggleInstructor}></i>
            {
                state.hideInstructor && state.instructor ? (
                    <InstructorFunc instructor={state.instructor} />
                ) : null
            }
            {/* <div className="p-3">Render Count: {totalRender}</div> */}
            <div className="p-3">Render Count: {totalRender.current}</div>
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
            <StudentFunc
                studentList={state.studentList}
                handleStudentListChange={handleStudentListChange}
                studentCount={state.studentCount}
                handleStudentCountChange={handleStudentCountChange}
            />
        </div >
    );
};

export default FunctionPage;