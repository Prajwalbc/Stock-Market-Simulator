const { getScripPriceUpdateList } = require("../utils/webscrappers");

exports.getScripPriceUpdate = async (req, res) => {
  try {
    const { scripRouteNames } = req.body;
    // console.log(scripRouteNames);
    const data = await getScripPriceUpdateList(scripRouteNames);
    res.json({ success: true, data: data });
  } catch (err) {
    console.log(err.message);
    res.json({
      scripInfo: [],
      success: false,
      message: "Could'nt find stock details",
    });
  }
};
