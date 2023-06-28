const documentRouter = require('./document');
const fileRouter = require('./file');
const invoiceRouter = require('./Invoice');
const messageRouter = require('./message');
const projectRouter = require('./project');
const taskRouter = require('./task');
const userProfileRouter = require('./userProfile');
const userRouter = require('./users');
const authRouter = require('./auth');

module.exports = function(app) {
    app.use('/documents', documentRouter);
    app.use('/users', userRouter);
    app.use('/files', fileRouter);
    app.use('/invoices', invoiceRouter);
    app.use('/messages', messageRouter);
    app.use('/projects', projectRouter);
    app.use('/tasks', taskRouter);
    app.use('/userProfiles', userProfileRouter);
    app.use('/auth', authRouter);
}