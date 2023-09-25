import { Component } from "react";

class SirketGiderleri extends Component {
    constructor() {
        super();
        this.state = {
            expenses: [],
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/financialperformance/findall?companyName=${localStorage.getItem("companyName")}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ expenses: data });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    render() {
        return (
            <div>
                <h1>Şirket Gelir-Gider Tablosu</h1>
                <table className="companyExpensesTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Sirket</th>
                            <th>Finansal Yıl</th>
                            <th>Yıllık Gelir</th>
                            <th>Yıllık Gider</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.expenses.map((expenses) => (
                            <tr key={expenses.id}>
                                <td>{expenses.id}</td>
                                <td>{expenses.companyName}</td>
                                <td>{expenses.financialYear}</td>
                                <td>{expenses.annualRevenue}</td>
                                <td>{expenses.annualExpenses}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SirketGiderleri;
