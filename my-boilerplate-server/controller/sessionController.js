const asyncHandler = require('express-async-handler');
const Session = require('../models/sessionModel');
const { Schema } = require('mongoose');

// /**
//  * @description Get Specific Session
//  * @route GET /api/Sessions/:id
//  * @access private
//  */

// const getSession = asyncHandler(async function(req, res){
//     //const id = req.params.id;
//     //res.status(200).json({message:`get Session with id ${id}`})
//     const session = await Session.findById(req.params.id);
//     console.log(JSON.stringify(session));
//     if(!session){
//         res.status(404);
//         throw new Error(`Session not found`);
//     }
//     res.status(200).json(session);
// });

// /**
//  * @description Update Specific Session
//  * @route PUT /api/Sessions/:id
//  * @access private
//  */

// const updateSession = asyncHandler(async function(req, res){
//     //const id = req.params.id;
//     //res.status(200).json({message:`update Session with id ${id}`})
//     const session = await Session.findById(req.params.id);
//     console.log(JSON.stringify(session));
//     if(!session){
//         res.status(404);
//         throw new Error(`Session not found`);
//     }

//     if(session.user_id.toString() !== req.user.id){
//         res.status(403);
//         throw new Error("User donest' have permission to  update other user session")
//     }

//     const updatedSession = await Session.findByIdAndUpdate(
//         req.params.id, 
//         req.body,
//         {new: true}

//     )
//     res.status(200).json(updatedSession);


// });

// /**
//  * @description Delete Specific Session
//  * @route DELETE /api/Sessions/:id
//  * @access private
//  */

// const deleteSession = asyncHandler(async function(req, res){
//     //const id = req.params.id;
//     //res.status(200).json({message:`Delete Session with id ${id}`})
//     const session = await Session.findById(req.params.id);
//     console.log(JSON.stringify(session));
//     if(!session){
//         res.status(404);
//         throw new Error(`Session not found`);
//     }

//     if(session.user_id.toString() !== req.user.id){
//         res.status(403);
//         throw new Error("User donest' have permission to  update other user session")
//     }

//     console.log(typeof req.params.id)
//     await Session.deleteOne({_id : req.params.id});
//     res.status(200).json(session);
// });

// /**
//  * @description Post Specific Session
//  * @route   POST /api/Sessions/:id
//  * @access private
//  */

// const createSession = asyncHandler(async function(req, res){
//     console.log('reg.body === ',req.body)
//     const {name,age,email} = req.body
//     if(!email||!age||!name){
//         res.status(400) //.json({message:"all fields must be filled"})
//         throw new Error('All fields must be filled');
        
//     }
//     const session = await Session.create({
//         name,
//         email,
//         age,
//         user_id:req.user.id
//     })
//     //res.status(201).json({message:"create Session"})
//     res.status(201).json(session)

// })


/**
 * @description Get Specific Session
 * @route GET /api/Sessions/:id
 * @access private
 */

const getSession = asyncHandler(async function(req, res){
   
    //const id = req.params.id;
    //res.status(200).json({message:`get Session with id ${id}`})
    const id = req.params.id;
    console.log(typeof id,id)
    const session = await Session.find({session_id : id});
    console.log(JSON.stringify(session));
    if(session === undefined || session.length == 0){
        res.status(404);
        throw new Error(`Session not found`);
    }
    res.status(200).json(session);
 
});

/**
 * @description Update Specific Session
 * @route PUT /api/Sessions/:id
 * @access private
 */

const updateSession = asyncHandler(async function(req, res){
    
    //const id = req.params.id;
    //res.status(200).json({message:`update Session with id ${id}`})
    const id = req.params.id;
    const {userName, session_id} = req.body
    console.log("params session id === ",id)
    console.log("body session id === ",session_id)

    if(!userName|| !session_id){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error('All fields must be filled');
    }

    
    const session = await Session.findOne({session_id : id.trim() })
    //console.log("PUT line 141 ",JSON.stringify(session));
    console.log("before update line 146 ===",session, typeof session)
    if(!session){
        res.status(404);
        throw new Error(`Session not found`);
    } 
   
    if(session_id.trim() !== session.session_id.trim()){
        res.status(404);
        throw new Error(`Session id in params does not match session id in body`);
    }
  
    await Session.findOneAndReplace({_id : session._id}, req.body,{new : true});
   
    const updatedSession = await Session.findOne({session_id : session_id.trim()})
    console.log("after update ===",JSON.stringify(updatedSession));
    res.status(200).json(updatedSession);
    
});

/**
 * @description Delete Specific Session
 * @route DELETE /api/Sessions/:id
 * @access private
 */

const deleteSession = asyncHandler(async function(req, res){
    const id = req.params.id;    
    console.log("session id to delete === " + id);
    const session = await Session.find({session_id : id });
    console.log("line 49 session object",typeof session,JSON.stringify(session));
    if(session === undefined || session.length == 0){
        res.status(404);
        throw new Error(`Session not found`);
    }
    console.log(JSON.stringify(req.params.id))
  
    console.log(typeof req.params.id)
    await Session.deleteOne({session_id : req.params.id});
    res.status(200).json({message:`Delete Session with id ${id}`,session});
  
});

/**
 * @description Post Specific Session
 * @route   POST /api/Sessions/
 * @access private
 */

const createSession = asyncHandler(async function(req, res){
    console.log(req.body);
    console.log('reg.body === ',req.body)
    const {userName, session_id} = req.body
    if(!userName|| !session_id){
        res.status(400) //.json({message:"all fields must be filled"})
        throw new Error('All fields must be filled');
    }

    
    const session_created = await Session.find({session_id : session_id.trim() }).count() ;   
    console.log('mongo db session  === ',session_created);

    if(session_created !== 0){
        console.log("session in mongo === " + session_created);

        res.status(404);
        throw new Error(`Session id already exists`);
    }
        console.log("session in mongo === " + session_created);
 
    const session = await Session.create({
        userName : userName.trim(),
        session_id : session_id.trim(),                   
    })
    res.status(201).json({message:"create Session",session:session});
    
})



module.exports = {getSession, updateSession, deleteSession, createSession}