import { Request, Response, Router } from "express";
import Author from "../models/author";
import ContactData from "../models/contactData";

const router: Router = Router();

router.post('/author', async (req: Request, res: Response) => {

    const contactData = new ContactData({
        address: req.body.contact.address,
        phone: req.body.contact.phone,
    })

    try {
        // @ts-ignore
        contactData.save(async (err, savedContactData) => {
            // @ts-ignore
            const author = new Author({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                personalCode: req.body.personalCode,
                contactData: savedContactData._id
            })
            const authorToSave = await author.save();
            res.status(200).json(authorToSave);
        });


    }
    catch (error) {
        res.status(400).json({message: error})
    }
})

router.get('/author', async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const data = await Author.find().populate("contactData");
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.get('/author/:id', async (req: Request, res: Response) => {
    try{
        // @ts-ignore
        const data = await Author.findById(req.params.id).populate("contactData");
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/author/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        // @ts-ignore
        await Author.findByIdAndDelete(id);
        // @ts-ignore
        const data = await Author.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/author/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;

        // @ts-ignore
        const author = await Author.findById(id);
        const contactDataId = author?.contactData;

        const updatedContactData = {
            address: req.body.contact.address,
            phone: req.body.contact.phone,
        };

        await ContactData.findByIdAndUpdate(
            contactDataId, updatedContactData
        )

        const updatedAuthor = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalCode: req.body.personalCode,
            contactData: contactDataId
        }

        const options = { new: true };

        // @ts-ignore
        const result = await Author.findByIdAndUpdate(
            id, updatedAuthor, options
        ).populate("contactData")

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;