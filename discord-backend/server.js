import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mongoData from './mongoData.js'

const app = express();
const port = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://admin:Aa1530@discordclonelive.dslm8.mongodb.net/discordDB?retryWrites=true&w=majority'

mongoose.connect(mongoURI)

app.get('/',(req,res)=>res.status(200).send('Hello World'))

app.post('/new/channel',(req,res)=>{
    const dbData = req.body

    mongoData.create(dbData,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/get/channellist',(req,res)=>{
    mongoData.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            let channels = []

            data.map((channelData)=>{
                const channelInfo = {
                    id: channelData._id,
                    name:channelData.channelName
                }
                channels.push(channelInfo)
            })
            res.status(200).send(channels)
        }
    })
})

app.post('/new/message',(req,res)=>{
    const id = req.query.id
    const newMessage = req.body

    mongoData.update(
        {_id: req.query.id},
        {$push: {conversation: req.body }},
        (err,data)=>{
            if(err){
                console.log(err)
                res.status(500).send(err);
            } else {
                res.status(201).send(data)
            }
        }
    )
})

app.get('/get/data',(req,res)=>{
    mongoData.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/conversation',(req,res)=>{
    const id = req.query.id
    mongoData.find({_id: id},(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.listen(port,()=>{
    console.log(`listening on localhost:${port}`);
})