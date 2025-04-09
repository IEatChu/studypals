// app/calendar/page.tsx
import { Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const Calendar = () => {
  // Example study sessions
  const studySessions = [
    { id: 1, topic: 'Write Essay on Configuration Management', time: '8:30 PM - 9:30 PM' },
    { id: 2, topic: 'Algorithm Help', time: '10:00 AM - 11:00 AM' },
    { id: 3, topic: 'Data Structures Review', time: '2:00 PM - 3:00 PM' },
  ];

  return (
    <Container className="py-5" style={{ color: 'white' }}>
      <h1>Calendar</h1>
      <ListGroup>
        {studySessions.map((session) => (
          <ListGroupItem key={session.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{session.topic}</strong>
              <br />
              <small>{session.time}</small>
            </div>
            <Button variant="primary">Join Session</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Calendar;
