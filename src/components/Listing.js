import { Card, Col, Container, Row } from "mdbreact";
import React, { Component } from "react";

class Listing extends Component {
	render() {
		const data = this.props.data;
		console.log(data);
		if (typeof data !== "object") return <span>Please wait..</span>;
		return (
			<Container>
				<Row>
					{Object.entries(data)
						.map(e => e[0])
						.map((d, i) => (
							<Col md="6" key={i}>
								<a
									href={this.props.path + "/" + d}
									style={{
										textDecoration: "none",
										color: "black"
									}}>
									<Card className="tiles text-left">
										<div className="text-center">
											<b className="ch">{d}</b>
											<br />
										</div>
										<ul>
											{Object.entries(data[d]).map((v, i) => (
												<li key={i}> {v[0] + ":" + v[1]} </li>
											))}
										</ul>
									</Card>
								</a>
							</Col>
						))}
				</Row>
			</Container>
		);
	}
}
export default Listing;
