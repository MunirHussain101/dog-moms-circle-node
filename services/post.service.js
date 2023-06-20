const { Op } = require("sequelize")
const ApiError = require("../helpers/ApiError")
const Point = require("../models/point")
const Post = require("../models/post")
const Review = require("../models/review")
const User = require("../models/user")
const io = require('../socket')

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
    console.log('Haha',io.getClients())
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

async function checkData(user_id) {
    const fn = await User.findOne({
        where: {
            id: user_id,
            firstname: null
        }
    })
    if(fn) throw new ApiError(422, "Firstname missing")

    const ln = await User.findOne({
        where: {
            id: user_id,
            lastname: null
        }
    })
    if(ln) throw new ApiError(422, "lastname missing")

    const email = await User.findOne({
        where: {
            id: user_id,
            email: null
        }
    })
    if(email) throw new ApiError(422, "email missing")
    
    const pass = await User.findOne({
        where: {
            id: user_id,
            password: null
        }
    })
    if(pass) throw new ApiError(422, "password missing")
    
    const zip = await User.findOne({
        where: {
            id: user_id,
            zipCode: null
        }
    })
    if(zip) throw new ApiError(422, "zipCode missing")
    
    const phone = await User.findOne({
        where: {
            id: user_id,
            phone: null
        }
    })
    if(phone) throw new ApiError(422, "phone missing")

    const wtd = await User.findOne({
        where: {
            id: user_id,
            willing_travel_distance: null
        }
    })
    if(wtd) throw new ApiError(422, "willing_travel_distance missing")
    
    const at = await User.findOne({
        where: {
            id: user_id,
            activity_type: null
        }
    })
    if(at) throw new ApiError(422, "activity_type missing")
    
    const snp = await User.findOne({
        where: {
            id: user_id,
            spay_neuter_prefes: null
        }
    })
    if(snp) throw new ApiError(422, "spay_neuter_prefes missing")

    const sp = await User.findOne({
        where: {
            id: user_id,
            shedding_prefs: null
        }
    })
    if(sp) throw new ApiError(422, "shedding_prefs missing")
    
    const htp = await User.findOne({
        where: {
            id: user_id,
            house_training_prefs: null
        }
    })
    if(htp) throw new ApiError(422, "house_training_prefs missing")
    
    const dlap = await User.findOne({
        where: {
            id: user_id,
            dog_left_alone_prefs: null
        }
    })
    if(dlap) throw new ApiError(422, "dog_left_alone_prefs missing")
    
    const hac = await User.findOne({
        where: {
            id: user_id,
            have_a_cat: null
        }
    })
    if(hac) throw new ApiError(422, "have_a_cat missing")
    
    const tc = await User.findOne({
        where: {
            id: user_id,
            tc_accepted: null
        }
    })
    if(tc) throw new ApiError(422, "tc_accepted missing")
    
    const pp = await User.findOne({
        where: {
            id: user_id,
            profile_pic: null
        }
    })
    if(pp) throw new ApiError(422, "profile_pic missing")

    // const isAnyRowEmpty = await User.findOne({
    //     where: {
    //         id: user_id,
    //         [Op.or]: [
    //             { firstname: null },
    //             { lastname: null },
    //             { email: null },
    //             { password: null },
    //             { zipCode: null },
    //             { phone: null },
    //             { willing_travel_distance: null },
    //             { activity_type: null },
    //             { spay_neuter_prefes: null },
    //             { shedding_prefs: null },
    //             { house_training_prefs: null },
    //             { dog_left_alone_prefs: null },
    //             { have_a_cat: null },
    //             { tc_accepted: null },
    //             { profile_pic: null },
    //         ]
    //     }
    // })
    // if(isAnyRowEmpty) throw new ApiError(422, "Profile data incomplete")
}
const createPost = async({user_id, start_date, end_date, is_live}) => {
    // const isAnyRowEmpty = await User.findOne({
    //     where: {
    //         id: user_id,
    //         [Op.or]: [
    //             { firstname: null },
    //             { lastname: null },
    //             { email: null },
    //             { password: null },
    //             { zipCode: null },
    //             { phone: null },
    //             { willing_travel_distance: null },
    //             { activity_type: null },
    //             { spay_neuter_prefes: null },
    //             { shedding_prefs: null },
    //             { house_training_prefs: null },
    //             { dog_left_alone_prefs: null },
    //             { have_a_cat: null },
    //             { tc_accepted: null },
    //             { profile_pic: null },
    //         ]
    //     }
    // })
    // if(isAnyRowEmpty) throw new ApiError(422, "Profile data incomplete")
    // try {

    await checkData(user_id)
    // }
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
    checkData
}