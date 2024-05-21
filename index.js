const escpos = require('escpos')
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb')
// Select the adapter based on your printer type
const device = new escpos.USB(1155, 22339)
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

console.log(device)
const printer = new escpos.Printer(device, {
	encoding: 'GB18030'
})
console.log(printer)

device.open(function (err) {
	if (err) throw err
	// printer.cut()
	// 	device.write(
	// 		Buffer.from(`SET TEAR ON
	// SPEED 1.0
	// DENSITY 7
	// size 40 mm,30 mm
	// CLS
	// TEXT 8,24,"TESS24.BF2",0,1,1,"nayotta"
	// PRINT 1`)
	// 	)
	printer
		.font('a')
		.align('ct')
		.style('bu')
		.size(1, 1)
		.text('The quick brown fox jumps over the lazy dog')
		.text('敏捷的棕色狐狸跳过懒狗')
		.barcode('1234567', 'EAN8')
		.qrimage('https://github.com/song940/node-escpos', function (err) {
			console.log(err)
			this.cut()
			this.close()
		})
})
