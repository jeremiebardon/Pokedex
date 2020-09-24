import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
  useHistory,
} from 'react-router-dom';

import {
  PageHeader,
  Layout,
  Image,
  Row,
  Col,
  Tabs,
} from 'antd';

// Slice
import { fetchPokemonByName, resetState } from './PokemonProfilSlice';

// Components
import {
  PokemonStats,
  PokemonEvolution,
  PokemonMoves,
} from '../../components/PokemonStats/PokemonInfos';
import Loader from '../../components/Loader/Loader';

const { TabPane } = Tabs;

export default function PokemonProfil() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { stats, evolution, loading } = useSelector((state) => state.pokemonProfil);

  useEffect(() => {
    dispatch(fetchPokemonByName({ name }));
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  function redirectToList() {
    history.push('/');
  }

  function changePokemon(pokemonName) {
    dispatch(fetchPokemonByName({ name: pokemonName, history }));
  }

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <Layout>
            <PageHeader
              onBack={() => redirectToList()}
              title={stats.name}
            />
          </Layout>
          <Row style={{ marginTop: '48px' }}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              style={{ textAlign: 'center' }}
            >
              <Image src={stats.sprites.other['official-artwork'].front_default} alt="Pokemon" />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
            >
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Evolution" key="1">
                  <PokemonEvolution
                    evolution={evolution}
                    currentPokemon={stats.name}
                    changePokemon={changePokemon}
                  />
                </TabPane>
                <TabPane tab="Moves" key="2">
                  <PokemonMoves moves={stats.moves} />
                </TabPane>
                <TabPane tab="Stats" key="3">
                  <PokemonStats stats={stats.stats} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
