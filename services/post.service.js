const { Op } = require("sequelize")
const ApiError = require("../helpers/ApiError")
const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const User = require("../models/user")

const getPosts = async({zip_code, willing_travel_distance, time_period, dog_preferance}) => {
    const userConditon = {
        is_verified: true,
        firstname: {
            [Op.not]: null
        },
        lastname: {
            [Op.not]: null
        },
        email: {
            [Op.not]: null
        },
        password: {
            [Op.not]: null
        },
        zipCode: {
            [Op.not]: null
        },
        phone: {
            [Op.not]: null
        },
        willing_travel_distance: {
            [Op.not]: null
        },
        activity_type: {
            [Op.not]: null
        },
        spay_neuter_prefes: {
            [Op.not]: null
        },
        shedding_prefs: {
            [Op.not]: null
        },
        house_training_prefs: {
            [Op.not]: null
        },
        dog_left_alone_prefs: {
            [Op.not]: null
        },
        have_a_cat: {
            [Op.not]: null
        },
        tc_accepted: {
            [Op.not]: null
        },
        profile_pic: {
            [Op.not]: null
        },
        
    }
    if(zip_code) userConditon.zipCode = zip_code
    if(willing_travel_distance) userConditon.willing_travel_distance = willing_travel_distance
    // if(time_period) userConditon
    const posts = await Post.findAll({
        where: {
            is_live: true,
            end_date: { [Op.gte]: new Date() }
        },
        include: [{
            model: User,
            where: userConditon,
            attributes: ['id', 'firstname', 'lastname', 'zipCode', 'profile_pic'],
            include: [
                {
                    model: Review,
                    as: 'reviews',
                    where: { is_live: true },
                    required: false,
                    attributes: [
                    "id",
                    "source_id",
                    "target_id",
                    "rating",
                    "review"
                    ]
                },
                { model: Point, as: 'point', required: false, attributes: ['points'] }
            ]
        }],
        attributes: {exclude: ['is_live', 'createdAt', 'updatedAt', 'deletedAt']}
    })

    if(!posts) throw new Error("No posts found")
    posts.forEach(post => {
        if(post.user.reviews && post.user.reviews.length) {
            const  totalRating = post.user.reviews.reduce((acc, review) => acc + review.rating, 0);
            const avgRating = totalRating / post.user.reviews.length;
            post.user.dataValues.user_rating = avgRating
        } else {
            post.user.dataValues.user_rating = 0;
        }
    })
    return posts
}

const getPost = async(id) => {
    const post = await Post.findOne(id)
    return post
}

const createPost = async({user_id, start_date, end_date, is_live}) => {
    const userConditon = {
    }
    const isAnyRowEmpty = await User.findOne({
        where: {
            id: user_id,
            [Op.or]: [
                { firstname: null },
                { lastname: null },
                { email: null },
                { password: null },
                { zipCode: null },
                { phone: null },
                { willing_travel_distance: null },
                { activity_type: null },
                { spay_neuter_prefes: null },
                { shedding_prefs: null },
                { house_training_prefs: null },
                { dog_left_alone_prefs: null },
                { have_a_cat: null },
                { tc_accepted: null },
                { profile_pic: null },
            ]
        }
    })
    if(isAnyRowEmpty) throw new ApiError(422, "Profile data incomplete")
    const postExists = await Post.findOne({
        where: {
            userId: user_id,
            deletedAt: null,
            end_date: { [Op.gte]: new Date() }
        }
    })
    if(postExists) throw new ApiError(409, "You already have a live post")
    const post = await Post.create({
        userId: user_id,
        // additional_info,
        start_date,
        end_date,
        is_live,
        created_at: new Date(),
        updated_at:new Date(),
        deleted_at:null
    })
    return post
}

module.exports = {
    getPosts,
    getPost,
    createPost,
}