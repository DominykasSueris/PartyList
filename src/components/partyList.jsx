import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Party from "./party";
import Form from "../form/form";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import "react-datepicker/dist/react-datepicker.css";
import "../table/table.css";

const PartyList = ({ partyList, setPartyList, sorting, isSorted }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <Table bordered striped>
      <thead>
        <tr>
          <th>Number</th>
          <th>Check</th>
          <th onClick={() => sorting()}>
            {isSorted === true ? (
              <span>
                <GoTriangleUp />
              </span>
            ) : (
              <span>
                <GoTriangleDown />
              </span>
            )}
            Name
          </th>
          <th>Surname</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {partyList.map(party => (
          <Party key={party.id} party={party} partyList={partyList} setPartyList={setPartyList} />
        ))}
        {isFormVisible ? (
          <Form backFunction={setFormVisible} partyList={partyList} setPartyList={setPartyList} />
        ) : (
          <tr>
            <td colSpan="6" className="right">
              <button className="btn btn-primary" onClick={() => setFormVisible(true)}>
                Add
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PartyList;
