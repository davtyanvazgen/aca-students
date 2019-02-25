import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

export default function Statuse(props) {
  const handleRemove = statuse => {
    props.removeStatuse(statuse);
  };

  const { statuse } = props;

  return (
    <div>
      <ListGroup>
        <ListGroupItem key={statuse.id} color="warning">
          {statuse.name}
          <Button
            className="float-right"
            size="sm"
            color="danger"
            onClick={() => {
              handleRemove(statuse);
            }}
          >
            Delete
          </Button>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
