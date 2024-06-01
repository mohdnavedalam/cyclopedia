import React from "react";

class Student extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    handleAddStudent = () => {
        this.props.handleStudentCountChange(this.props.studentCount + 1);
    };
    handleRemoveStudent = () => {
        this.props.handleStudentCountChange(this.props.studentCount - 1);
    };
    handleRemoveAllStudents = () => {
        this.props.handleStudentCountChange(0);
    }
    render() {
        return (
            <>
                <div className="p-3">
                    <span className="h4 text-success">Students</span>
                    <br />
                    <div>Student Count: {this.props.studentCount}</div>
                    <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                    &nbsp;
                    <button className="btn btn-warning btn-sm" onClick={this.handleRemoveStudent}>Remove Student</button>
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudents}>Remove All Students</button>
                </div>
                <div className="p-3">
                    {
                        this.props.studentList.map((student: any, index: number) => {
                            return (
                                <div key={index}> - {student.name}</div>
                            );
                        })
                    }
                </div>
            </>
        );
    }
}
export default Student;