import React from 'react';
import { Layout } from 'antd';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import { NavBar } from '../../components/NavBar';
import { buildDatasheet } from '../../helpers/buildDatasheet';
import { monthlyTotalAllChildren } from '../../helpers/buildDatasheet/sums';
import { CREATE_OR_UPDATE_DATE_MUTATION, FETCH_USER_QUERY } from './graphql';
import { mapQueryToKids } from './mapQueryToKids';
import { Presentation } from './Presentation';

const Main = (props) => console.log('main props', props) || (
  <Mutation
    mutation={CREATE_OR_UPDATE_DATE_MUTATION}
    refetchQueries={() => {
      return [{
        query: FETCH_USER_QUERY
      }]
    }}
  >
    {(upsertDate) => {
      if (!props.match.params.date) {
        const dateToRedirect = moment().format("MM-YYYY");
        return <Redirect to={`/${dateToRedirect}`} />
      }

      const [month, year] = props.match.params.date.split('-');
      const monthToView = moment(`${month}-01-${year}`).format('YYYY-MM');

      return (
        <Inner
          upsertDate={upsertDate}
          monthToView={monthToView}
          {...props}
        />
      )
    }}
  </Mutation>
)


class Inner extends React.PureComponent {
  state = {
    /** TODO: SET MONTH TO VIEW BASED ON PROPS */
    monthToView: this.props.monthToView
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.monthToView !== prevProps.monthToView) {
      this.setState({ monthToView: this.props.monthToView })
    }
  }

  onCellsChanged = (changes) => {
    changes.forEach(change => {
      const { number, year, dayOfWeek, formattedDate } = change.cell.row;
      const { savedDateInDb } = change.cell;

      this.props.upsertDate({
        variables: {
          dateId: savedDateInDb ? savedDateInDb.dateId : "",
          childId: change.cell.childId,
          month: parseFloat(formattedDate.slice(0, 2)),
          day: parseFloat(number),
          year: parseFloat(year),
          hours: parseFloat(change.value) || 0,
          dayOfWeek,
          dateObjectId: formattedDate
        }
      });
    })
  };

  onFixedCheckboxChange = (rowData) => (e) => {
    const { childId, year, formattedDate, number, dayOfWeek, savedDateInDb, isChecked } = rowData;

    this.props.upsertDate({
      variables: {
        dateId: savedDateInDb ? savedDateInDb.dateId : "",
        childId,
        month: parseFloat(formattedDate.slice(0, 2)),
        day: parseFloat(number),
        year: parseFloat(year),
        hours: 0,
        dayOfWeek,
        dateObjectId: formattedDate,
        // TODO: Toggle true or false
        fixedRateChecked: !isChecked,
      }
    });
  }

  onCalendarMonthClick = (value) => {
      const formattedDate = moment(value).format('MM-YYYY');
      this.props.history.push(`/${formattedDate}`);
  }

  render() {
        return (
          <Layout>
            <NavBar />
            <Layout>
              <Query query={FETCH_USER_QUERY}>
                {((props) => {
                  if (props.loading) {
                    return <div>Loading...</div>;
                  }

                  if (
                    !props.data
                    || !props.data.user
                    || !props.data.user.children) {
                    return <div>Something went wrong</div>;
                  }

                  const [month, year] = moment(this.state.monthToView).format('MM YY').split(' ');
                  const monthlyTotal = monthlyTotalAllChildren(props.data.user.children, parseInt(month), parseInt(year));

                  const children = mapQueryToKids(props.data.user.children);
                  const data = buildDatasheet(children, this.state.monthToView, this.onFixedCheckboxChange);

                  return (
                    <Presentation
                      onCalendarMonthClick={this.onCalendarMonthClick}
                      monthToView={this.state.monthToView}
                      monthlyTotal={monthlyTotal}
                      data={data}
                      onCellsChanged={this.onCellsChanged}
                    />
                  );
                })}
              </Query>
            </Layout>
          </Layout>
        )
  }
}

export { Main };
