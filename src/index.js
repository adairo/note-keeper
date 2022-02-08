import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function* generateId() {
  let id = 0;
  while (true) yield ++id;
}
const idGenerator = generateId();

class PopUpMenu extends React.Component {
  constructor(props) {
    super(props);
    this.popUpMenu = React.createRef();
  }

  componentDidMount() {
    this.popUpMenu.current.focus();
  }
  render() {
    return (
      <div
        ref={this.popUpMenu}
        className={`pop-up-menu`}
        tabIndex={"0"}
        onBlur={this.props.onClose}
      >
        <option className="pop-up-option delete" onClick={this.props.onDelete}>
          Delete
        </option>
        {/* <option className="pop-up-option">Edit</option> */}
      </div>
    );
  }
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showingPopUp: false };
    this.popUpMenu = React.createRef();

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleContentUpdate = this.handleContentUpdate.bind(this);
  }

  handleOpenMenu() {
    this.setState({ showingPopUp: true });
  }

  handleCloseMenu() {
    this.setState({ showingPopUp: false });
  }

  handleTitleUpdate(e) {
    const title = e.target.value;
    this.props.onTitleUpdate(this.props.id, title);
  }

  handleContentUpdate(e) {
    const content = e.target.value;
    this.props.onContentUpdate(this.props.id, content);
  }

  render() {
    const date = this.props.date.toLocaleString();
    const content = this.props.content;

    return (
      <div className="note">
        <div className="note-info">
          <ThreeDotButton onClick={this.handleOpenMenu} />
          {this.state.showingPopUp && (
            <PopUpMenu
              ref={this.popUpMenu}
              active={this.state.showingPopUp}
              onDelete={() => this.props.onDelete(this.props.id)}
              onClose={this.handleCloseMenu}
            />
          )}

          <input
            className="note-title"
            type="text"
            value={this.props.title}
            onChange={this.handleTitleUpdate}
            placeholder="Title"
          />

          <div className="note-date">{date}</div>
        </div>
        <textarea
          className="note-content"
          placeholder="Enter text"
          onChange={this.handleContentUpdate}
          value={content}
        />
      </div>
    );
  }
}

function ThreeDotButton(props) {
  return (
    <div className="three-dot-button" onClick={props.onClick} tabIndex="0">
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
      notes: [],
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
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
    const current = notes.find((note) => note.id === id);
    current.title = title;

    this.setState({ notes });
  }

  updateContent(id, content) {
    const notes = [...this.state.notes];
    const current = notes.find((note) => note.id === id);
    current.content = content;

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
          onTitleUpdate={this.updateTitle}
          onContentUpdate={this.updateContent}
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
