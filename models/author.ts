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

export default router;