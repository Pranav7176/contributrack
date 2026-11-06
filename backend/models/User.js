import mongoose from 'mongoose'; import bcrypt from 'bcryptjs';
const schema = new mongoose.Schema({ fullName:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true}, password:{type:String,required:true,minlength:8,select:false}, studentId:{type:String,required:true,unique:true}, department:{type:String,required:true}, avatar:String },{timestamps:true});
schema.pre('save',async function(next){ if(!this.isModified('password')) return next(); this.password=await bcrypt.hash(this.password,12); next(); });
schema.methods.comparePassword=function(p){return bcrypt.compare(p,this.password)};
export default mongoose.model('User',schema);
