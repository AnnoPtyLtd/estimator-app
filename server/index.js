const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const app = express();
app.use(express.json());
app.use(cors());

const MongooseConnect = "mongodb+srv://afaqahmed123:afaqahmed123@cluster0.zibstfo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MongooseConnect).then(() => {
    console.log("MongoDB is connected!");
});

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

const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
const saveRecordRoute = require('./routes/records');
const saveNewComponentRoute = require('./routes/save-component'); 
const getComponentsRoute = require('./routes/get-component');
const getSearchItems = require('./routes/search');
const removeComponentRoute = require('./routes/remove-component');
const archiveQuote = require('./routes/archive-record');


app.use(signupRoute);
app.use(signinRoute);
app.use(saveRecordRoute);
app.use(saveNewComponentRoute);
app.use(getComponentsRoute);
app.use(getSearchItems);
app.use(removeComponentRoute);
app.use(archiveQuote);

app.get("/", (req, res) => {
    res.send("Server is Working");
});

app.listen(4000);

