import React from 'react';

import {
    UncontrolledTooltip,
  } from "reactstrap";

const User = ({user}) => {
    console.log(user);
    return (
        <div>
            <tr>
                    <td className="table-user">
                      <img
                        alt="..."
                        className="avatar rounded-circle mr-3"
                        src={require("assets/img/theme/team-1.jpg").default}
                      />
                      <b>{user.name}</b>
                    </td>
                    <td>
                      <span className="text-muted">
                        {user.email}
                      </span>
                    </td>
                    <td>
                      <a
                        className="font-weight-bold"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        {user.status}
                      </a>
                    </td>
                    <td className="table-actions">
                      <a
                        className="table-action"
                        href="#pablo"
                        id="tooltip564981685"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-user-edit" />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip564981685">
                        Edit product
                      </UncontrolledTooltip>
                      <a
                        className="table-action table-action-delete"
                        href="#pablo"
                        id="tooltip601065234"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-trash" />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip601065234">
                        Delete product
                      </UncontrolledTooltip>
                    </td>
                  </tr>
        </div>
    );
};

export default User;