const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb")
const app = express();

app.use(express.json());
app.use(cors());

let db;
const client = new MongoClient("mongodb://localhost:27017", {
});
client.connect().then(() => {
    db = client.db("IIT67");
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB unconnect");
});


// ดึงข้อมูลทั้งหมด
app.get('/student', async (req, res) => {
    try {
        const student = await db.collection("student").find().toArray();
        res.json(student);
    } catch (err) {
        res.json("error");
    }
});

// app.use('/frontend', express.static('frontend'));

// ดึงข้อมูลอันเดียว
app.delete('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.collection("student").deleteOne({
            "stid": id
        });

        // ตรวจสอบว่าได้ลบข้อมูลหรือไม่
        if (result.deletedCount === 1) {
            res.json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting student", error: err });
    }
});


// ดึงข้อมูลอันเดียว
app.get('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await db.collection("student").findOne({
            "stid": id
        })
        res.json(student);
    } catch (err) {
        res.json("error");
    }
});

//เพิ่มข้อมูล
app.post('/student', async (req, res) => {
    const data = req.body;
    // res.json(data);
    try {

        const student = await db.collection("student").insertOne(data);
        res.json(student);
    } catch (err) {
        res.json("error");
    }
});



app.listen(3000, () => {
    console.log('Server started: success');
});

//--------------------------------------------------------------------------------------