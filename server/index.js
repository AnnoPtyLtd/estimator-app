const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(express.json());

// app.use(
//     cors({
//         origin: ["https://estimator-frontend.vercel.app"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you need.
//     })
// );

app.use(cors());

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

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected.");
});
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
const getComponentsLength = require('./routes/components/get-components-length');
const getUserInfo = require('./routes/user/get-user');
const getQuote = require('./routes/records/get-quote');
const filterArhchivedQuote = require('./routes/records/filter-archived')
const addPrebuildQuote = require('./routes/records/add-prebuild');

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
app.use(getComponentsLength);
app.use(getUserInfo);
app.use(getQuote);
app.use(filterArhchivedQuote);
app.use(addPrebuildQuote);

app.get("/", (req, res) => {
    res.send("Server is Working");
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

