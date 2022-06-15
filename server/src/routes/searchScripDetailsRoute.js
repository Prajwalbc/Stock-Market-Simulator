const { getScripInfoSearch } = require("../utils/webscrappers");

exports.searchScripDetails = async (req, res) => {
  try {
    const { scrip } = req.params;
    const parsedScripName = scrip.toString().replace(/_/g, " ");
    const scripInfo = await getScripInfoSearch(parsedScripName);
    // console.log(parsedScripName);
    res.json({ success: true, scripInfo: scripInfo });
  } catch (err) {
    console.log(err.message);
    res.json({
      scripInfo: [],
      success: false,
      message: "Could'nt find stock details",
    });
  }
};
