import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Note(props) {
  const [day, month, year] = [
    props.date.getDate(),
    props.date.getMonth(),
    props.date.getFullYear(),
  ];

  return (
    <li className="note">
      <div className="note-info">
        <div className="note-title" contentEditable>{props.title}</div>
        <div className="note-date" >
          created on {day}/{month}/{year}
        </div>
      </div>
      <div className="note-content" contentEditable>{props.content}</div>
    </li>
  );
}

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          title: "My first note",
          date: new Date(),
          content: "This is my first note ever",
        },
      ],
    };
  }

  handleButtonClick(e) {
    const notes = [...this.state.notes];
    const newNote = {
      title: "Title",
      date: new Date(),
      content: "Enter text",
    };
    notes.push(newNote);
    this.setState({
      notes: notes,
    });
  }

  render() {
    const notesComponents = this.state.notes.map((note, index) => {
      return (
        <Note
          title={note.title}
          date={note.date}
          content={note.content}
          key={index}
        />
      );
    });
    return (
      <ul className="notes-container">
        {notesComponents}
        <button
          className="new-note-button"
          onClick={(e) => this.handleButtonClick(e)}
        >
          New note
        </button>
      </ul>
    );
  }
}

function App() {
  return <Notes />;
}

ReactDOM.render(<App />, document.getElementById("root"));
