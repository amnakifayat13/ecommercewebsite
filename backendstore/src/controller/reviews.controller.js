const Review = require("../models/reviews.model")

const createReview = async(req, res)=>{
    try{
        const {productId, userId, rating, comment} = req.body

        const review = new Review({
            productId, userId, rating, comment
        })

        const savedReview = await review.save()
        const newReview = await Review.findById(savedReview._id).populate("userId")

        res.status(201).json(newReview)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}


const getReview = async(req, res)=>{
    try{

        const productId = req.params.productId
        const reviews = await Review.find({productId}).populate("userId")
        res.json(reviews)
    }catch(error){
        res.status(500).json({message: error.message})   

    }
}

const updateReview = async(req, res)=>{
    try{
        const {rating, comment} = req.body
        const reviewId = req.params.id
        const updateReview = await Review.findByIdAndUpdate(reviewId, {rating, comment}, {new:true})

        if(!updateReview){
            return res.status(404).json({message: "Reviews not found"})
        }
        res.json(updateReview)

    }catch(error){
        res.status(500).json({message: error.message})   
    }
}

const deleteReview = async(req, res)=>{
    try{
        const reviewId = req.params.id
        const deleteReview = await Review.findByIdAndDelete(reviewId)
        if(!deleteReview){
            return res.status(404).json({message:"Reviews not found"})
        }
        res.json({message: "Review successfully deleted"})

    }catch(error){
        res.status(500).json({message: error.message})   
    }
}

module.exports = {

    createReview,
    getReview,
    updateReview,
    deleteReview


}