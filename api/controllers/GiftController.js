/**
 * GiftController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    usergiftsearch: async function (req, res) {
        var models = await Gift.find().sort([{ id: 'DESC' }]);
        return res.view('gift/usergiftsearch', { gift: models });
    },

    usergiftresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qGiftname = req.query.giftname;
        const qAmount = parseInt(req.query.amount);
        const qValue = parseInt(req.query.value);
        const qDontator = req.query.donator;

        if (isNaN(qAmount) && isNaN(qValue)) {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        } else if (isNaN(qAmount)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else if (isNaN(qValue)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }

        return res.view('gift/usergiftresult', { gift: models });

    },

    usergiftdetail: async function (req, res) {

        var model = await Gift.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('gift/usergiftdetail', { gift: model });

    },

    admingiftsearch: async function (req, res) {
        var models = await Gift.find().sort([{ id: 'DESC' }]);
        return res.view('gift/admingiftsearch', { gift: models });
    },

    admingiftresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qGiftname = req.query.giftname;
        const qAmount = parseInt(req.query.amount);
        const qValue = parseInt(req.query.value);
        const qDontator = req.query.donator;

        if (isNaN(qAmount) && isNaN(qValue)) {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        } else if (isNaN(qAmount)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else if (isNaN(qValue)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }

        return res.view('gift/admingiftresult', { gift: models });

    },

    admingiftdetail: async function (req, res) {

        var model = await Gift.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('gift/admingiftdetail', { gift: model });

    },

    admingiftedit: async function (req, res) {
        var models = await Gift.find().sort([{id:'DESC'}]);
        return res.view('gift/admingiftedit', { gift: models});
    },

     // action - adminupdate
     admingiftupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await Gift.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('gift/admingiftupdate', { gift: model });

        } else {

            if (!req.body.Gift)
                return res.badRequest("Form-data not received.");

            var models = await Gift.update(req.params.id).set({
                giftname: req.body.Gift.giftname,
                category: req.body.Gift.category,
                location: req.body.Gift.location,
                photo: req.body.Gift.photo,
                donator: req.body.Gift.donator,
                value: req.body.Gift.value,
                amount: req.body.Gift.amount,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/gift/admingiftedit");

        }
    },

    // action - delete 
    admingiftdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Gift.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.redirect("/gift/admingiftedit");

    },

    import_xlsx: async function(req, res) {

        if (req.method == 'GET')
            return res.view('gift/import_xlsx');
    
        req.file('file').upload({maxBytes: 10000000}, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0){ return res.badRequest('No file was uploaded'); }
    
            var XLSX = require('xlsx');
            var workbook = XLSX.readFile(uploadedFiles[0].fd);
            var ws = workbook.Sheets[workbook.SheetNames[0]];
            var data = XLSX.utils.sheet_to_json(ws);
            console.log(data);
            var models = await Game.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect("/gift/admingiftedit");
        });
    },




};

