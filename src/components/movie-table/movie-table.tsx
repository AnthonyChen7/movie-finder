import { useState, ChangeEvent, useEffect, ReactNode } from 'react';
import './movie-table.scss';

import { Table, Pagination, Message, Image } from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

import 'semantic-ui-css/semantic.min.css';
import { Movie } from '../../models/movie';

interface MovieTableProps {
  movies?: Movie[];
}

const COLUMN_NAMES = [
  'Poster',
  'Name',
  'Released Date',
];

export default function MovieTable(props: MovieTableProps) {
  const { movies } = props;

  return (
    <Table celled striped>

      <Table.Header>
        {
          COLUMN_NAMES.map(columnName => {
            return (
              <Table.HeaderCell>{columnName}</Table.HeaderCell>
            );
          })
        }

      </Table.Header>

      <Table.Body>
        {
          movies && movies.length > 0 && movies.map(movie => {
            return  (
              <Table.Row key={movie.name}>
                <Table.Cell >
                  <Image centered src={movie.posterUrl} size='mini' />
                </Table.Cell>
                <Table.Cell>{movie.name}</Table.Cell>
                <Table.Cell>{movie.releasedDate}</Table.Cell>
              </Table.Row>
            );
          })
        }
        {
          (!movies || movies.length === 0) && (
            <Table.Row>
              <Table.HeaderCell colSpan={COLUMN_NAMES.length} textAlign="center">
                <Message size="massive">No results to display</Message>
              </Table.HeaderCell>
            </Table.Row>
          )
        }
      </Table.Body>

      {movies && movies.length > 0 && 
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={COLUMN_NAMES.length}>
            <Pagination
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={3}
            />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      }
    </Table>
  );
}