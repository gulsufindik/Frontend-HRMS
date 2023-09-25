import { Component } from "react";

class CalisanTablosu extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/user/listworkers?companyName=${localStorage.getItem("companyName")}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ employees: data });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    render() {
        return (
            <div>
                <h1>Calisan Listesi</h1>
                <table className="employeeTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>İsim</th>
                            <th>Soyisim</th>
                            <th>Personel Maili</th>
                            <th>Şirket Maili</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.personalEmail}</td>
                                <td>{employee.companyEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CalisanTablosu;
