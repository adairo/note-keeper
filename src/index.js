import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function* generateId() {
  let id = 0;
  while (true) yield ++id;
}
const idGenerator = generateId();

function PopUpMenu(props) {
  return (
    <div
      className={`pop-up-menu ${props.active ? "active" : ""}`}
      tabIndex={"0"}
    >
      <option className="pop-up-option delete" onClick={props.onDelete}>
        Delete
      </option>
      {/* <option className="pop-up-option">Edit</option> */}
    </div>
  );
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showingPopUp: false };

    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
  }

  handleToggleMenu() {
    this.setState((state) => {
      return { showingPopUp: !state.showingPopUp };
    });
  }

  handleUpdateTitle(e) {
    const title = e.target.value;
    this.props.onUpdateTitle(this.props.id, title)
  }

  render() {
    const date = this.props.date.toLocaleString();

    return (
      <div className="note">
        <div className="note-info">
          <ThreeDotButton onClick={this.handleToggleMenu} />

          <PopUpMenu
            active={this.state.showingPopUp}
            onDelete={() => this.props.onDelete(this.props.id)}
          ></PopUpMenu>

          <input
            className="note-title"
            type="text"
            value={this.props.title}
            onChange={this.handleUpdateTitle}
            placeholder="Title"
          />

          <div className="note-date">created on {date}</div>
        </div>
        <textarea 
          className="note-content" 
          placeholder="Enter text"
          rows="2"
          value={this.props.content}
        >
          
        </textarea>
        </div>
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

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          title: "Note title",
          date: new Date(),
          content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          id: idGenerator.next().value,
        },
      ],
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  deleteNote(noteId) {
    const notes = [...this.state.notes];
    const index = notes.findIndex((note) => note.id === noteId);
    notes.splice(index, 1);

    this.setState({
      notes: notes,
    });
  }

  handleButtonClick(e) {
    const notes = [...this.state.notes];
    const newNote = {
      title: "",
      date: new Date(),
      content: "",
      id: idGenerator.next().value,
    };
    notes.push(newNote);
    this.setState({
      notes: notes,
    });
  }

  updateTitle(id, title) {
    const notes = [...this.state.notes];
    const current = notes.find(note => note.id === id);
    current.title = title;

    this.setState({ notes });

  }

  render() {
    const notesComponents = this.state.notes.map((note) => {
      return (
        <Note
          // spread all the note properties, like title, date, etc.
          {...note}
          key={note.id}
          onDelete={this.deleteNote}
          onUpdateTitle={this.updateTitle}
        />
      );
    });
    return (
      <ul className="notes-container">
        {notesComponents}

        <button className="new-note-button" onClick={this.handleButtonClick}>
          New note
        </button>
      </ul>
    );
  }
}

function App() {
  return <NotesContainer />;
}

ReactDOM.render(<App />, document.getElementById("root"));
