import Group from "../models/group.js";


export const getAllGroups = async (req, res) => {
  try {
    const id = req.id;

    const filter ={
      user:id
    }

    const rows = await Group.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ rows })
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve groups" });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    const group = new Group({
      name,
      user: req.id,
      image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
    });
    await group.save();

    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Failed to create group" });
  }
};

