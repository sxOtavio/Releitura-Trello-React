
import { ChevronLeftIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
function TaskPage(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const titulo = searchParams.get("titulo")
    const description = searchParams.get("description")
return <div>
    <div className="container">
    <div className="taskTitle">
    <button className="backButton" onClick={()=>{navigate(-1);}}><ChevronLeftIcon/></button>
    <div><h1>{titulo}</h1></div>
    </div>
   
    <div className="description"><h2>{description}</h2></div>
    </div>
</div>

}
export default TaskPage;