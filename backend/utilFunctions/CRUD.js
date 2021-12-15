let createElement = (givenModel) => {
    return async (req, res) => {
        try {
            let element = req.body;
            let createdEle = await givenModel.create(element);
            res.status(200).json({
                message: "Created",
                createdEle
            })

        } catch (err) {
            res.status(500).json({
                message: "err " + err
            })
        }
    }
}

let deleteElement = (givenModel) => {
    return async (req, res) => {
        try {
            let id = req.params.id;
            let element = await givenModel.findByIdAndDelete(id);
            if (element) {
                res.status(200).json({
                    element,
                    message: "Deleted"
                })
            }
            else {
                res.status(200).json({
                    message: "id is not correct"
                })
            }
        }
        catch (err) {
            res.status(500).json({
                message: "err " + err
            })
        }
    }
}

let updateElement = (givenModel) => {
    return async (req, res) => {
        try {
            let id = req.params.id;
            let element = await givenModel.findById(id);
            if (element) {
                for (key in req.body) {
                    element[key] = req.body[key]
                }
                let newElement = await element.save();
                res.status(200).json({
                    message: "Updated",
                    newElement
                })
            }
            else {
                res.status(200).json({
                    message: "id is not correct"
                })
            }
        }
        catch (err) {
            res.status(500).json({
                message: "err " + err
            })
        }
    }
}

let getAllElements = (givenModel) => {
    return async (req, res) => {
        try {
            let allElements = await givenModel.find();
            res.status(200).json({
                allElements
            })
        } catch (err) {
            res.status(500).json({
                message: "err " + err
            })
        }
    }
}

let getElementById = (givenModel) => {
    return async (req, res) => {
        try {
            let id = req.params.id;
            let element = await givenModel.findById(id);
            if (element) {
                res.status(200).json({
                    element
                })
            }
            else {
                res.status(200).json({
                    message: "id is not correct"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "err " + err
            })
        }
    }
}

module.exports = {
    getElementById,
    getAllElements,
    updateElement,
    deleteElement,
    createElement
}