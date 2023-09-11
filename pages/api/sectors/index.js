import { sectors, sectorsData } from "@/data/sectors";

// import {sectorsData} from '../../data/sectors'
const handler = (req,res) => {
   res.status(200).json(sectors)
};

export default handler;