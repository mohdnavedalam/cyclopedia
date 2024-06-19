import React from "react";
import { getRandomUser } from "../Utilities/Api";
import Instructor from "./Instructor";
import Student from "./Student";

class ClassPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        //this.state = JSON.parse(localStorage.getItem("cyclopediaState") as string) || {
        this.state = JSON.parse(localStorage.getItem("cyclopediaState")!) || {
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
            inputName: "",
            inputFeedback: "",
        };
    }

    componentDidMount = async () => {
        //console.log("component did mount");
        if (JSON.parse(localStorage.getItem("cyclopediaState")!)) {
            this.setState(JSON.parse(localStorage.getItem("cyclopediaState")!));
        } else {
            const response = await getRandomUser();
            //console.log(response);
            this.setState((prevState: any) => {
                return {
                    instructor: {
                        name: response.data.first_name + " " + response.data.last_name,
                        email: response.data.email,
                        phone: response.data.phone_number,
                    },
                };
            });
        }
    };

    componentDidUpdate = async (prevState: any, prevProps: any) => {
        //console.log("component did update");
        if (this.state.hideInstructor == false)
            localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
        else
            localStorage.removeItem("cyclopediaState");
        //console.log(this.state.studentCount);
        //console.log(prevProps.studentCount);
        if (prevProps.studentCount < this.state.studentCount) {
            const response = await getRandomUser();
            this.setState((prevState: any) => {
                return {
                    studentList: [
                        ...prevProps.studentList,
                        {
                            name: response.data.first_name + " " + response.data.last_name,
                        },
                    ],
                };
            });
        } else if (prevProps.studentCount > this.state.studentCount){
            this.setState((prevState: any) => {
                return {
                    studentList: [],
                }
            });
        }
    };

    componentWillUnmount = () => {
        //console.log("component will unmount");
    };

    handleTextAreaChange = (e: any) => {
        this.setState({ inputFeedback: e.target.value });
    };

    handleToggleInstructor = () => {
        this.setState((prevState: any) => {
            return {
                hideInstructor: !prevState.hideInstructor,
            }
        });
    };

    handleStudentCountChange = (studentCount: number) => {
        this.setState({ studentCount });
    };

    handleStudentListChange = (studentList: []) => {
        this.setState({ studentList });
    };

    render() {
        //console.log("render component");
        return (
            <div>
                <span className="h4 text-success">Instructor &nbsp;</span>
                <i className={`bi ${this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"} btn btn-success btn-sm`} onClick={this.handleToggleInstructor}></i>

                {!this.state.hideInstructor && this.state.instructor ? (
                    <Instructor instructor={this.state.instructor} />
                ) : null}
                <div className="p-3">
                    <span className="h4 text-success">Feedback</span>
                    <br />
                    <input
                        type="text"
                        placeholder="Name.."
                        value={this.state.inputName}
                        onChange={(e: any) => {
                            this.setState({ inputName: e.target.value })
                        }}
                    >
                    </input>
                    Value: {this.state.inputName}
                    <br />
                    <textarea
                        placeholder="Feedback..."
                        value={this.state.inputFeedback}
                        onChange={this.handleTextAreaChange}
                    >
                    </textarea>
                    Value: {this.state.inputFeedback}
                </div>
                <Student
                    studentList={this.state.studentList}
                    handleStudentListChange={this.handleStudentListChange}
                    studentCount={this.state.studentCount}
                    handleStudentCountChange={this.handleStudentCountChange}
                />
            </div>
        );
    };
}

export default ClassPage;