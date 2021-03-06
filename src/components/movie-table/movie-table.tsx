import { useState, useEffect } from 'react';
import './movie-table.scss';

import { Table, Pagination, Message, Image, Icon } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css'
import { Movie } from '../../models/movie';
import { Popover } from 'antd';

interface MovieTableProps {
  movies: Movie[];
  watchLaterToggled: (shouldWatchLater: boolean, movieName: string) => void;
}

const COLUMN_NAMES = [
  'Poster',
  'Name',
  'Released Date',
  ''
];

export default function MovieTable(props: MovieTableProps) {
  const { movies } = props;

  const [isValidMovies, setIsValidMovies] = useState(false);

  useEffect(() => {
    setIsValidMovies(movies !== undefined && movies !== null && movies.length > 0);
  }, [movies]);

  const watchLaterClicked = (shouldWatchLater: boolean, movieName: string) => {
    props.watchLaterToggled(shouldWatchLater, movieName);
  };

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
              // don't use semantic ui react popover as it doesn't get displayed properly
              <Table.Row key={movie.name}>
                <Table.Cell >
                <Popover content={
                  <Image centered src={movie.posterUrl} size='large' />
                }>
                  <Image centered src={movie.posterUrl} size='mini' />
                </Popover>
                </Table.Cell>
                <Table.Cell>{movie.name}</Table.Cell>
                <Table.Cell>{movie.releasedDate}</Table.Cell>
                <Table.Cell textAlign="center">
                  {
                    !movie.shouldWatchLater &&
                    <Popover content="add to watch later">
                      <Icon name="clock outline" onClick={() => watchLaterClicked(true, movie.name)}/>
                    </Popover>
                  }
                  {
                    movie.shouldWatchLater &&
                    <Popover content="remove from watch later">
                      <Icon name="clock" onClick={() => watchLaterClicked(false, movie.name)}/>
                    </Popover>
                  }

                </Table.Cell>
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