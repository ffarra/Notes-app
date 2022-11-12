import './App.css';
import {AiFillDelete} from "react-icons/ai";
import {useState} from "react";
import {IoMdSearch} from "react-icons/io";

const data = [
    {
        text: 'First note',
        id: 1,
        date: '31.08.22',
    },
    {
        text: 'Second note',
        id: 2,
        date: '31.08.22',
    }
]

function App() {
    const [notes, setNotes] = useState(data)
    const [addNotes, setAddNotes] = useState('')
    const [changeMode, setChangeMode] = useState(false)
    const [searchNotes, setSearchNotes] = useState('')


    const limit = 200 - addNotes.length

    const addNote = (text) => {
        const date = new Date()
        const newNote = {
            text: text,
            id: 3,
            date: date.toLocaleDateString()
        }

        const newNotes = [...notes, newNote];
        setNotes(newNotes)
        setAddNotes('')
    }

    const handleSaveNote = () => {
        if(addNotes === '') return;
        addNote(addNotes)
    }

//     const filterBySearch = (e) => {
//         const query = e.target.value
//
//         let updatedList = [...notes];
//         updatedList = updatedList.filter((item) => {
//         return item.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
//     });
//     setNotes(updatedList);
//
// };

    const deleteNote = (index) => {
        let newNotes = [...notes]

        newNotes.splice(index, 1)
        setNotes(newNotes)
    }
  return (
   <div className={`${changeMode && 'dark-mode'}`}>
       <div className="App">

           <div className='header'>
               <h1>Notes</h1>
               <button onClick={() => {
                   setChangeMode(!changeMode)
               }} className='toggle-mode'>Toggle Mode</button>
           </div>

           <div className='search-note'>
               <IoMdSearch size={23}/>
               <input onChange={e => setSearchNotes(e.target.value)} placeholder='type the search...'/>
           </div>

           <div className='notes-box'>
               {notes.filter(note => note.text.toLowerCase().includes(searchNotes)).map((note, index) => (
                   <div key={index} className='note'>
                       <span>{note.text}</span>
                       <div className='note-footer'>
                           <span>{note.date}</span>
                           <button className='delete-button'>
                               <AiFillDelete size={20} onClick={() => deleteNote(index)}/>
                           </button>
                       </div>
                   </div>
               ))}

               <div className='note add-note'>
                   <textarea rows={8} cols={10} value={addNotes} onChange={ (e) => limit > 0 && setAddNotes(e.target.value)} placeholder='Type a note...'> </textarea>
                   <div className='note-footer'>
                       <span>{limit} Remaining</span>
                       <button className='save' onClick={handleSaveNote}>Save</button>
                   </div>
               </div>
           </div>
       </div>
   </div>
  );
}

export default App;
