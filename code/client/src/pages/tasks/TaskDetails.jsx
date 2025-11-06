import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask } from "../../features/index.features";

function TaskDetails() {
  const { taskId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask(taskId));
  }, [taskId, dispatch]);

  const task = useSelector((state) => state.tasks.specificTask);
  console.log("SPECIFIC TASK: ", task);

  return <h1>Hey</h1>;
}

export default TaskDetails;
