import React from 'react';
import {
  Card, List, Icon, Button,
} from 'antd';

const Allergy = ({
  updatedAt,
  type,
  name,
  severity,
}) => (
  <List.Item actions={[<Icon type="edit" />]}>
    <List.Item.Meta
      avatar={<Icon type="experiment" />}
      title={name}
      description={`Severity: ${severity}`}
    />
    <small>{`Last updated: ${updatedAt}`}</small>
  </List.Item>
);


export const Allergies = ({ data, onAllergyAdd }) => (
  <Card
    title={`Allergies (${data.length})`}
    extra={<Button icon="plus" onClick={onAllergyAdd}>Add</Button>}
  >
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={Allergy}
    />
  </Card>
);
