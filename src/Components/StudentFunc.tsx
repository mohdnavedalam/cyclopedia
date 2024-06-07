import React from "react";

const StudentFunc = (props: any) => {
   
    const handleAddStudent = () => {
        props.handleStudentCountChange(props.studentCount + 1);
    };
    const handleRemoveStudent = () => {
        props.handleStudentCountChange(props.studentCount - 1);
    };
    const handleRemoveAllStudents = () => {
        props.handleStudentCountChange(0);
    }
    return (
        <>
            <div className="p-3">
                <span className="h4 text-success">Students</span>
                <br />
                <div>Student Count: {props.studentCount}</div>
                <button className="btn btn-success btn-sm" onClick={handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-warning btn-sm" onClick={handleRemoveStudent}>Remove Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={handleRemoveAllStudents}>Remove All Students</button>
            </div>
            <div className="p-3">
                {
                    props.studentList.map((student: any, index: number) => {
                        return (
                            <div key={index}> - {student.name}</div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default StudentFunc;