import connectDB from '../../../models/Mongodb'
import Supplier from '../../../models/Supplier'

const handler = async (req, res) => {

    const { method } = req
    const { id } = req.query
  
    switch (method) {
        case 'GET':
            await Supplier.findById(id, function (err, docs) {
                return res.status(200).send(docs)
            });
            break
        case 'PUT':
            const { supplierName, phoneNumber } = req.body
            const result = await Supplier.findByIdAndUpdate(id, {
                name: supplierName, phone: phoneNumber
            })
            res.status(200).json({
                result: result
            })
            break
        case 'DELETE':
            const deleteResult = await Supplier.findByIdAndDelete(id)
            res.status(200).json({
                result: deleteResult
            })
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
export default connectDB(handler);