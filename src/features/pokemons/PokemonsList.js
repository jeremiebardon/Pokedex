import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Col, Row } from 'antd';

// Slice
import { fetchPokemons, resetState } from './PokemonsSlice';

// Components
import Loader from '../../components/Loader/Loader';
import PokemonItem from '../../components/PokemonItem/PokemonItem';
import PaginationBar from '../../components/Pagination/Pagination';

// Component Library
const { Header, Content, Footer } = Layout;

function PokemonsList() {
  const dispatch = useDispatch();
  const {
    pokemons,
    paginationPage,
    pokemonPerPage,
    count,
    loading,
  } = useSelector((state) => state.pokemons);
  const [paginateBy, setPaginateBy] = useState(pokemonPerPage || 50);
  const [currentPage, setCurrentPage] = useState(paginationPage || 1);

  useEffect(() => {
    dispatch(fetchPokemons({ paginateBy, currentPage }));
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, currentPage, paginateBy]);

  function renderPokemonItems(pokemonsList) {
    return pokemonsList.map(
      (pokemon) => (
        <Col
          className="gutter-row"
          xs={12}
          sm={8}
          md={6}
          lg={4}
          key={pokemon.id}
        >
          <PokemonItem
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.sprites.front_default}
            name={pokemon.name}
            types={pokemon.types}
          />
        </Col>
      ),
    );
  }

  function handlePagination(page, itemOnPage) {
    setCurrentPage(page);
    setPaginateBy(itemOnPage);
  }

  return (
    <>
      { loading && <Loader /> }

      <Header style={{ textAlign: 'center', color: '#fff', fontWeight: '800' }}>
        Poke API
      </Header>

      <Content style={{ padding: '16px', paddingBottom: '80px' }}>
        <Row gutter={16}>
          { pokemons && !loading && (
            renderPokemonItems(pokemons)
          )}
        </Row>
      </Content>
      <Footer style={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <PaginationBar
          pageLoad={loading}
          itemsCount={count}
          itemsPerPage={paginateBy}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </Footer>
    </>
  );
}

export default PokemonsList;
