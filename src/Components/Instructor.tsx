import React from "react";

class Instructor extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount = () => { 
        console.log("Instructor - Mounted");
    };
    componentDidUpdate = () => { 
        console.log("Instructor - Updated");
    };
    componentWillUnmount = () => { 
        console.log("Instructor - Unmounted");
    };
    render() {
        console.log("Instructor - Render");
        return (
            <div className="p-3">
                Name: {this.props.instructor.name}
                <br />
                Email: {this.props.instructor.email}
                <br />
                Phone: {this.props.instructor.phone}
                <br />
            </div>
        );
    }
}

export default Instructor;