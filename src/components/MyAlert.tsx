import { useState } from "react";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function MyAlert(): JSX.Element {
    const [show, setShow] = useState(true);
  return (
    <>
      <Button
        onClick={() => setShow((show) => !show)}
        variant="outline-success"
      >
        toggle alert
      </Button>
      <Alert show={show} variant="success">
        <Alert.Heading>title</Alert.Heading>
        <p>alert</p>
      </Alert>
    </>
  );
}
