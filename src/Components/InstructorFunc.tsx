import { useEffect } from "react";

const InstructorFunc = (props: any) => {
    
    useEffect(() => {
        return () => {
            console.log("instructor - unmounted");
        };
    }, []);

    return (
        <div className="p-3">
            Name: {props.instructor.name}
            <br />
            Email: {props.instructor.email}
            <br />
            Phone: {props.instructor.phone}
            <br />
        </div>
    );
};

export default InstructorFunc;