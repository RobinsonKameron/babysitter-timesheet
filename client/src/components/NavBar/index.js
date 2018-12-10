import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { ApolloConsumer, Query } from 'react-apollo';
import {
  Avatar, Dropdown, Menu, Button,
} from 'antd';

import { FlexRow } from '../Flex';
import { ME_QUERY } from '../../graphql/queries/ME_QUERY';

const StyledLink = styled(Link)`
  display: flex;
  align-items: flex-start;
  > span, h1 {
    font-family: Lobster;
    font-size: 24px;
    padding: 0;
    margin: 0;
  }
  > span {
    margin-right: .25rem;
  }
`;

const LogOutButton = styled(Button)`
  background-color: transparent;
  border: none;
`;

const DropdownMenu = ({ history }) => (
  <Menu>
    <Menu.Item>
      <Link to={`/sheet/${moment().format('MM-YYYY')}`}>Sheets</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/new-sitte">New Sitte</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/my-profile">Profile</Link>
    </Menu.Item>
    <Menu.Item>
      <ApolloConsumer>
        {client => (
          <LogOutButton
            onClick={async () => {
              await window.localStorage.removeItem('token');
              client.writeData({ data: { isLoggedIn: false } });
              client.resetStore();
              return history.push('/');
            }}
            type="danger"
          >
            Log Out
          </LogOutButton>
        )}
      </ApolloConsumer>
    </Menu.Item>
  </Menu>
);

const StyledDropdown = styled(Dropdown)`
  cursor: pointer;

  > svg {
    height: 18px;
    width: 18px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: whitesmoke;
`;

const NavBar = withRouter(({ isLoggedIn, user, history }) => {
  const DropdownMenuWithHistory = () => <DropdownMenu history={history} />;
  return (
    <Wrapper>
      <StyledLink to="/">
        <span role="img" aria-label="baby">👶</span>
        <h1>Sitter Sheet</h1>
      </StyledLink>
      {
        isLoggedIn
          ? (
            <Query query={ME_QUERY}>
              {({ data, loading }) => {
                if (loading) {
                  return null;
                }
                return (
                  <FlexRow>
                    <StyledDropdown overlay={DropdownMenuWithHistory()}>
                      <Avatar src={`https://api.adorable.io/avatars/70/${data.me.email}.png`} />
                    </StyledDropdown>
                  </FlexRow>
                );
              }}
            </Query>
          )
          : <StyledLink to="/register">Signup</StyledLink>
      }
    </Wrapper>
  );
});

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export { NavBar };
