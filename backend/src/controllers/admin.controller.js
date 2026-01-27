import asyncHandler from "../middlewares/asyncHandler.js";
import Farm from "../models/farm.model.js";
const createFarm = asyncHandler(async (req, res) => {
    const { location, landSize, status,price } = req.body

    if (!location || !landSize || !price || !status || !req.file) {

        return res.status(400).json({
            message: "All feilds required"
        })
    }
    const farm = await Farm.create({
        location,
        landSize,
        status,
        price,
        assignedFarm: req.user,
        image: req.file.filename
    })
    return res.status(201).json({
        message: "farm created successfully",
        farm
    })

})
const gettingfarm = asyncHandler(async (req, res) => {
    const farm = await Farm.find()
    if (!farm) {
        return res.status(400).json({
            message: "farm not found"
        })
    }
    return res.status(200).json({
        message: "all farms",
        farm
    })

})
const updatingfarm = asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = { ...req.body }
    if (req.file) {
        data.image = req.file.filename
    }
    const updating = await Farm.findByIdAndUpdate(id,
        data,
        { new: true, runValidators: true }
    )
    if (!updating) {
        return res.status(400).json({ message: "not found" })
    }
    return res.status(200).json({
        message: 'updated successfully',
        updating
    })
})
const deletingfarm = asyncHandler(async (req, res) => {
    const { id } = req.params
    const farm = await Farm.findByIdAndDelete(id)
    if (!farm) {
        return res.status(400).json({
            message: 'farm not exist'
        })
    }
    return res.status(200).json({
        message: 'farm deleted successfully'
    })
})
export {
    createFarm,
    updatingfarm,
    deletingfarm,
    gettingfarm

}