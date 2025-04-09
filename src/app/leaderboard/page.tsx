// app/leaderboard/page.tsx
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const Leaderboard = () => {
  // Example leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'John Doe', points: 150 },
    { rank: 2, name: 'Jane Smith', points: 120 },
    { rank: 3, name: 'Sam Brown', points: 100 },
  ];

  return (
    <Container className="py-5">
      <h1>Leaderboard</h1>
      <ListGroup>
        {leaderboardData.map((entry) => (
          <ListGroupItem key={entry.rank} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>
                {entry.rank}
                .
                {' '}
                {entry.name}
              </strong>
            </div>
            <div>
              {entry.points}
              {' '}
              points
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Leaderboard;
