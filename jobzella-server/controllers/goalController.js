import Goal from "../models/goal.js";

export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve goal" });
  }
};

export const getAllGoals = async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const id = req.id;


    const page = parseInt(pageNumber) || 1;
    const limit = parseInt(pageSize) || 10;

    const skip = (page - 1) * limit;

    const filter ={
      user:id
    }

    const rows = await Goal.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const count = await Goal.countDocuments(filter);

    res.status(200).json({ rows, count });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve goals" });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, date } = req.body;

    const goal = await Goal.findById(id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    
    if (total <= 0) {
      return res.status(400).json({ message: "Total cannot be 0" });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: "Date cannot be in the past" });
    }

    goal.total = total;
    goal.date = date;

    await goal.save();

    res.status(200).json({ message: "Goal data updated successfully", goal });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Failed to update goal" });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { total, date } = req.body;

    
    if (total <= 0) {
      return res.status(400).json({ message: "Total cannot be 0" });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: "Date cannot be in the past" });
    }

    const goal = new Goal({
      total,
      date,
      user: req.id,
    });
    await goal.save();

    res.status(201).json({ message: "Goal created successfully", goal });
  } catch (error) {
    res.status(500).json({ message: "Failed to create goal" });
  }
};

export const deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGoal = await Goal.findByIdAndRemove(id);

    if (!deletedGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    return res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
