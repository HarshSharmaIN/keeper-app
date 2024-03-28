import { useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    const titleRef = useRef();
    const contentRef = useRef();  

    async function submitNote(event) {
        event.preventDefault();
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const {data} = await axios.post(`${import.meta.env.VITE_SERVER_API}/notes`,{title: title, content: content},{withCredentials: true});
        console.log(data);
        if (data.success === true) {
            toast.success("Note Created", {
                position: "bottom-right",
            });
        } else {
            toast.error("Error creating Note!", {
                position: "bottom-right",
            });
        }
        props.update();
        titleRef.current.value = '';
        contentRef.current.value = '';
    }

    function expand() {
        setExpanded(true);
    }

    return (
        <div>
        <form className="create-note">
            <input
                name="title"
                ref={titleRef}
                placeholder="Title"
                onClick={expand}
            />
            {isExpanded && ( 
                <textarea
                    name="content"
                    ref={contentRef}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                />
            )}
            <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
                <AddIcon />
            </Fab>
            </Zoom>
        </form>
        <ToastContainer />
        </div>
    );
}

export default CreateArea;