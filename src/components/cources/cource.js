import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

export default function Cource(props) {
  const handleRemove = cource => {
    props.removeCource(cource);
  };

  const { cource } = props;

  return (
    <div>
      <ListGroup>
        <ListGroupItem key={cource.id} color="success">
          {cource.name}
          <Button
            className="float-right"
            size="sm"
            color="danger"
            onClick={() => {
              handleRemove(cource);
            }}
          >
            Delete
          </Button>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
