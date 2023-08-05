const router = require('express').Router();

require("./docs")(router)
require("./id")(router)
require("./badgeMaker")(router)
require("./cat")(router)
require("./color")(router)
require("./headers")(router)
require("./konig")(router)
require("./embed")(router)

module.exports = router;