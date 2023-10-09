const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

// const MongooseConnect = "mongodb+srv://afaqahmed123:afaqahmed123@cluster0.zibstfo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB is connected!");
});
// mongoose.connect(MongooseConnect).then(() => {
//     console.log("MongoDB is connected!");
// });

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

const User = mongoose.model('users', UserSchema);
User.createIndexes();

const signupRoute = require('./routes/registration/signup');
const signinRoute = require('./routes/registration/signin');
const saveRecordRoute = require('./routes/records/records');
const saveNewComponentRoute = require('./routes/components/save-component'); 
const getComponentsRoute = require('./routes/components/get-component');
const getSearchItems = require('./routes/search');
const removeComponentRoute = require('./routes/components/remove-component');
const archiveQuote = require('./routes/records/archive-record');
const archiveComponent = require('./routes/components/archive-component');
const deleteRecord = require('./routes/records/delete-record')
const updateComponentCost = require('./routes/components/updateComponentPrice')
const getComponentCategory = require('./routes/components/get-component-category')
const deleteComponentFromRecord = require('./routes/records/delete-component')
const exportRecords = require('./routes/records/export-records')

app.use(signupRoute);
app.use(signinRoute);
app.use(saveRecordRoute);
app.use(saveNewComponentRoute);
app.use(getComponentsRoute);
app.use(getSearchItems);
app.use(removeComponentRoute);
app.use(archiveQuote);
app.use(archiveComponent);
app.use(deleteRecord);
app.use(updateComponentCost);
app.use(getComponentCategory);
app.use(deleteComponentFromRecord);
app.use(exportRecords);

app.get("/", (req, res) => {
    res.send("Server is Working");
});

app.listen(4000);

