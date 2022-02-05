import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function PopUpMenu(props) {
  return (
    <div
      className={`pop-up-menu ${props.active ? "active" : ""}`}
      tabIndex={"0"}
    >
      <option className="pop-up-option" onClick={props.handleDelete}>
        Delete
      </option>
      <option className="pop-up-option">Edit</option>
    </div>
  );
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "New title",
      date: new Date(),
      content: "Enter your text here",
      showingPopUp: false,
    };
  }

  handleToggleMenu() {
    this.setState({
      showingPopUp: !this.state.showingPopUp,
    });
  }

  handleTitleInput(e) {
    const newTitle = e.target.textContent.trim();
    console.log(newTitle)

    this.setState({
      title: newTitle
    })
  }

  render() {
    const [day, month, year] = [
      this.props.date.getDate(),
      this.props.date.getMonth(),
      this.props.date.getFullYear(),
    ];

    return (
      <li className="note">
        <div className="note-info">

        <ThreeDotButton onClick={this.handleToggleMenu.bind(this)}/>

          <PopUpMenu
            active={this.state.showingPopUp}
            handleDelete={() => this.props.handleDelete(this.props.noteId)}>
          </PopUpMenu>

          <div 
            className="note-title" 
            contentEditable={true}
            onInput={(e) => {this.handleTitleInput(e)}}
          >
            {this.state.title}</div>
          <div className="note-date">
            created on {day}/{month}/{year}
          </div>
        </div>
        <div className="note-content" contentEditable={true}>{this.state.content}</div>
      </li>
    );
  }
}

function ThreeDotButton(props) {
  return (
    <div className="three-dot-button" onClick={props.onClick}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  handleDeleteNote(noteId) {
    const notes = [...this.state.notes];
    // const noteId = this.props.noteId;

    notes.splice(noteId, 1);
    console.log(notes)
    this.setState({
      notes: notes,
    });
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
          noteId={index}
          handleDelete={this.handleDeleteNote.bind(this)}
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
