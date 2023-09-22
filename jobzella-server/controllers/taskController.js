import Task from "../models/task.js";

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const id = req.params.groupId;

    const filter ={
      groupId:id
    }

    const rows = await Task.find(filter).sort({ position: -1 });

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.name = name;

    await task.save();

    res.status(200).json({ message: "Task data updated successfully", task });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name,description,status,groupId } = req.body;
    const id = req.id
    const count = await Task.countDocuments()
    const task = new Task({
      name,
      description,
      status,
      groupId,
      progress: Math.random() < 0.5 ? 50 : 0,
      assignedUsers: [
        {_id:'1',name:'Ahmed',image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'},
        {_id:'2',name:'Mahmoud',image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'},
        {_id:'3',name:'Ebrahim',image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'}
      ],
      user:id,
      position:count+1
    });
    await task.save();



    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.log({error})
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndRemove(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const sortTasks = async (req, res) => {
  const { activeId,overId ,activeNewPanel} = req.body;

  try {
    let activeTask = await Task.findById(activeId);
    let overTask = await Task.findById(overId);

    if (!activeTask || !overTask) {
      return res.status(404).json({ error: "Tasks not found" });
    }

    const activePosition = activeTask.position;
    activeTask.position = overTask.position;
    overTask.position = activePosition;
    activeTask.status = activeNewPanel;
 
    await Promise.all([overTask.save(), activeTask.save()]);

    return res.json({ message: "Tasks sorted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};



