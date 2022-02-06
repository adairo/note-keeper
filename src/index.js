import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function *generateId() {
  let id = 0;
  while (true)
    yield ++id
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
    this.state = {showingPopUp: false}

    this.handleToggleMenu = this.handleToggleMenu.bind(this)
  }

  handleToggleMenu() {
    this.setState(state => {
      return {showingPopUp: !state.showingPopUp}
    })
  }

  handleTitleInput(e) {
    const newTitle = e.target.textContent.trim();
    console.log(newTitle)

    this.setState({
      title: newTitle
    })
  }

  render() {
    const date = this.props.date.toLocaleString();

    return (
      <li className="note">
        <div className="note-info">

        <ThreeDotButton onClick={this.handleToggleMenu}/>

          <PopUpMenu
            active={this.state.showingPopUp}
            onDelete={() => this.props.onDelete(this.props.id)}>
          </PopUpMenu>

          <div 
            className="note-title" 
            // contentEditable={true}
            onInput={(e) => {this.handleTitleInput(e)}}
          >
            {this.props.title}</div>
          <div className="note-date">
            created on {date}
          </div>
        </div>
        <div className="note-content" >{this.props.content}</div>
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

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{
        title: "hi",
        date: new Date(),
        content: "content",
        id: 12
      }],
    };

    this.deleteNote = this.deleteNote.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  deleteNote(noteId) {
    const notes = [...this.state.notes];
    const index = notes.findIndex(note => note.id === noteId)
    notes.splice(index, 1);

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
      id: idGenerator.next().value
    };
    notes.push(newNote);
    this.setState({
      notes: notes,
    });
  }

  render() {
    const notesComponents = this.state.notes.map( note => {
      return (
        <Note
          // spread all the note properties, like title, date, etc.
          {...note} 
          key={note.id}
          onDelete={this.deleteNote}
        />
      );
    });
    return (
      <ul className="notes-container">
        {notesComponents}

        <button
          className="new-note-button"
          onClick={this.handleButtonClick}
        >
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
