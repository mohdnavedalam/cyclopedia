import React from "react";
import { getRandomUser } from "../Utilities/Api";

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
        console.log("component did mount");
        if (JSON.parse(localStorage.getItem("cyclopediaState")!)) {
            this.setState(JSON.parse(localStorage.getItem("cyclopediaState")!));
        } else {
            const response = await getRandomUser();
            console.log(response);
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
    componentDidUpdate = () => {
        console.log("component did update");
        localStorage.setItem("cyclopediaState", JSON.stringify(this.state));

    };
    componentWillUnmount = () => {
        console.log("component will unmount");
    };

    handleAddStudent = () => {
        this.setState((prevState: any) => {
            return {
                studentCount: prevState.studentCount + 1,
            }
        });
    };

    handleRemoveStudent = () => {
        this.setState((prevState: any) => {
            return {
                studentCount: prevState.studentCount - 1,
            }
        });
    };

    handleRemoveAllStudents = () => {
        this.setState((prevState: any) => {
            return {
                studentCount: 0,
            }
        });
    }

    handleTextAreaChange = (e: any) => {
        this.setState({ inputFeedback: e.target.value });
    };

    render() {
        console.log("render component");
        return (
            <div>
                {this.state.instructor && (
                    <div className="p-3">
                        <span className="h4 text-success">Instructor</span>
                        <i className="bi bi-toggle-ff btn btn-success btn-sm"></i>
                        <br />
                        Name: {this.state.instructor.name}
                        <br />
                        Email: {this.state.instructor.email}
                        <br />
                        Phone: {this.state.instructor.phone}
                        <br />
                    </div>
                )}
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
                <div className="p-3">
                    <span className="h4 text-success">Students</span>
                    <br />
                    <div>Student Count: {this.state.studentCount}</div>
                    <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                    &nbsp;
                    <button className="btn btn-warning btn-sm" onClick={this.handleRemoveStudent}>Remove Student</button>
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudents}>Remove All Students</button>
                </div>
            </div>
        );
    };
}

export default ClassPage;