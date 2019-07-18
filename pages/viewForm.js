import React from 'react'
import Router, { withRouter } from 'next/router';
import db from '../services/db'

class viewForm extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const request_id = query.id
    const token = query.token
    const type = query.type
    const isServer = !!req;

    if (isServer) {
      let buffer = await db.request.viewForm({ id: request_id, type: type, token: `Bearer ${token}` })
      buffer = new Buffer(buffer)

      // set content type
      res.setHeader('Content-Type', 'application/pdf');
	  res.setHeader("Content-Disposition",  "filename=f8850.pdf");
      // output the pdf buffer. once res.end is triggered, it won't trigger the render method
      res.end(buffer);
    }

    return {};
  }

  render() {
    return (<div/>)
  }
}

export default viewForm

