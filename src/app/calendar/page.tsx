/* eslint-disable react/jsx-indent */
/* eslint-disable react/self-closing-comp */
// eslint-disable-next-line no-multiple-empty-lines

'use client';

import { Nav } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
/** The Home page. */
interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}
const Home = () => {
  const events: Event[] = []; // Define your events array here

  return (
  <>
    <Nav className="flex justify-between bg-light mb-12 border-b border-violet-100 p-4">
      <h1 className="font-bold-2x1 text-light-700">Calendar</h1>
    </Nav>
    <main>
      <div className="grid grid-cols-10 bg-light">
        <div className="col-span-8">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={[]}
            editable
            selectable
            droppable
            selectMirror
            dayMaxEvents
            weekends
            initialDate={new Date()}
            // drop={}
           // eventclick={[]}
          />
        {Array.isArray(events) && events.map((event) => (
          <div id="draggable-element" className="bg-blue-500 text-white p-2 rounded shadow-md" key={event.id}>
            <h1>Draggable Event</h1>
            <div
              className="fc-event border-2 p-1 m-2 w-full rounded-md m1-auto text-center bg-white"
            >
              {event.title}
            </div>
          </div>
        ))}
        </div>
      </div>
    </main>
  </>
  );
};
export default Home;
