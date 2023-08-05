const PNG = require('pngjs').PNG;

module.exports = (app) => {
    app.get("/color/:hexCode", (req, res) => {
        const png = new PNG({ width: 1, height: 1 });

        const hex = req.params.hexCode || "DEDEDE"
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
      
        const pixelData = Buffer.from([r, g, b, 255]); // RGB with alpha
      
        png.data = pixelData;
      
        png.pack().pipe(res);
    })
}