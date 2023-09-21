import Group from "../models/group.js";

export const getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve group" });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const id = req.id;

    const filter ={
      user:id
    }

    const rows = await Group.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ rows });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve groups" });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name } = req.body;

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.name = name;

    await group.save();

    res.status(200).json({ message: "Group data updated successfully", group });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Failed to update group" });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    
   


    const group = new Group({
      name,
      user: req.id,
    });
    await group.save();

    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Failed to create group" });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGroup = await Group.findByIdAndRemove(id);

    if (!deletedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    return res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
