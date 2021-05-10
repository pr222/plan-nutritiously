export default (req, res) => {
  try {
    // console.log(req.body);
    const { foodItem } = req.body;
    res.status(200).json({
      name: foodItem.name,
      kcal: foodItem.nutrition.kcal,
    });
  } catch (error) {
    // console.log(error.message);
  }
};
