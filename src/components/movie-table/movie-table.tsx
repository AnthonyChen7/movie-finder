import { useState, ChangeEvent, useEffect, ReactNode } from 'react';
import './movie-table.scss';

import { Table, Pagination, Message, Image, Popup } from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

import 'semantic-ui-css/semantic.min.css';
import { Movie } from '../../models/movie';

interface MovieTableProps {
  movies: Movie[];
}

const COLUMN_NAMES = [
  'Poster',
  'Name',
  'Released Date',
];

export default function MovieTable(props: MovieTableProps) {
  const { movies } = props;

  const [isValidMovies, setIsValidMovies] = useState(false);

  useEffect(() => {
    setIsValidMovies(movies !== undefined && movies !== null && movies.length > 0);
  }, [movies]);

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
          isValidMovies && movies.map(movie => {
            return  (
              // try https://github.com/littlebits/react-popover
              <Table.Row key={movie.name}>
                <Table.Cell >
                  <Popup
                    size="huge"
                    wide="very"
                    position="right center"
                    hideOnScroll={false}
                    trigger={
                      <Image centered src={movie.posterUrl} size='mini' />
                    }
                  >
                    <Image centered src={movie.posterUrl} size='massive' />
                  </Popup>
                </Table.Cell>
                <Table.Cell>{movie.name}</Table.Cell>
                <Table.Cell>{movie.releasedDate}</Table.Cell>
              </Table.Row>
            );
          })
        }
        {
          (!isValidMovies) && (
            <Table.Row>
              <Table.HeaderCell colSpan={COLUMN_NAMES.length} textAlign="center">
                <Message size="massive">No results to display</Message>
              </Table.HeaderCell>
            </Table.Row>
          )
        }
      </Table.Body>

      {isValidMovies && 
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