import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { withFirestore } from 'react-redux-firebase'
import {firestore} from "firebase";

function Cource(props) {
  const handleRemove = cource => {
    firestore()
        .collection("cources")
        .doc(cource.id)
        .delete();
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


export default withFirestore(Cource)