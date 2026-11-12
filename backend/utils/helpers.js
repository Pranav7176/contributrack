import jwt from 'jsonwebtoken';
export const token=id=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
export const ok=(res,data,message='Success',status=200)=>res.status(status).json({success:true,message,data});
const objectId=value=>String(value?._id||value);
export const hasProjectAccess=(project,user)=>objectId(project.owner)===objectId(user)||project.members.some(member=>objectId(member.user)===objectId(user));
