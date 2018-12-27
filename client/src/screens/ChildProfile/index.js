import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { SITTE_QUERY } from '../../graphql/queries/SITTE_QUERY';

const getShortName = str => str.charAt(0);


const Child = ({ match }) => (
  <Query
    variables={{
      where: {
        id: match.params.id,
      },
    }}
    query={SITTE_QUERY}
  >
    {({ data, loading, error }) => {
      if (loading) {
        return 'loading...';
      }
      if (error) {
        return 'Something went wrong';
      }
      return (
        <div>
          <Avatar>
            {getShortName(data.sitte.firstName)}
            {getShortName(data.sitte.lastName)}
          </Avatar>
        </div>
      );
    }}
  </Query>
);

Child.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default withRouter(Child);
