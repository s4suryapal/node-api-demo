exports.getAll = Model =>
    async (req, res, next) => {
        const docs = await Model.find();

        res.status(200).json({
            message: 'success',
            total: docs.length,
            response: {
                data: docs
            }
        });
        
    };

exports.getOne = Model =>
    async (req, res, next) => { 
        let doc = await Model.findById(req.params.id);

        if (!doc) {
            return res.status(404).json('No Record Found!');
        }

        res.status(200).json({
            message: 'success',
            total: docs.length,
            response: {
                data: docs
            }
        });
    }

exports.createOne = (Model,checkUnique = {}) =>
    async (req, res, next) => {
        if(Object.keys(checkUnique).length > 0) {
            let uniqueFied =  checkUnique[Object.keys(checkUnique)[0]];
            let doc = await Model.findOne({ [uniqueFied] : req.body[uniqueFied] });
            if(doc) return res.status(400).json('Record Exist!');
        } 

        const doc = await Model.create(req.body);
        
        res.status(200).json({
            message: 'success',
            total: doc.length,
            response: {
                data: doc
            }
        });
    };    



exports.deleteOne = Model => 
    async(req, res,next) => {
        
        const doc = await Model.findByIdAndDelete(req.params.id);
        
        if (!doc) {
            return res.status(404).json('No Record Found!');
        }

        res.status(200).json({
            message: 'success',
            response: {
                data: doc
            }
        });
        
    }

exports.deleteAll = Model =>
    async(req, res,next) => {

        const doc = await Model.collection.drop();
        if (!doc) return res.status(404).json('No Record Found!');

    
        res.status(200).json({
            message: 'success',
            total: doc.length,
            response: {
                data: doc
            }
        });
    }

exports.updateOne = Model =>
    async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        if (!doc) {
            return res.status(404).json('No Record Found!');
        }

        res.status(200).json({
            message: 'success',
            total: doc.length,
            response: {
                data: doc
            }
        });
    };    