import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import {withFirebaseHOC} from '../../firebase'

class ChartSection1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fireData: []
        }
    }

    componentDidMount() {
        const db = this.props.firebase.db()
        db.collection('gmr-food').get()
            .then((snap) => {
                snap.docs.forEach((doc, i) => {
                    this.setState(prev => ({fireData: doc.data(), ...prev.fireData}))
                    console.log(doc.data())
                })
            })

        
    }
    render(){
        const dataBar = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
            {
                label: 'Food',
                data: [12, 22, 3, 27, 2, 32, 14],
                // data: this.state.fireData[0].food,
                backgroundColor: 'rgba(245, 74, 85, 0.5)',
                borderWidth: 1
            }, {
                label: 'Transport',
                data: [51, 19, 32, 63, 42, 19, 44],
                backgroundColor: 'rgba(90, 173, 246, 0.5)',
                borderWidth: 1
            }, {
                label: 'Electricity',
                data: [87, 65, 94, 73, 72, 61, 85],
                backgroundColor: 'rgba(245, 192, 50, 0.5)',
                borderWidth: 1
            }
            ]
        };

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
            xAxes: [{
                barPercentage: 1,
                gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
                }
            }],
            yAxes: [{
                gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                beginAtZero: true
                }
            }]
            }
        }

        const dataPie = {
            labels: ['Meat', 'Dairy', 'Beverages', 'Fish & Seafood', 'Eggs', 'Vegetables', 'Other'],
            datasets: [
            {
                data: [56.6, 18.3, 5.9, 5.8, 2.8, 2.6, 8.0],
                backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
                hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
            }
            ]
        }
        return (
            <MDBRow className="mb-4">
                <MDBCol md="8"className="mb-4">
                    <MDBCard id="bc" className="mb-4">
                    <MDBCardHeader style={{fontSize: "30px"}}>Yearly Data</MDBCardHeader>
                        <MDBCardBody>
                            <Bar data={dataBar} height={500} options={barChartOptions} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                    <MDBCard id="pc" className="mb-4">
                        <MDBCardHeader style={{fontSize: "30px"}}>Food Analysis</MDBCardHeader>
                        <MDBCardBody>
                            <Pie data={dataPie} height={300} options={{responsive: true}} />
                        </MDBCardBody>
                    </MDBCard>
                    {/*<MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBListGroup className="list-group-flush">
                                <MDBListGroupItem>
                                    Sales
                                    <MDBBadge color="success-color" pill className="float-right">
                                        22%
                                        <MDBIcon icon="arrow-up" className="ml-1"/>
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Traffic
                                    <MDBBadge color="danger-color" pill className="float-right">
                                        5%
                                        <MDBIcon icon="arrow-down" className="ml-1"/>
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Orders
                                    <MDBBadge color="primary-color" pill className="float-right">
                                        14
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Issues
                                    <MDBBadge color="primary-color" pill className="float-right">
                                        123
                                    </MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem>
                                    Messages
                                    <MDBBadge color="primary-color" pill className="float-right">
                                        8
                                    </MDBBadge>
                                </MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>*/}
                </MDBCol>
            </MDBRow>
        )
    }
}

export default withFirebaseHOC(ChartSection1);

