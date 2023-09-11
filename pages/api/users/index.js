import { users } from "@/data/users"

export default function postHandler(req,res) {
    if (req.method==="GET") {
        res.status(200).json(users)
    } else if(req.method==="POST") {
        const user=req.body
    users.push(user)
    res.status(201).json(user)
    }
    
}