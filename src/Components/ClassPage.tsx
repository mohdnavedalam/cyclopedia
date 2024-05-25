import React from "react";
import { getRandomUser } from "../Utilities/Api";

class ClassPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
        };
    }
    componentDidMount = async () => {
        console.log("component did mount");
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
    };
    componentDidUpdate = () => {
        console.log("component did update");
    };
    componentWillUnmount = () => {
        console.log("component will unmount");
    };

    render () {
        console.log("render component");
        return(
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
            </div>
        );
    };
}

export default ClassPage;