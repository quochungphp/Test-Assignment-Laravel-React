import React from 'react';
import Button from '../UI/Form/Button'
import { isEmpty, isObject } from 'lodash';
export const OrganisationElement = ({ data, handleEdit, handleDelete }) => {
    const el = !isEmpty(data) ? data.map((el, i) => {
      i++;
      return <tr key={i} >
        <td>{i}</td>
        <td>{el.name}</td>
        <td>{
          isObject(el.policy)
          ?
            Object.keys(el.policy).map((i,v) => {
              let roleValue = el.policy[i];
              return <p key={v}>{i} : {
                                roleValue == true
                                ?
                                <i className="fa fa-check-square" aria-hidden="true"></i>
                                : <i className="fa fa-square-o" aria-hidden="true"></i>
                                }
                      </p>
            })
          : 'Empty'
          }
        </td>
        <td className="btn-group-control text-center">
          <Button type="button" onClick={(e) => handleEdit(e, el.id)} data-id={el.id} className="btn btn-outline-primary btn-circle btn-lg btn-circle ml-2"><i className="fa fa-edit"></i> </Button>
          <Button type="button" onClick={(e) => handleDelete(e, el.id)} data-id={el.id} className="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i className="fa fa-trash"></i> </Button>
        </td>
      </tr>
    }) : <tr><td colSpan="5" className="text-center">Empty data</td></tr>;
    return el;
}
