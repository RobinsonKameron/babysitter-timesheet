import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar } from 'react-chartjs';
import { Avatar, Card, Layout } from 'antd';
import { FlexRow } from '../../components/Flex';
import { buildYearlyTotals } from './buildYearlyTotals';
import { formatCurr } from '../../helpers/formatCurr';
import { Payment } from '../../components/Payment';
import { ME_QUERY } from '../../graphql/queries/ME_QUERY';
import { GET_SITTES } from './graphql';

const Graph = ({ loading, error, data }) => {
  if (loading) {
    return (<div>Loading Data...</div>);
  }
  if (error) {
    return (<div>There was an error loading the data...</div>);
  }
  return (
    <Bar
      data={data}
      height="250"
      options={{
        responsive: true,
        maintainAspectRatio: false,
        titleFontColor: 'red',
        tooltips: {
          callbacks: {
            label: (toolTipItem, data) => {
              console.log('toolTipItem, data', toolTipItem, data);
              return 'Oh hello...';
            },
          },
        },
      }}
    />
  );
};


const DataSheetWrapper = styled.div`
  padding: 2rem 0;
`;

const UserName = styled.h2`
    margin: 0 0 0 .5rem;
`;

const TopRow = styled(FlexRow)`
  justify-content: space-between;
`;

const TitleBar = styled(FlexRow)`
  margin-bottom: 2rem;
`;

const MyProfile = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) {
        return 'Loading...';
      }

      if (error) {
        return 'Something went wrong';
      }

      const { me } = data;

      return (
        <Layout style={{ backgroundColor: '#fff' }}>
          <TopRow>
            <TitleBar>
              <Avatar icon="user" />
              <UserName>
                {me.firstName}
                {' '}
                {me.lastName}
              </UserName>
            </TitleBar>
            <div>
              <p>{`You are currently on a ${me.type} account`}</p>
              <Payment user={me} />
            </div>
          </TopRow>
          <Query query={GET_SITTES}>
            {((props) => {
              const sitteData = (props.data.sittes && props.data.sittes.length > 0)
                ? props.data.sittes
                : null;
              const annualData = buildYearlyTotals(sitteData);

              const annualAnnualSum = annualData.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

              return (
                <DataSheetWrapper>
                  <Card title={`2018 Total: ${formatCurr(annualAnnualSum)}`}>
                    <Graph
                      loading={props.loading}
                      error={props.error}
                      data={annualData}
                    />
                  </Card>
                </DataSheetWrapper>
              );
            })}
          </Query>
        </Layout>
      );
    }}
  </Query>
);

MyProfile.propTypes = {
  me: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    // type: PropTypes.oneOf('TRIAL', 'MONTHLY_PAID'),
  }).isRequired,
};

export default MyProfile;
