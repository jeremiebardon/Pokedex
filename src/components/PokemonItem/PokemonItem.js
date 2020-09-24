import React from 'react';
import PropTypes from 'prop-types';

import {
  Link,
} from 'react-router-dom';
import { Card, Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function PokemonItem({ image, name, types }) {
  const renderTags = (tags) => tags.map((tag) => <Tag key={tag.type.name}>{tag.type.name}</Tag>);
  return (
    <Link to={`/pokemons/${name}`}>
      <Card
        hoverable
        cover={
          image
            ? <img alt={name} src={image} />
            : <Avatar size={64} icon={<UserOutlined />} style={{ margin: '0 auto' }} />
        }
        bodyStyle={{ padding: '8px', textAlign: 'center' }}
        style={{ marginBottom: '16px' }}
      >
        <h3
          style={{
            fontWeight: '800',
            textTransform: 'Capitalize',
            marginBottom: '8px',
            fontSize: '16px',
          }}
        >
          { name }
        </h3>
        {renderTags(types)}
      </Card>
    </Link>
  );
}

PokemonItem.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      slot: PropTypes.number,
      type: PropTypes.object,
    }),
  ).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
