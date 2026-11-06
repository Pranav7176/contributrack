import mongoose from 'mongoose';
const member=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},role:{type:String,default:'Member'},responsibilities:[String]},{_id:false});
const schema=new mongoose.Schema({title:{type:String,required:true,trim:true},description:{type:String,required:true},goals:[String],startDate:Date,endDate:Date,owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},members:[member]},{timestamps:true});
export default mongoose.model('Project',schema);
