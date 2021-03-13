import connectDB from '../../models/Mongodb'
import Supplier from '../../models/Supplier'

const handler = async (req, res) => {

    const { method } = req

    switch (method) {
        
        case 'GET':

            await Supplier.find({}, function (err, docs) {
                return res.status(200).send(docs)
            });

            break;

        case 'POST':

            const { supplierName, phoneNumber } = req.body;
            if (supplierName && phoneNumber) {
                try {
                    const supplier = new Supplier({ 
                        name: supplierName,
                        phone: phoneNumber
                    });
                    supplier.save(function (err, supplier) {
                        if (err) return res.status(401).send({message: 'Could not save'});
                        return res.status(200).send(supplier)
                    });        
                } catch (error) {
                  return res.status(500).send(error.message);
                }
            } else {
                res.status(422).send('data_incomplete');
            }

            break;
        
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
};

export default connectDB(handler);