const { getScripInfoDirect } = require("../utils/webscrappers");

exports.getScripDetails = async (req, res) => {
  try {
    const { scripRouteName } = req.params;
    // console.log(scripRouteName);
    const scripInfo = await getScripInfoDirect(scripRouteName);
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
