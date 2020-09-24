import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import getPokemonChain from '../../helpers/index';

export const PokemonMoves = ({ moves }) => (
  <div>
    <Table
      columns={[
        {
          title: 'All Moves',
          dataIndex: 'move',
          key: 'move',
          render: (move) => move.name,
        },
      ]}
      pagination={{ position: ['', 'bottomCenter'] }}
      dataSource={moves}
      rowKey={(record) => `move-${record.move.name}`}
    />
  </div>
);

export const PokemonStats = ({ stats }) => (
  <div>
    <Table
      columns={[
        {
          title: 'Stat',
          dataIndex: 'stat',
          key: 'stat',
          render: (stat) => <p key={stat.name}>{stat.name}</p>,
        },
        {
          title: 'Value',
          dataIndex: 'base_stat',
          key: 'base_stat',
          render: (baseStats) => <p key={baseStats}>{baseStats}</p>,
        },
      ]}
      dataSource={stats}
      pagination={false}
      rowKey={(record) => `stat-${record.stat.name}`}
    />
  </div>
);

export const PokemonEvolution = ({ evolution, currentPokemon, changePokemon }) => (
  <Table
    columns={[
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => name,
      },
      {
        title: 'Level',
        dataIndex: 'min_level',
        key: currentPokemon,
        render: (baseStats) => baseStats,
      },
      {
        title: 'Stage',
        dataIndex: 'depth',
        key: currentPokemon,
        render: (baseStats) => baseStats,
      },
    ]}
    onRow={(record) => {
      return {
        onClick: () => changePokemon(record.name),
      };
    }}
    rowClassName={(record) => (
      `${record.name === currentPokemon ? 'current' : ''} selectable-row`
    )}
    dataSource={getPokemonChain(evolution.chain)}
    pagination={false}
    rowKey="name"
  />
);

PokemonEvolution.propTypes = {
  evolution: PropTypes.shape({
    baby_trigger_item: PropTypes.bool,
    chain: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  currentPokemon: PropTypes.string.isRequired,
  changePokemon: PropTypes.func.isRequired,
};

PokemonStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      base_stat: PropTypes.number,
      effort: PropTypes.number,
      stat: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    }),
  ).isRequired,
};

PokemonMoves.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      move: PropTypes.object,
      version_group_details: PropTypes.arrayOf(
        PropTypes.shape({
          level_learned_at: PropTypes.number,
          move_learn_method: PropTypes.object,
          version_group: PropTypes.object,
        }),
      ),
    }),
  ).isRequired,
};
