const router = require('express').Router();

require("./docs")(router)
require("./id")(router)
require("./badgeMaker")(router)
require("./cat")(router)
require("./headers")(router)
require("./embed")(router)
require("./discord")(router)

module.exports = router;