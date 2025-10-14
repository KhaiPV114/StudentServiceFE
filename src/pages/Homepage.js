import Header from "../components/User/Header";
import Footer from "../components/User/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/User/Sidebar";

const Homepage = () => {
  return (
    <Container fluid>
      <Row>
        <Header/>
      </Row>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8} className="text-center my-5">
          <h1>Welcome to the Student Service Portal</h1>
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Homepage;
