const { logger } = require("../Email/nodemailerConfig");

const executeHook=async(hookfn,context)=>{
    if(typeof hookfn === 'function'){
        try {
            await hookfn(context)
        } catch (error) {
            logger.error('Hook error',error.message)
            console.error('Hook error',error.message)
            throw error;
        }
    }
}

const validateFormat=async({email})=>{
    logger.warn('pre-hook:for testing email format')
    console.log('pre-hook:for testing email format')
    if(!email || !email.includes('@') || !email.includes('.')){
        logger.error('Invalid email format')
        throw new Error('Invalid email format')
    }
}

const loginAttempt=async({user})=>{
    logger.info('Post-hook: Logging user login attempt...')
    console.log("Post-hook: Logging user login attempt...");
    if (user) {
        logger.info(`User with email ${user.email} logged in at ${new Date().toISOString()}`)
        console.log(`User with email ${user.email} logged in at ${new Date().toISOString()}`);
    }
}

module.exports = {executeHook, validateFormat, loginAttempt,};